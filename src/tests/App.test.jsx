import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App.jsx';

// Mock ResizeObserver which is needed by recharts
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // Mock window.scrollTo
  window.scrollTo = vi.fn();
});

describe('App Component Navigation', () => {
  it('renders initial home page', () => {
    render(<App />);
    expect(screen.getByText('다이어트 레시피한눈에 보기 🥗')).toBeDefined();
  });

  it('navigates to diet page', () => {
    render(<App />);
    // Select the button from the desktop nav to avoid ambiguity with bottom nav or hero buttons
    const dietNavBtn = screen.getAllByRole('button', { name: /다이어트/ })[0];
    fireEvent.click(dietNavBtn);
    expect(screen.getByText('저칼로리 · 고단백 · 영양 가득 건강식 모음')).toBeDefined();
  });

  it('navigates to normal recipe page', () => {
    render(<App />);
    const normalNavBtn = screen.getAllByRole('button', { name: /일반레시피/ })[0];
    fireEvent.click(normalNavBtn);
    expect(screen.getByText('맛있고 다양한 일상 요리 모음')).toBeDefined();
  });

  it('navigates to register recipe page', () => {
    render(<App />);
    const registerNavBtn = screen.getAllByRole('button', { name: /레시피등록/ })[0];
    fireEvent.click(registerNavBtn);
    expect(screen.getByText('나만의 건강 레시피를 공유해보세요!')).toBeDefined();
  });

  it('navigates back to home page using logo', () => {
    render(<App />);
    // Navigate away first
    const dietNavBtn = screen.getAllByRole('button', { name: /다이어트/ })[0];
    fireEvent.click(dietNavBtn);

    // Click logo
    const logoBtn = screen.getByRole('link', { name: '그린레시피 홈으로' });
    fireEvent.click(logoBtn);

    expect(screen.getByText('다이어트 레시피한눈에 보기 🥗')).toBeDefined();
  });
});

describe('App Component Detail View', () => {
  it('opens recipe detail view on recipe card click', () => {
    render(<App />);
    // Find a recipe card (e.g., 닭가슴살 아보카도 샐러드)
    const recipeCard = screen.getByRole('button', { name: /닭가슴살 아보카도 샐러드 레시피 보기/ });
    fireEvent.click(recipeCard);

    // Check that detail view elements are rendered
    expect(screen.getByText('← 뒤로')).toBeDefined();
    expect(screen.getByText('촉촉한 닭가슴살과 크리미한 아보카도의 완벽한 조화. 운동 후 최고의 회복 식단.')).toBeDefined();
  });

  it('closes recipe detail view on back button click', () => {
    render(<App />);
    // Find a recipe card and click it
    const recipeCard = screen.getByRole('button', { name: /닭가슴살 아보카도 샐러드 레시피 보기/ });
    fireEvent.click(recipeCard);

    // Check that we are in detail view
    const backBtn = screen.getByText('← 뒤로');
    expect(backBtn).toBeDefined();

    // Click back button
    fireEvent.click(backBtn);

    // Check that we are back to home (detail view is gone, hero banner is visible)
    expect(screen.queryByText('← 뒤로')).toBeNull();
    expect(screen.getByText('다이어트 레시피한눈에 보기 🥗')).toBeDefined();
  });
});
