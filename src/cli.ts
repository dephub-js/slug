#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command, CommandError } from '@dephub/command';
import { logger } from '@dephub/logger';

import { compare, isSlug, slug, type SlugOptions } from './index.ts';

const cmd = new Command()
  .name(__PKG_NAME__.split('/')[1])
  .description(__PKG_DESCRIPTION__)
  .version(__PKG_VERSION__);

cmd
  .command('generate', 'Convert string to URL-friendly slug')
  .argument('input', 'Input string to convert')
  .option('separator', {
    description: 'Separator character (default: "-")',
    optional: true,
  })
  .option('--no-lowercase', { description: 'Keep original case', kind: 'flag' })
  .option('fallback', {
    description: 'Fallback text if result is empty',
    optional: true,
  })
  .handler(({ args, options }) => {
    try {
      const slugOptions: SlugOptions = {
        fallback: options.fallback,
        lowercase: options.noLowercase,
        separator: options.separator,
      };

      const result = slug(args.input, slugOptions);
      logger.log(result);
    } catch (err: any) {
      logger.error(err.message);
      process.exit(1);
    }
  });

cmd
  .command('validate', 'Check if string is valid slug format')
  .argument('input', 'String to validate')
  .handler(({ args }) => {
    const isValid = isSlug(args.input);
    if (isValid) {
      logger.success('Valid slug format');
    } else {
      logger.error('Invalid slug format');
      process.exit(1);
    }
  });

cmd
  .command('compare', 'Compare two strings by slugified versions')
  .argument('first', 'First string to compare')
  .argument('second', 'Second string to compare')
  .option('separator', { description: 'Separator character', optional: true })
  .option('--no-lowercase', { description: 'Keep original case', kind: 'flag' })
  .handler(({ args, options }) => {
    const slugOptions: SlugOptions = {
      lowercase: options.noLowercase,
      separator: options.separator,
    };

    const areEqual = compare(args.first, args.second, slugOptions);
    if (areEqual) {
      logger.success('Strings are equivalent when slugified');
    } else {
      logger.error('Strings are different when slugified');
      process.exit(1);
    }
  });

try {
  await cmd.run();
} catch (err) {
  if (err instanceof CommandError) {
    logger.error(`\nError: ${err.message}\n`);
    cmd.help();
    process.exit(1);
  }
  throw err;
}
