import { slug, type SlugOptions } from './slug.js';

/**
 * Compare two strings by their slugified versions
 * @param a - First string to compare
 * @param b - Second string to compare
 * @param options - Slug options for comparison
 * @returns True if slugified strings are equal
 */
export const compare = (
  a: string,
  b: string,
  options: SlugOptions = {},
): boolean => slug(a, options) === slug(b, options);
