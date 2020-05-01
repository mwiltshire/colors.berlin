import React, { FC } from 'react';
import { css, Global } from '@emotion/core';
import { ThemeProvider, withTheme } from 'emotion-theming';
import Header from './header';
import { makeGlobalStyles } from '../global';
import { Theme, light, dark, global } from '../theme';
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
  const [themeVariation, setThemeVariation] = useThemeVariation();
  return (
    // TODO: The only things being accessed in this theme context are
    // elements that both light/dark themes shared. This could be made
    // a bit clearer.
    <ThemeProvider theme={themeVariation === 'light' ? light : dark}>
      <Header theme={themeVariation} setTheme={setThemeVariation} />
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
            height: 3rem;
            font-size: ${global.fontSizes.xs};
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
