import { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    __theme: 'light' | 'dark';
    __onThemeChange: () => void;
  }
}

export const useThemeVariation = (): [
  'light' | 'dark' | null,
  (variation: 'light' | 'dark') => void
] => {
  const [variation, setVariation] = useState<'light' | 'dark' | null>(null);
  useEffect(() => {
    setVariation(window.__theme);
    window.__onThemeChange = () => setVariation(window.__theme);
  }, []);
  return [
    variation,
    (variation: 'light' | 'dark') => {
      localStorage.setItem('theme', variation);
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

export const useCopyColor = (
  copyFunction: (arg: string) => void
): [boolean, (text: string) => void] => {
  const [isCopied, setIsCopied] = useState(false);
  const copyRef = useRef<number | null>(null);
  const handleCopy = (text: string) => {
    if (typeof copyRef.current === 'number') {
      window.clearTimeout(copyRef.current);
    }
    copyFunction(text);
    setIsCopied(true);
    copyRef.current = window.setTimeout(() => {
      setIsCopied(false);
      copyRef.current = null;
    }, 3000);
  };
  return [isCopied, handleCopy];
};
