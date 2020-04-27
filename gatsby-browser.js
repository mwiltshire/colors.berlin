import 'focus-visible';

export const onClientEntry = () => {
  const preferredTheme = localStorage.getItem('__colorsberlin_theme');
  window.__setTheme = variation => (document.body.className = variation);
  if (preferredTheme) {
    window.__theme = preferredTheme;
    document.body.className = preferredTheme;
  } else {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    window.__theme = darkQuery.matches ? 'dark' : 'light';
    document.body.className = window.__theme;
    darkQuery.addListener(e => {
      window.__theme = e.matches ? 'dark' : 'light';
      window.__onThemeChange();
    });
  }
};
