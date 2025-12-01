# Local Testing Guide for objid Package

This folder contains test scripts to verify the `objid` package works correctly before publishing to npm.

## Setup

1. First, install dependencies in the main package:
   ```bash
   cd ..
   npm install
   ```

2. Then, install the local package in this test folder:
   ```bash
   cd test-local
   npm install
   ```

## Running Tests

### ES Module Test
```bash
npm test
# or
node test.js
```

### CommonJS Test
```bash
npm run test-cjs
# or
node test-cjs.js
```

## What the Tests Cover

- Default ID generation (21 characters)
- Custom length IDs
- Uniqueness of generated IDs
- Custom alphabet functionality
- Numeric ID generation
- Hexadecimal ID generation
- URL-friendly character validation
- Error handling for invalid inputs

## Expected Output

Both test scripts will output:
- ✓ for passed tests
- ✗ for failed tests
- Detailed information about each test case

