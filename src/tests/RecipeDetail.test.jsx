import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { RecipeDetail } from '../App.jsx';

// Mock ResizeObserver which is needed by recharts
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const mockRecipe = {
  id: 1,
  name: 'Test Recipe',
  image: 'test.jpg',
  time: 10,
  difficulty: '쉬움',
  category: 'diet',
  kcal: 100,
  carb: 10,
  protein: 10,
  fat: 10,
  tags: ['test'],
  desc: 'test',
  ingredients: [
    { id: '001', name: '양파', amount: 0.5, unit: '개' },
    { id: '002', name: '닭가슴살', amount: 100, unit: 'g' },
  ],
  altIngredients: [],
  steps: []
};

describe('RecipeDetail Servings', () => {
  it('renders initial servings and calculates correctly', () => {
    render(<RecipeDetail recipe={mockRecipe} onBack={() => {}} />);

    // Check initial servings value (1)
    expect(screen.getByText('100g')).toBeDefined();
    expect(screen.getByText('0.5개')).toBeDefined();
    expect(screen.getByText('100 kcal')).toBeDefined(); // total calories

    // Check that there is a '1' showing for servings
    const servingSpan = screen.getByText('1', { selector: 'span' });
    expect(servingSpan).toBeDefined();
  });

  it('increases servings and updates values correctly', () => {
    render(<RecipeDetail recipe={mockRecipe} onBack={() => {}} />);

    // Click '+' button
    const plusBtn = screen.getByText('+');
    fireEvent.click(plusBtn);

    // Should now be 2 servings
    expect(screen.getByText('2', { selector: 'span' })).toBeDefined();

    // Ingredients should be doubled
    expect(screen.getByText('200g')).toBeDefined(); // 100 * 2
    expect(screen.getByText('1개')).toBeDefined();   // 0.5 * 2 = 1, fmt removes .0

    // Calories should be doubled
    expect(screen.getByText('200 kcal')).toBeDefined(); // total calories
  });

  it('decreases servings and updates values correctly', () => {
    render(<RecipeDetail recipe={mockRecipe} onBack={() => {}} />);

    // Click '+' button to go to 2
    const plusBtn = screen.getByText('+');
    fireEvent.click(plusBtn);

    // Click '-' button to go back to 1
    const minusBtn = screen.getByText('−'); // note: the dash in the code is '−' (U+2212)
    fireEvent.click(minusBtn);

    // Should be 1 serving
    expect(screen.getByText('1', { selector: 'span' })).toBeDefined();

    // Ingredients should be back to original
    expect(screen.getByText('100g')).toBeDefined();
    expect(screen.getByText('0.5개')).toBeDefined();
  });

  it('does not decrease servings below 1', () => {
    render(<RecipeDetail recipe={mockRecipe} onBack={() => {}} />);

    // Initial is 1
    const minusBtn = screen.getByText('−');
    fireEvent.click(minusBtn);

    // Should still be 1 serving
    expect(screen.getByText('1', { selector: 'span' })).toBeDefined();
  });
});
