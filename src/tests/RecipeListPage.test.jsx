import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { RecipeListPage, RECIPES } from '../App.jsx';

describe('RecipeListPage Filtering Logic', () => {
  it('renders all recipes for the given category initially', () => {
    render(<RecipeListPage category="diet" setDetail={() => {}} />);
    const dietRecipes = RECIPES.filter(r => r.category === 'diet');

    dietRecipes.forEach(recipe => {
      expect(screen.getByText(recipe.name)).toBeDefined();
    });

    const normalRecipes = RECIPES.filter(r => r.category === 'normal');
    normalRecipes.forEach(recipe => {
      expect(screen.queryByText(recipe.name)).toBeNull();
    });
  });

  it('filters recipes by active tag', () => {
    render(<RecipeListPage category="diet" setDetail={() => {}} />);

    // Find the tag button and click it
    const tagButtons = screen.getAllByRole('listitem');
    const tagButton = tagButtons.find(btn => btn.textContent === '고단백');
    fireEvent.click(tagButton);

    const dietRecipesWithTag = RECIPES.filter(r => r.category === 'diet' && r.tags.includes('고단백'));
    dietRecipesWithTag.forEach(recipe => {
      expect(screen.getByText(recipe.name)).toBeDefined();
    });

    const dietRecipesWithoutTag = RECIPES.filter(r => r.category === 'diet' && !r.tags.includes('고단백'));
    dietRecipesWithoutTag.forEach(recipe => {
      expect(screen.queryByText(recipe.name)).toBeNull();
    });
  });

  it('filters recipes by search string (name, ingredients, or tags)', () => {
    render(<RecipeListPage category="diet" setDetail={() => {}} />);

    const searchInput = screen.getByPlaceholderText('요리명 또는 재료로 검색...');

    // Search by name
    fireEvent.change(searchInput, { target: { value: '닭가슴살' } });
    expect(screen.getByText('닭가슴살 아보카도 샐러드')).toBeDefined();

    // Verify a recipe without "닭가슴살" in name/ingredients/tags is not present
    // Just verifying one that doesn't match
    expect(screen.queryByText('연어 포케 볼')).toBeNull();

    // Search by ingredient
    fireEvent.change(searchInput, { target: { value: '올리브오일' } });
    const recipesWithOliveOil = RECIPES.filter(r => r.category === 'diet' && r.ingredients.some(i => i.name.includes('올리브오일')));
    recipesWithOliveOil.forEach(recipe => {
      expect(screen.getByText(recipe.name)).toBeDefined();
    });
  });

  it('shows empty state when no recipes match search', () => {
    render(<RecipeListPage category="diet" setDetail={() => {}} />);

    const searchInput = screen.getByPlaceholderText('요리명 또는 재료로 검색...');
    fireEvent.change(searchInput, { target: { value: '없는재료입니다1234' } });

    // Ensure that diet recipes are not shown
    const dietRecipes = RECIPES.filter(r => r.category === 'diet');
    dietRecipes.forEach(recipe => {
      expect(screen.queryByText(recipe.name)).toBeNull();
    });
  });
});
