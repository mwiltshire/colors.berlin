import { useState } from 'react';

export const useThemeVariation = (): [
  'light' | 'dark',
  (variation: 'light' | 'dark') => void
] => {
  const [variation, setVariation] = useState<'light' | 'dark'>(
    (window as any).__theme || 'light'
  );
  return [
    variation,
    (variation: 'light' | 'dark') => {
      localStorage.setItem('__colorsberlin_theme', variation);
      setVariation(variation);
    }
  ];
};
