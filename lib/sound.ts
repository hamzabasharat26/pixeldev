// The click sound. Web Audio, not <audio>: one decoded buffer can be played
// from many overlapping sources with no restart delay, which is what makes a
// UI tap feel attached to the press.

const SRC = "/sounds/button-press.mp3";
const VOLUME = 0.35;
/** Two clicks closer together than this are one gesture, not two taps. */
const MIN_GAP_MS = 60;
const STORAGE_KEY = "pixeldev:sound";

let context: AudioContext | undefined;
let buffer: AudioBuffer | undefined;
let loading: Promise<void> | undefined;
let lastPlayed = 0;

let muted = false;
const listeners = new Set<() => void>();

function read(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "off";
  } catch {
    // Private mode, or site data blocked. Sound on is the owner's default.
    return false;
  }
}

/** Called once on the client before anything reads the store. */
export function initSound() {
  muted = read();
  listeners.forEach((l) => l());
}

export function subscribeSound(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const isMuted = () => muted;
/** The server has no preference to read, and must not guess. */
export const isMutedOnServer = () => false;

export function setMuted(next: boolean) {
  muted = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "off" : "on");
  } catch {
    // Preference just won't survive the session. Not worth failing over.
  }
  listeners.forEach((l) => l());
}

/** Must be called from inside a user gesture: browsers refuse audio otherwise. */
function ensureLoaded() {
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume();
  loading ??= fetch(SRC)
    .then((r) => r.arrayBuffer())
    .then((bytes) => context!.decodeAudioData(bytes))
    .then((decoded) => {
      buffer = decoded;
    })
    .catch(() => {
      // No sound is fine. Never let this break a click.
    });
}

export function playClick() {
  if (muted || typeof window === "undefined" || !("AudioContext" in window)) return;
  const now = performance.now();
  if (now - lastPlayed < MIN_GAP_MS) return;
  lastPlayed = now;

  ensureLoaded();
  if (!context || !buffer) return; // first click of a session primes the buffer

  const source = context.createBufferSource();
  source.buffer = buffer;
  const gain = context.createGain();
  gain.gain.value = VOLUME;
  source.connect(gain).connect(context.destination);
  source.start();
}
