# objid

A tiny, secure, URL-friendly unique ID generator for JavaScript.

## Features

- 🔒 **Cryptographically secure** - Uses Node.js `crypto.randomFillSync()`
- 📦 **Small bundle size** - Minimal dependencies
- 🌐 **URL-friendly** - Safe to use in URLs and HTML attributes
- ⚡ **Fast** - Optimized for performance
- 🔧 **Customizable** - Support for custom alphabets and sizes
- 📚 **TypeScript support** - Includes TypeScript definitions
- 🔄 **Dual module support** - Works with both ES Modules and CommonJS

## Installation

```bash
npm install objid
```

## Usage

### Basic Usage

```javascript
// ES Modules
import { objid } from 'objid';

// CommonJS
const { objid } = require('objid');

// Generate a default 21-character ID
const id = objid();
console.log(id); // e.g., "V1StGXR8_Z5jdHi6B-myT"

// Generate a custom length ID
const shortId = objid(10);
console.log(shortId); // e.g., "IRFa-VaZo2"
```

### Custom Alphabet

```javascript
import { objid } from 'objid';

// Create a custom generator with numeric alphabet
const numericId = objid.customAlphabet('0123456789', 10);
console.log(numericId()); // e.g., "8745291036"
console.log(numericId(5)); // e.g., "12345"

// Create a custom generator with hex alphabet
const hexId = objid.customAlphabet('0123456789abcdef', 8);
console.log(hexId()); // e.g., "a3f2b1c4"

// Create a custom generator with only uppercase letters
const upperId = objid.customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
console.log(upperId()); // e.g., "ABCDEF"
```

## API Reference

### `objid(size?)`

Generates a cryptographically secure random ID.

**Parameters:**
- `size` (number, optional): The length of the ID to generate. Default: `21`

**Returns:** `string` - A URL-friendly unique ID

**Throws:**
- `Error` if size is not a positive integer

**Example:**
```javascript
objid()    // Returns 21-character ID
objid(10)  // Returns 10-character ID
```

### `objid.customAlphabet(alphabet, defaultSize?)`

Creates a custom ID generator function with a specific alphabet.

**Parameters:**
- `alphabet` (string, required): Custom alphabet to use for ID generation
- `defaultSize` (number, optional): Default size for generated IDs. Default: `21`

**Returns:** `Function` - A function that generates IDs using the custom alphabet

**Throws:**
- `Error` if alphabet is empty
- `Error` if alphabet length exceeds 256 characters
- `Error` if defaultSize is not a positive integer

**Example:**
```javascript
const customId = objid.customAlphabet('0123456789', 10);
customId()   // Returns 10-digit ID
customId(5)  // Returns 5-digit ID
```

## Security Notes

- **Cryptographic Security**: `objid` uses Node.js's `crypto.randomFillSync()` which provides cryptographically strong pseudo-random data suitable for security-sensitive applications.
- **Collision Probability**: With the default 21-character ID, the probability of collision is extremely low (approximately 1 in 10^36 for 1 billion IDs).
- **Randomness**: The randomness comes from the operating system's secure random number generator, not from a pseudo-random number generator.

## Performance

- **Speed**: Generates IDs in microseconds
- **Memory**: Minimal memory footprint
- **Bundle Size**: Very small, no external dependencies

## Comparison with nanoid

`objid` provides similar functionality to `nanoid` but:
- Uses Node.js built-in `crypto` module (no external dependencies)
- Simpler implementation
- Same default size (21 characters)
- Same URL-friendly alphabet

## Browser Support

This package is designed for Node.js environments. For browser usage, you may need to use a bundler that provides Node.js polyfills for the `crypto` module.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### 1.0.0
- Initial release
- Basic `objid()` function
- `customAlphabet()` support
- TypeScript definitions
- Full test coverage

