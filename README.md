# @dephub/slug 🔤

> URL-friendly slug generator with semantic comparison and validation. Convert strings to clean slugs with full Unicode support.

[![NPM version](https://img.shields.io/npm/v/@dephub/slug.svg?style=flat)](https://npmjs.org/package/@dephub/slug)
[![ESM-only](https://img.shields.io/badge/ESM-only-brightgreen?style=flat)](https://nodejs.org/)

---

## Features ✨

- 🎯 **Simple API** - `slug()`, `isSlug()`, `compare()`
- 🔒 **Type Safe** - Full TypeScript support with zero configuration
- 🌍 **Unicode Support** - Handles accented characters and diacritics
- 🛠️ **Dual Interface** - Use as CLI tool or programmatic API
- ⚡ **Lightweight** - Zero dependencies, focused functionality
- 🔧 **Configurable** - Custom separators, case handling, and fallbacks

---

## Installation 📲

- npm: `npm install @dephub/slug`
- pnpm: `pnpm add @dephub/slug`
- yarn: `yarn add @dephub/slug`
- bun: `bun add @dephub/slug`

---

## Usage 🎉

### CLI Usage

```bash
# Generate slugs
slug generate "Hello World!"
# Output: hello-world

slug generate "Café & Bar" --separator "_"
# Output: cafe_bar

# Validate slugs
slug validate "valid-slug-123"
# Output: ✅ Valid slug format

slug validate "Invalid Slug!"
# Output: ❌ Invalid slug format

# Compare strings
slug compare "Café au lait" "cafe-au-lait"
# Output: ✅ Strings are equivalent when slugified
```

### Programmatic Usage

```typescript
import { slug, isSlug, compare } from '@dephub/slug';

// Basic slug generation
slug('  Héllo Wörld!!!  '); // "hello-world"

// Custom options
slug('Hello World', { separator: '_' }); // "hello_world"
slug('Hello World', { lowercase: false }); // "Hello-World"
slug('###', { fallback: 'home' }); // "home"

// Validation
isSlug('valid-slug-name'); // true
isSlug('Invalid Slug!'); // false

// Semantic comparison
compare('Café au lait', 'cafe-au-lait'); // true
compare('user-profile', 'user_profile'); // false
```

### Advanced Examples

```typescript
// SEO-friendly URLs
const title = 'My Awesome Blog Post!';
const urlSlug = slug(title); // "my-awesome-blog-post"

// Username normalization
const username = slug(userInput, { separator: '_' });
if (!isSlug(username)) {
  throw new Error('Invalid username format');
}

// Database lookup with semantic comparison
function findProduct(name: string) {
  return products.find((product) => compare(product.name, name));
}
```

---

## API Reference 📚

### `slug(str, options?)`

Convert string to URL-friendly slug.

**Parameters:**

- `str` (string) - Input string to convert
- `options` (SlugOptions) - Configuration options
  - `separator` (string) - Character to replace spaces (default: `'-'`)
  - `lowercase` (boolean) - Convert to lowercase (default: `true`)
  - `fallback` (string) - Fallback if result empty (default: `'default-slug'`)

**Returns:** `string`

**Throws:** `TypeError` if input is not a string

### `isSlug(str)`

Check if string matches valid slug format (lowercase, hyphens, alphanumeric).

**Parameters:**

- `str` (string) - String to validate

**Returns:** `boolean`

### `compare(a, b, options?)`

Compare two strings by their slugified versions.

**Parameters:**

- `a` (string) - First string to compare
- `b` (string) - Second string to compare
- `options` (SlugOptions) - Slug configuration options

**Returns:** `boolean`

---

## CLI Commands

### `slug generate <input>`

Convert string to URL-friendly slug.

**Options:**

- `--separator` - Separator character (default: "-")
- `--no-lowercase` - Keep original case
- `--fallback` - Fallback text if result is empty

### `slug validate <input>`

Check if string is valid slug format.

### `slug compare <first> <second>`

Compare two strings by slugified versions.

**Options:**

- `--separator` - Separator character
- `--no-lowercase` - Keep original case

---

## Integration Examples

### With File System

```typescript
import { slug } from '@dephub/slug';
import { writeFile } from '@dephub/write';

async function createSluggedFile(content: string, filename: string) {
  const sluggedName = slug(filename);
  await writeFile(`./${sluggedName}.txt`, content);
}
```

### With Configuration

```typescript
import { slug, compare } from '@dephub/slug';
import { log } from '@dephub/log';

const categoryName = 'User Settings';
const normalized = slug(categoryName, { separator: '_' });
log(`Category: ${normalized}`); // "user_settings"
```

---

## License 📄

MIT License – see [LICENSE](LICENSE) for details.

**Author:** Estarlin R ([estarlincito.com](https://estarlincito.com))
