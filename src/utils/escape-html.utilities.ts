const HTML_ENTITIES: Record<string, string> = {
  '"': '&quot;',
  '&': '&amp;',
  "'": '&#39;',
  '<': '&lt;',
  '>': '&gt;',
};

export const escapeHtml = (value: string): string =>
  value.replaceAll(/["&'<>]/g, (character) => HTML_ENTITIES[character]);
