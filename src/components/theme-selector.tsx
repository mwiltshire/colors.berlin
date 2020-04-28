import React, { FC, useState } from 'react';
import { css } from '@emotion/core';
import VisuallyHidden from './visually-hidden';
import { useFocusToggle } from '../hooks';

type ThemeSelectorProps = {
  theme: 'light' | 'dark';
  setTheme: (variation: 'light' | 'dark') => void;
};

const ThemeSelector: FC<ThemeSelectorProps> = ({ theme, setTheme }) => {
  const [checked, setChecked] = useState(theme === 'dark');
  const [focused, handleFocus, handleBlur] = useFocusToggle();
  return (
    <div
      css={css`
      display: flex;
      ${
        focused &&
        `
        outline: 2px solid currentColor;
        outline-offset: 2px;`
      }
      }
    `}
    >
      <VisuallyHidden>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            setTheme(checked ? 'light' : 'dark');
            setChecked(prevState => !prevState);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Switch between light and dark theme"
        />
      </VisuallyHidden>
      <span
        css={css`
          .light & {
            text-decoration: line-through;
            cursor: default;
            color: #5d5d5d;
          }
          .dark & {
            text-decoration: none;
            cursor: pointer;
          }
        `}
        onClick={() => setTheme('light')}
        aria-hidden
      >
        light
      </span>
      <span aria-hidden css={css`margin 0 0.25rem; user-select: none`}>
        {' '}
        |{' '}
      </span>
      <span
        css={css`
          .light & {
            text-decoration: none;
            cursor: pointer;
          }
          .dark & {
            text-decoration: line-through;
            cursor: default;
            color: #5d5d5d;
          }
        `}
        onClick={() => setTheme('dark')}
        aria-hidden
      >
        dark
      </span>
    </div>
  );
};

export default ThemeSelector;
