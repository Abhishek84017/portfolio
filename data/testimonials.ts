export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/**
 * Real testimonials only. While this is empty the site renders the
 * mentorship credibility strip below instead (§5.8 fallback).
 */
export const testimonials: Testimonial[] = [];

export const mentorship = {
  heading: "Mentored 3 junior Flutter developers.",
  body: "Through weekly code reviews, architecture walkthroughs, and pair programming — improving team code quality and reducing review cycle time.",
  practices: [
    {
      title: "Weekly code reviews",
      body: "Consistent, structured feedback that raised code quality and shortened review cycles.",
    },
    {
      title: "Design docs for every module",
      body: "Screen flows, API contracts, state strategy and edge cases — written before the code.",
    },
    {
      title: "Client-facing demos",
      body: "Explaining architecture decisions and trade-offs to non-technical stakeholders.",
    },
  ],
} as const;
