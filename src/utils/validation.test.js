import { describe, it, expect } from 'vitest';
import { validateRecipeForm } from './validation.js';

describe('validateRecipeForm', () => {
  it('should return true for valid form data', () => {
    const form = { name: 'Valid Recipe', time: '20' };
    expect(validateRecipeForm(form)).toBe(true);
  });

  it('should return false for empty name', () => {
    const form = { name: '', time: '20' };
    expect(validateRecipeForm(form)).toBe(false);
  });

  it('should return false for name with only whitespace', () => {
    const form = { name: '   ', time: '20' };
    expect(validateRecipeForm(form)).toBe(false);
  });

  it('should return false for missing time', () => {
    const form = { name: 'Valid Recipe', time: '' };
    expect(validateRecipeForm(form)).toBe(false);
  });

  it('should return false for both missing', () => {
    const form = { name: '', time: '' };
    expect(validateRecipeForm(form)).toBe(false);
  });
});
