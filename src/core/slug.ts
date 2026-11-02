/* eslint-disable security/detect-non-literal-regexp */
import { escapeRegExp } from '@/utils/escape.js';

/**
 * Convert string to URL-friendly slug
 */
export interface SlugOptions {
  fallback?: string;
  lowercase?: boolean;
  separator?: string;
}

/**
 * Convert string to URL-friendly slug
 * @param str - Input string to convert
 * @param options - Slug configuration options
 * @returns URL-friendly slug string
 * @throws {TypeError} If input is not a string
 */
export function slug(str: string, options: SlugOptions = {}): string {
  if (typeof str !== 'string') throw new TypeError('Input must be string');

  const {
    fallback = 'default-slug',
    lowercase = true,
    separator = '-',
  } = options;

  let result = str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, separator);

  if (separator.length > 0) {
    const escaped = escapeRegExp(separator);
    result = result
      .replace(new RegExp(`${escaped}+`, 'g'), separator)
      .replace(new RegExp(`^${escaped}|${escaped}$`, 'g'), '');
  }

  result = result.trim();

  if (lowercase) result = result.toLowerCase();

  return result || fallback;
}
