import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateBarWidth } from './nutrition.js';

describe('calculateBarWidth', () => {
  test('calculates correct percentage for happy path', () => {
    assert.equal(calculateBarWidth(50, 100), 50);
    assert.equal(calculateBarWidth(30, 60), 50);
    assert.equal(calculateBarWidth(10, 50), 20);
  });

  test('caps value at 100% when value exceeds max', () => {
    assert.equal(calculateBarWidth(120, 100), 100);
    assert.equal(calculateBarWidth(70, 60), 100);
  });

  test('returns 0% when value is 0', () => {
    assert.equal(calculateBarWidth(0, 100), 0);
  });

  test('returns 0% when max is 0', () => {
    assert.equal(calculateBarWidth(50, 0), 0);
  });

  test('returns 0% when max is negative', () => {
    assert.equal(calculateBarWidth(50, -10), 0);
  });

  test('returns 0% when value is negative', () => {
    assert.equal(calculateBarWidth(-10, 100), 0);
  });
});
