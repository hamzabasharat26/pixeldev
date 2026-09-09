/** Shared between the form UI and the server action so the two never drift. */

export const BUDGETS = [
  "Under $2,000",
  "$2,000 to $5,000",
  "$5,000 to $15,000",
  "$15,000+",
  "Not sure yet",
] as const;

export const SERVICES = [
  "Web Development",
  "Mobile App",
  "AI & Automation",
  "Computer Vision",
  "UI/UX Design",
  "Cloud & DevOps",
  "Something else",
] as const;

export const isBudget = (v: string) => (BUDGETS as readonly string[]).includes(v);
export const isService = (v: string) =>
  (SERVICES as readonly string[]).includes(v);
