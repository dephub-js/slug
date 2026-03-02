/* eslint-disable security/detect-unsafe-regex */
/**
 * Check if string matches valid slug format
 * @param str - String to validate
 * @returns True if string is valid slug format
 */
export const isSlug = (str: string): boolean =>
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str);
