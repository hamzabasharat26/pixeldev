export type Testimonial = {
  /** Short amber pill, e.g. "+40% conversions". */
  badge: string;
  /** 2–3 sentences, specific, names a result. */
  quote: string;
  name: string;
  role: string;
  /** Optional square avatar in /public. */
  avatar?: string;
};

/**
 * Only publish testimonials you actually have, with permission.
 * The section renders nothing while this array is empty — never fabricate.
 *
 * TODO(owner): add real entries, e.g.
 *   {
 *     badge: "+40% conversions",
 *     quote: "…",
 *     name: "Full Name",
 *     role: "Role, Company",
 *   }
 */
export const testimonials: Testimonial[] = [];
