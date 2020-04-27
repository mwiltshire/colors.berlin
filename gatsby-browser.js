export const onClientEntry = () => {
  const preferredTheme = localStorage.getItem('__colorsberlin_theme');
  if (preferredTheme) {
    window.__theme = preferredTheme;
  } else {
    window.__theme = window.matchMedia('(prefers-color-scheme: dark)')
      ? 'dark'
      : 'light';
  }
};
