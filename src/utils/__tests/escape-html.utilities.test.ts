import { describe, expect, it } from 'vitest';
import { escapeHtml } from '../escape-html.utilities';

describe('escapeHtml', () => {
  it('escapes every special character', () => {
    expect(escapeHtml('"')).toBe('&quot;');
    expect(escapeHtml('&')).toBe('&amp;');
    expect(escapeHtml("'")).toBe('&#39;');
    expect(escapeHtml('<')).toBe('&lt;');
    expect(escapeHtml('>')).toBe('&gt;');
  });

  it('escapes every occurrence, not just the first', () => {
    expect(escapeHtml('<<>>')).toBe('&lt;&lt;&gt;&gt;');
  });

  it('neutralises a script tag', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
    );
  });

  it('leaves safe text untouched', () => {
    expect(escapeHtml('Jane Doe 123')).toBe('Jane Doe 123');
    expect(escapeHtml('')).toBe('');
  });
});
