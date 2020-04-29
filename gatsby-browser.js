import React from 'react';
import Layout from './src/components/layout';

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

export const wrapPageElement = ({ element, props }) =>
  // The dev 404 will be wrapped in the Layout component.
  // When clicking through to the custom 404, the layout
  // will then be duplicated. This is a workaround to avoid
  // that by not rendering Layout in the dev version.
  props.pageContext?.layout !== 'dev404' ? (
    <Layout {...props}>{element}</Layout>
  ) : (
    element
  );

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  if (location.action === 'PUSH') {
    window.setTimeout(() => window.scrollTo(0, 0), 800);
  } else {
    const savedPosition = getSavedScrollPosition(location);
    window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), 800);
  }
  return false;
};
