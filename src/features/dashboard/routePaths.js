/**
 * URL segment (path param) ↔ app section key used by nav + analytics.
 * Example: /transactions → 'cashflow'
 */
export const SECTION_PARAM = {
  dashboard: 'overview',
  portfolio: 'portfolio',
  transactions: 'cashflow',
  budgets: 'budgets',
  insights: 'insights',
  goals: 'goals',
};

/** @type {Record<string, string>} */
export const PARAM_BY_SECTION = Object.fromEntries(
  Object.entries(SECTION_PARAM).map(([param, sectionKey]) => [sectionKey, param]),
);

/**
 * @param {string} sectionKey — e.g. 'overview', 'cashflow'
 * @returns {string} pathname e.g. '/dashboard'
 */
export function pathForSectionKey(sectionKey) {
  const param = PARAM_BY_SECTION[sectionKey];
  return param ? `/${param}` : '/dashboard';
}

/**
 * @param {string | undefined} param — first path segment
 * @returns {string | null} section key or null if unknown
 */
export function sectionKeyFromParam(param) {
  if (!param) return null;
  return SECTION_PARAM[param] ?? null;
}
