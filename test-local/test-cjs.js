/**
 * CommonJS test for objid package
 */

const { objid } = require('objid');

console.log('=== Testing objid (CommonJS) ===\n');

// Test 1: Default ID generation
console.log('Test 1: Default 21-character ID');
const id1 = objid();
console.log(`Generated ID: ${id1}`);
console.log(`Length: ${id1.length}`);
console.log(`Valid: ${id1.length === 21 ? '✓' : '✗'}\n`);

// Test 2: Custom length
console.log('Test 2: Custom length (10 characters)');
const id2 = objid(10);
console.log(`Generated ID: ${id2}`);
console.log(`Length: ${id2.length}`);
console.log(`Valid: ${id2.length === 10 ? '✓' : '✗'}\n`);

// Test 3: Multiple IDs (uniqueness)
console.log('Test 3: Generating multiple IDs (uniqueness check)');
const ids = [];
for (let i = 0; i < 5; i++) {
  ids.push(objid());
}
console.log('Generated IDs:');
ids.forEach((id, index) => {
  console.log(`  ${index + 1}. ${id}`);
});
const uniqueIds = new Set(ids);
console.log(`All unique: ${uniqueIds.size === ids.length ? '✓' : '✗'}\n`);

// Test 4: Custom alphabet (numeric)
console.log('Test 4: Custom alphabet (numeric)');
const numericId = objid.customAlphabet('0123456789', 10);
const numId = numericId();
console.log(`Generated numeric ID: ${numId}`);
console.log(`Length: ${numId.length}`);
console.log(`Is numeric: ${/^\d+$/.test(numId) ? '✓' : '✗'}\n`);

// Test 5: Custom alphabet (hex)
console.log('Test 5: Custom alphabet (hexadecimal)');
const hexId = objid.customAlphabet('0123456789abcdef', 8);
const hex = hexId();
console.log(`Generated hex ID: ${hex}`);
console.log(`Length: ${hex.length}`);
console.log(`Is hex: ${/^[0-9a-f]+$/.test(hex) ? '✓' : '✗'}\n`);

// Test 6: Custom alphabet with different size
console.log('Test 6: Custom alphabet with different size');
const customId = objid.customAlphabet('ABC', 5);
const custom1 = customId();
const custom2 = customId(10);
console.log(`Default size (5): ${custom1} (length: ${custom1.length})`);
console.log(`Custom size (10): ${custom2} (length: ${custom2.length})`);
console.log(`Valid: ${custom1.length === 5 && custom2.length === 10 ? '✓' : '✗'}\n`);

// Test 7: URL-friendly characters
console.log('Test 7: URL-friendly characters check');
const urlId = objid(50);
const isUrlFriendly = /^[A-Za-z0-9_-]+$/.test(urlId);
console.log(`Generated ID: ${urlId.substring(0, 20)}...`);
console.log(`URL-friendly: ${isUrlFriendly ? '✓' : '✗'}\n`);

// Test 8: Error handling
console.log('Test 8: Error handling');
try {
  objid(0);
  console.log('Error test failed: Should have thrown error for size 0');
} catch (e) {
  console.log(`✓ Correctly threw error for size 0: ${e.message}`);
}

try {
  objid(-1);
  console.log('Error test failed: Should have thrown error for negative size');
} catch (e) {
  console.log(`✓ Correctly threw error for negative size: ${e.message}`);
}

try {
  objid.customAlphabet('', 10);
  console.log('Error test failed: Should have thrown error for empty alphabet');
} catch (e) {
  console.log(`✓ Correctly threw error for empty alphabet: ${e.message}`);
}

console.log('\n=== All tests completed ===');

