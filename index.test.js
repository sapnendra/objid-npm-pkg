import { describe, it, expect } from 'vitest';
import { objid } from './index.js';

describe('objid', () => {
  describe('basic functionality', () => {
    it('should generate a default 21-character ID', () => {
      const id = objid();
      expect(id).toHaveLength(21);
      expect(typeof id).toBe('string');
    });

    it('should generate IDs with custom length', () => {
      const id = objid(10);
      expect(id).toHaveLength(10);
    });

    it('should generate different IDs on each call', () => {
      const id1 = objid();
      const id2 = objid();
      expect(id1).not.toBe(id2);
    });

    it('should generate IDs with URL-friendly characters', () => {
      const id = objid(100);
      // Should only contain A-Z, a-z, 0-9, _, -
      expect(id).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    it('should handle various sizes', () => {
      expect(objid(1)).toHaveLength(1);
      expect(objid(5)).toHaveLength(5);
      expect(objid(50)).toHaveLength(50);
      expect(objid(100)).toHaveLength(100);
    });
  });

  describe('error handling', () => {
    it('should throw error for zero size', () => {
      expect(() => objid(0)).toThrow('Size must be greater than 0');
    });

    it('should throw error for negative size', () => {
      expect(() => objid(-1)).toThrow('Size must be greater than 0');
    });

    it('should throw error for non-integer size', () => {
      expect(() => objid(10.5)).toThrow('Size must be an integer');
      expect(() => objid('10')).toThrow('Size must be an integer');
    });
  });

  describe('customAlphabet', () => {
    it('should create a custom generator with numeric alphabet', () => {
      const numericId = objid.customAlphabet('0123456789', 10);
      const id = numericId();
      expect(id).toHaveLength(10);
      expect(id).toMatch(/^[0-9]+$/);
    });

    it('should create a custom generator with hex alphabet', () => {
      const hexId = objid.customAlphabet('0123456789abcdef', 8);
      const id = hexId();
      expect(id).toHaveLength(8);
      expect(id).toMatch(/^[0-9a-f]+$/);
    });

    it('should allow custom size in generated function', () => {
      const customId = objid.customAlphabet('0123456789', 10);
      expect(customId(5)).toHaveLength(5);
      expect(customId(20)).toHaveLength(20);
    });

    it('should use default size when no size specified', () => {
      const customId = objid.customAlphabet('ABC', 15);
      expect(customId()).toHaveLength(15);
    });

    it('should generate different IDs with custom alphabet', () => {
      const customId = objid.customAlphabet('0123456789', 10);
      const id1 = customId();
      const id2 = customId();
      expect(id1).not.toBe(id2);
    });

    it('should throw error for empty alphabet', () => {
      expect(() => objid.customAlphabet('', 10)).toThrow('Alphabet must not be empty');
    });

    it('should throw error for alphabet longer than 256 characters', () => {
      const longAlphabet = 'a'.repeat(257);
      expect(() => objid.customAlphabet(longAlphabet, 10)).toThrow('Alphabet length must not exceed 256 characters');
    });

    it('should throw error for invalid default size', () => {
      expect(() => objid.customAlphabet('0123456789', 0)).toThrow('Default size must be a positive integer');
      expect(() => objid.customAlphabet('0123456789', -1)).toThrow('Default size must be a positive integer');
      expect(() => objid.customAlphabet('0123456789', 10.5)).toThrow('Default size must be a positive integer');
    });

    it('should work with single character alphabet', () => {
      const singleCharId = objid.customAlphabet('A', 5);
      const id = singleCharId();
      expect(id).toBe('AAAAA');
    });
  });

  describe('collision resistance', () => {
    it('should generate unique IDs in bulk', () => {
      const ids = new Set();
      const count = 1000;
      
      for (let i = 0; i < count; i++) {
        ids.add(objid());
      }
      
      expect(ids.size).toBe(count);
    });

    it('should generate unique IDs with custom alphabet', () => {
      const customId = objid.customAlphabet('0123456789', 10);
      const ids = new Set();
      const count = 1000;
      
      for (let i = 0; i < count; i++) {
        ids.add(customId());
      }
      
      expect(ids.size).toBe(count);
    });
  });

  describe('module exports', () => {
    it('should work with CommonJS require', () => {
      const objidCommonJS = require('./index.js');
      expect(typeof objidCommonJS).toBe('function');
      expect(typeof objidCommonJS.customAlphabet).toBe('function');
    });
  });
});

