import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import Container from './container';
import ThemeSelector from './theme-selector';

type HeaderProps = {
  theme: 'light' | 'dark' | null;
  setTheme: (theme: 'light' | 'dark') => void;
};

const Header: FC<HeaderProps> = ({ theme, setTheme }) => (
  <header>
    <nav>
      <Container>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 3rem;
            font-size: 0.75rem;
          `}
        >
          <Link
            to="/"
            css={css`
              text-decoration: none;
              user-select: none;
              color: inherit;
              &:visited {
                color: inherit;
              }
              &:focus {
                outline: none;
              }
              &.focus-visible {
                outline: 2px solid currentColor;
                outline-offset: 2px;
              }
            `}
          >
            colors.berlin
          </Link>
          {theme !== null && (
            <ThemeSelector theme={theme} setTheme={setTheme} />
          )}
        </div>
      </Container>
    </nav>
  </header>
);

export default Header;
