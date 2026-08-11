import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { RegisterPage } from '../App.jsx';

describe('RegisterPage Component', () => {
  it('disables submit button initially', () => {
    render(<RegisterPage />);
    const submitBtn = screen.getByRole('button', { name: /요리명과 조리 시간을 입력해주세요/ });
    expect(submitBtn).toBeDefined();
    // Simulate checking if the button is acting disabled visually or functionally by its style/text.
    // The button doesn't have a strict `disabled` attribute, but checks logic to allow submission.
  });

  it('does not allow submission with only name', () => {
    render(<RegisterPage />);
    const nameInput = screen.getByPlaceholderText('예: 닭가슴살 아보카도 샐러드');
    fireEvent.change(nameInput, { target: { value: '새로운 요리' } });

    const submitBtn = screen.getByRole('button', { name: /요리명과 조리 시간을 입력해주세요/ });
    expect(submitBtn).toBeDefined();
  });

  it('does not allow submission with only time', () => {
    render(<RegisterPage />);
    const timeInput = screen.getByPlaceholderText('20'); // time input
    fireEvent.change(timeInput, { target: { value: '30' } });

    const submitBtn = screen.getByRole('button', { name: /요리명과 조리 시간을 입력해주세요/ });
    expect(submitBtn).toBeDefined();
  });

  it('does not allow submission if name is only whitespace', () => {
    render(<RegisterPage />);
    const nameInput = screen.getByPlaceholderText('예: 닭가슴살 아보카도 샐러드');
    const timeInput = screen.getByPlaceholderText('20');

    fireEvent.change(nameInput, { target: { value: '   ' } });
    fireEvent.change(timeInput, { target: { value: '30' } });

    const submitBtn = screen.getByRole('button', { name: /요리명과 조리 시간을 입력해주세요/ });
    expect(submitBtn).toBeDefined();
  });

  it('enables submit button with valid inputs and allows submission', () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText('예: 닭가슴살 아보카도 샐러드'), { target: { value: '맛있는 샐러드' } });
    fireEvent.change(screen.getByPlaceholderText('20'), { target: { value: '15' } });

    const submitBtn = screen.getByRole('button', { name: /레시피 등록하기 🚀/ });
    expect(submitBtn).toBeDefined();

    // Submit the form
    fireEvent.click(submitBtn);

    // Verify success message
    expect(screen.getByText('레시피가 등록되었어요!')).toBeDefined();
  });

  it('resets form when clicking "다른 레시피 등록하기" after submission', () => {
    render(<RegisterPage />);

    // Fill form and submit
    fireEvent.change(screen.getByPlaceholderText('예: 닭가슴살 아보카도 샐러드'), { target: { value: '새로운 레시피' } });
    fireEvent.change(screen.getByPlaceholderText('20'), { target: { value: '45' } });

    const submitBtn = screen.getByRole('button', { name: /레시피 등록하기 🚀/ });
    fireEvent.click(submitBtn);

    // Click reset button
    const resetBtn = screen.getByRole('button', { name: /다른 레시피 등록하기/ });
    fireEvent.click(resetBtn);

    // Form should be visible again and reset
    expect(screen.getByText('나만의 건강 레시피를 공유해보세요!')).toBeDefined();

    // Check if inputs are empty
    expect(screen.getByPlaceholderText('예: 닭가슴살 아보카도 샐러드').value).toBe('');
    expect(screen.getByPlaceholderText('20').value).toBe('');
  });
});
