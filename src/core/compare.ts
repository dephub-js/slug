import { slug, type SlugOptions } from './slug.ts';

/**
 * Compare two strings by their slugified versions
 * @param a - First string to compare
 * @param b - Second string to compare
 * @param options - Slug options for comparison
 * @returns True if slugified strings are equal
 */
export function compare(
  a: string,
  b: string,
  options: SlugOptions = {},
): boolean {
  return slug(a, options) === slug(b, options);
}
