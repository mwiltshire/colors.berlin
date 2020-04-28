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
  const [variation, setVariation] = useState<'light' | 'dark'>(window.__theme);
  useEffect(() => {
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

export const useFocusToggle = (): [boolean, () => void, () => void] => {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  return [focused, handleFocus, handleBlur];
};
