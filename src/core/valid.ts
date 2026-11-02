/* eslint-disable security/detect-non-literal-regexp */
import { escapeRegExp } from '@/utils/escape.js';

/**
 * Check if string matches valid slug format with a dynamic separator
 * @param str - String to validate
 * @param separator - Separator character (default: '-')
 * @returns True if string is valid slug format
 */
export function isSlug(str: string, separator = '-'): boolean {
  const escaped = escapeRegExp(separator);
  const regex = new RegExp(`^[a-z0-9]+(?:${escaped}[a-z0-9]+)*$`);

  return regex.test(str);
}
