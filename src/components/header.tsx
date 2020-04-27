import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import Container from './container';

type HeaderProps = {
  theme: 'light' | 'dark';
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
              &:visited {
                color: inherit;
              }
            `}
          >
            colors.berlin
          </Link>
          <div
            css={css`
              display: flex;
              & button {
                background: none;
                outline: none;
                border: none;
                padding: 0;
                color: inherit;
                &:not(:disabled) {
                  cursor: pointer;
                }
              }
            `}
          >
            <button
              css={css`
                text-decoration: ${theme === 'light' ? 'line-through' : 'none'};
              `}
              disabled={theme === 'light'}
              onClick={() => setTheme('light')}
              aria-label="Apply light color theme"
            >
              light
            </button>
            <span aria-hidden css={css`margin 0 0.25rem; user-select: none`}>
              {' '}
              |{' '}
            </span>
            <button
              css={css`
                text-decoration: ${theme === 'dark' ? 'line-through' : 'none'};
              `}
              disabled={theme === 'dark'}
              onClick={() => setTheme('dark')}
              aria-label="Apply dark color theme"
            >
              dark
            </button>
          </div>
        </div>
      </Container>
    </nav>
  </header>
);

export default Header;
