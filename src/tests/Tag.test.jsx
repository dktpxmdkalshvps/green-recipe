import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Tag } from '../App.jsx';

describe('Tag component', () => {
  it('renders correctly with default green color', () => {
    const { container } = render(<Tag label="Green Tag" />);
    const span = container.querySelector('span');

    expect(span.textContent).toBe('Green Tag');

    // Checking default color (green) styles
    expect(span.style.background).toContain('rgba(90, 142, 68, 0.12)');
    expect(span.style.color).toBe('rgb(74, 124, 53)'); // #4a7c35 converted to rgb
    expect(span.style.border).toBe('1px solid rgba(90, 142, 68, 0.25)');
  });

  it('renders correctly with orange color', () => {
    const { container } = render(<Tag label="Orange Tag" color="orange" />);
    const span = container.querySelector('span');

    expect(span.textContent).toBe('Orange Tag');

    // Checking orange color styles
    expect(span.style.background).toContain('rgba(224, 124, 58, 0.12)');
    expect(span.style.color).toBe('rgb(196, 97, 26)'); // #c4611a converted to rgb
    expect(span.style.border).toBe('1px solid rgba(224, 124, 58, 0.25)');
  });

  it('applies common styles regardless of color', () => {
    const { container } = render(<Tag label="Common Tag" />);
    const span = container.querySelector('span');

    expect(span.style.display).toBe('inline-block');
    expect(span.style.borderRadius).toBe('20px');
    expect(span.style.padding).toBe('2px 10px');
    expect(span.style.fontSize).toBe('11px');
    expect(span.style.fontWeight).toBe('700');
  });
});
