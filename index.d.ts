/**
 * A tiny, secure, URL-friendly unique ID generator
 */

/**
 * Generates a cryptographically secure random ID
 * @param size - The length of the ID to generate (default: 21)
 * @returns A URL-friendly unique ID
 * @example
 * objid() // Returns a 21-character ID
 * objid(10) // Returns a 10-character ID
 */
declare function objid(size?: number): string;

/**
 * Creates a custom ID generator with a specific alphabet and default size
 * @param alphabet - Custom alphabet to use for ID generation
 * @param defaultSize - Default size for generated IDs (default: 21)
 * @returns A function that generates IDs using the custom alphabet
 * @example
 * const customId = objid.customAlphabet('0123456789', 10);
 * customId() // Returns a 10-digit ID
 * customId(5) // Returns a 5-digit ID
 */
declare namespace objid {
  function customAlphabet(
    alphabet: string,
    defaultSize?: number
  ): (size?: number) => string;
}

// CommonJS export
export = objid;
// ES Module default export
export default objid;
// ES Module named export
export { objid };

