import test from 'node:test';
import assert from 'node:assert';
import { validateRecipeForm } from './validation.js';

test('validateRecipeForm should return true for valid form data', (t) => {
  const form = { name: 'Valid Recipe', time: '20' };
  assert.strictEqual(validateRecipeForm(form), true);
});

test('validateRecipeForm should return false for empty name', (t) => {
  const form = { name: '', time: '20' };
  assert.strictEqual(validateRecipeForm(form), false);
});

test('validateRecipeForm should return false for name with only whitespace', (t) => {
  const form = { name: '   ', time: '20' };
  assert.strictEqual(validateRecipeForm(form), false);
});

test('validateRecipeForm should return false for missing time', (t) => {
  const form = { name: 'Valid Recipe', time: '' };
  assert.strictEqual(validateRecipeForm(form), false);
});

test('validateRecipeForm should return false for both missing', (t) => {
  const form = { name: '', time: '' };
  assert.strictEqual(validateRecipeForm(form), false);
});
