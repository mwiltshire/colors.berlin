import React, { FC } from 'react';
import { css, Global } from '@emotion/core';
import { ThemeProvider, withTheme } from 'emotion-theming';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import { makeGlobalStyles } from '../global';
import { Theme, light, dark } from '../theme';
import Container from './container';
import { useThemeVariation } from '../hooks';

import 'typeface-josefin-sans';

type LayoutProps = {
  showFooter?: boolean;
};

const GlobalStyles = withTheme(({ theme }: { theme: Theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
));

const Layout: FC<LayoutProps> = ({ children, showFooter = true }) => {
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
        <main>{children}</main>
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
