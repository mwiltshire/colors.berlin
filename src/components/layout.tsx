import React, { FC } from 'react';
import { css, Global } from '@emotion/core';
import { ThemeProvider, withTheme } from 'emotion-theming';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './header';
import { makeGlobalStyles } from '../global';
import { Theme, light, dark } from '../theme';
import Container from './container';
import { useThemeVariation } from '../hooks';

import 'typeface-josefin-sans';

type LayoutProps = {
  pageContext: {
    layout: 'home' | 'palette' | '404';
  };
  location: Location;
};

const GlobalStyles = withTheme(({ theme }: { theme: Theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
));

const Layout: FC<LayoutProps> = ({ children, pageContext }) => {
  const [theme, setTheme] = useThemeVariation();
  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <Header theme={theme} setTheme={setTheme} />
      <GlobalStyles />
      <main>
        <Container>{children}</Container>
      </main>
      {pageContext.layout === 'home' && (
        <footer
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            height: 2rem;
            font-size: 0.75rem;
          `}
        >
          <span>
            ©{' '}
            <span aria-label="ASCII shrug" role="img">
              ¯\_(ツ)_/¯
            </span>{' '}
            colors.berlin
          </span>
        </footer>
      )}
    </ThemeProvider>
  );
};

export default Layout;
