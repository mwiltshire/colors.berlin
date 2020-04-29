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

const duration = 0.7;

const variants = {
  enter: {
    opacity: 1,
    transition: {
      duration: duration
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: duration }
  }
};

const Layout: FC<LayoutProps> = ({ children, location, pageContext }) => {
  const [theme, setTheme] = useThemeVariation();
  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <Header theme={theme} setTheme={setTheme} />
      <GlobalStyles />
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={location.pathname}
          variants={variants}
          initial="exit"
          animate="enter"
          exit="exit"
        >
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
              © whenever colors.berlin
            </footer>
          )}
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Layout;
