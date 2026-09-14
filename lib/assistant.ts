import {
  assistantFallback,
  assistantIntro,
  assistantStarterIds,
  assistantTopics,
  type AssistantTopic,
} from "@/content/assistant";

export type { AssistantLink, AssistantTopic } from "@/content/assistant";

export const topics = assistantTopics;
export const intro = assistantIntro;
export const fallback = assistantFallback;

const index = new Map(assistantTopics.map((t) => [t.id, t]));
export const byId = (id: string) => index.get(id);

export const starters = assistantStarterIds
  .map((id) => index.get(id))
  .filter((t): t is AssistantTopic => Boolean(t));

/** The follow-up chips shown under an answer. */
export const followUps = (topic: AssistantTopic): AssistantTopic[] =>
  (topic.follow ?? []).map((id) => index.get(id)).filter((t): t is AssistantTopic => Boolean(t));

// Words too common to tell topics apart. Without this, "how much does it cost"
// matches anything carrying "how" or "it".
const NOISE = new Set([
  "the", "a", "an", "is", "are", "was", "do", "does", "did", "you", "your", "we", "our", "us",
  "i", "me", "my", "can", "could", "would", "what", "how", "when", "who", "why", "much", "many",
  "of", "for", "to", "and", "or", "in", "on", "at", "with", "it", "that", "this", "there",
  "have", "has", "had", "be", "been", "get", "got", "any", "some", "about", "please", "tell",
  "hai", "ka", "ki", "ke", "mein", "aap", "kya",
]);

const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9+#./ -]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !NOISE.has(w));

/**
 * Deterministic best-topic match. Phrases outscore single words, and a stem
 * match ("pricing" against "price") counts for less than an exact one. Below
 * the threshold nothing is returned, and the caller shows the fallback rather
 * than answering a question it was not asked.
 */
export function matchTopic(query: string): AssistantTopic | null {
  const phrase = query.toLowerCase();
  const asked = words(query);
  if (!asked.length) return null;

  let best: AssistantTopic | null = null;
  let bestScore = 0;

  for (const topic of topics) {
    let score = 0;
    for (const keyword of topic.keywords) {
      if (keyword.includes(" ")) {
        if (phrase.includes(keyword)) score += 3;
      } else if (asked.includes(keyword)) {
        score += 2;
      } else if (asked.some((w) => w.length >= 4 && (w.startsWith(keyword) || keyword.startsWith(w)))) {
        score += 1;
      }
    }
    for (const w of words(topic.chip)) if (asked.includes(w)) score += 1;
    if (score > bestScore) {
      best = topic;
      bestScore = score;
    }
  }

  return bestScore >= 2 ? best : null;
}
