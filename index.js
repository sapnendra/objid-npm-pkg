/**
 * @fileoverview A tiny, secure, URL-friendly unique ID generator
 * @module objid
 */

const { randomFillSync } = require('crypto');

// Default alphabet: URL-friendly characters (A-Za-z0-9_-)
const DEFAULT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
const DEFAULT_SIZE = 21;

/**
 * Generates a cryptographically secure random ID
 * @param {number} [size=21] - The length of the ID to generate
 * @returns {string} A URL-friendly unique ID
 * @example
 * objid() // Returns a 21-character ID
 * objid(10) // Returns a 10-character ID
 */
function objid(size = DEFAULT_SIZE) {
  if (size <= 0) {
    throw new Error('Size must be greater than 0');
  }
  
  if (!Number.isInteger(size)) {
    throw new Error('Size must be an integer');
  }

  const bytes = new Uint8Array(size);
  randomFillSync(bytes);
  
  let id = '';
  for (let i = 0; i < size; i++) {
    id += DEFAULT_ALPHABET[bytes[i] % DEFAULT_ALPHABET.length];
  }
  
  return id;
}

/**
 * Creates a custom ID generator with a specific alphabet and default size
 * @param {string} alphabet - Custom alphabet to use for ID generation
 * @param {number} [defaultSize=21] - Default size for generated IDs
 * @returns {Function} A function that generates IDs using the custom alphabet
 * @example
 * const customId = objid.customAlphabet('0123456789', 10);
 * customId() // Returns a 10-digit ID
 * customId(5) // Returns a 5-digit ID
 */
objid.customAlphabet = function customAlphabet(alphabet, defaultSize = DEFAULT_SIZE) {
  if (!alphabet || alphabet.length === 0) {
    throw new Error('Alphabet must not be empty');
  }
  
  if (alphabet.length > 256) {
    throw new Error('Alphabet length must not exceed 256 characters');
  }
  
  if (defaultSize <= 0 || !Number.isInteger(defaultSize)) {
    throw new Error('Default size must be a positive integer');
  }

  return function generateCustomId(size = defaultSize) {
    if (size <= 0) {
      throw new Error('Size must be greater than 0');
    }
    
    if (!Number.isInteger(size)) {
      throw new Error('Size must be an integer');
    }

    const bytes = new Uint8Array(size);
    randomFillSync(bytes);
    
    let id = '';
    for (let i = 0; i < size; i++) {
      id += alphabet[bytes[i] % alphabet.length];
    }
    
    return id;
  };
};

// Support both CommonJS and ES Modules
// This structure allows both default and named imports
module.exports = objid;
module.exports.default = objid;
module.exports.objid = objid;

