import React, { FC } from 'react';
import { css, Global } from '@emotion/core';
import { ThemeProvider, withTheme } from 'emotion-theming';
import { useStaticQuery, graphql } from 'gatsby';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './header';
import { makeGlobalStyles } from '../global';
import { Theme, light, dark } from '../theme';
import Container from './container';
import { useThemeVariation } from '../hooks';

import 'typeface-josefin-sans';

type LayoutProps = {
  showFooter?: boolean;
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

const Layout: FC<LayoutProps> = ({ children, location, showFooter = true }) => {
  const [theme, setTheme] = useThemeVariation();
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <Header theme={theme} setTheme={setTheme} />
      <GlobalStyles />
      <Container>
        <AnimatePresence exitBeforeEnter>
          <motion.main
            key={location.pathname}
            variants={variants}
            initial="exit"
            animate="enter"
            exit="exit"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </Container>
      {showFooter && (
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
    </ThemeProvider>
  );
};

export default Layout;
