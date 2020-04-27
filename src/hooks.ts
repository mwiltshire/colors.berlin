import { useState, useEffect } from 'react';

declare global {
  interface Window {
    __theme: 'light' | 'dark';
    __onThemeChange: () => void;
  }
}

export const useThemeVariation = (): [
  'light' | 'dark',
  (variation: 'light' | 'dark') => void
] => {
  const [variation, setVariation] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    setVariation(window.__theme);
    window.__onThemeChange = () => setVariation(window.__theme);
  }, []);
  return [
    variation,
    (variation: 'light' | 'dark') => {
      localStorage.setItem('__colorsberlin_theme', variation);
      document.body.className = variation;
      window.__theme = variation;
      setVariation(variation);
    }
  ];
};
