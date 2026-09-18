/** Lets any component (e.g. the hero showcase) open a project's case-study dialog. */
export const OPEN_CASE_STUDY = "portfolio:open-case-study";

export function openCaseStudy(slug: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_CASE_STUDY, { detail: slug }));
}
