import React, { FC } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import copy from 'copy-text-to-clipboard';
import { BP_MIN_LG } from '../components/grid';
import { isDark } from '../utils/luminance';
import { Theme } from '../theme';
import { motion, AnimatePresence } from 'framer-motion';

import { useCopyColor } from '../hooks';

type PaletteColorProps = {
  color: string;
};

const variants = {
  initial: { opacity: 0, y: '20%' },
  enter: {
    opacity: 1,
    y: 0,
    transition: { mass: 10 }
  }
};

const PaletteColor: FC<PaletteColorProps> = ({ color }) => {
  const theme = useTheme<Theme>();
  const [isCopied, handleCopy] = useCopyColor(copy);
  return (
    <motion.div
      variants={variants}
      key={color}
      css={css`
      height: 100%;
      background-color: ${color};
      color: ${isDark(color) ? theme.white : theme.black};
      font-size: ${theme.fontSizes.sm};
      padding: 2vmin;
      flex: 1;
      &:last-of-type {
        flex 3;
      }
      &:first-of-type {
        flex: 1;
      }
      ${BP_MIN_LG} {
        &:first-of-type {
          flex: 2.5;
        }
        &:last-of-type {
          flex 1.75;
        }
      }
    `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <span>{color}</span>
        <span
          aria-live="polite"
          css={css`
            position: relative;
            display: inline-flex;
          `}
        >
          <AnimatePresence>
            {isCopied && (
              <motion.span
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: '-115%' }}
                exit={{ opacity: 0 }}
                key="tooltip"
                css={css`
                  position: absolute;
                  color: ${theme.white};
                  opacity: 1;
                  background-color: #000;
                  padding: 0.2rem 0.5rem;
                  font-size: 0.8rem;
                  top: -7px;
                  border-radius: 2px;
                  opacity: ${isCopied ? '1' : 0};
                  &::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 100%;
                    margin-top: -5px;
                    border-width: 5px;
                    border-style: solid;
                    border-color: transparent transparent transparent black;
                  }
                `}
              >
                Copied!
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={() => handleCopy(color)}
            aria-label={`Copy hex color code ${color} to clipboard`}
            css={css`
              border: none;
              outline: none;
              background: none;
              padding: 0;
              color: currentColor;
              opacity: 0.5;
              cursor: pointer;
              &:hover {
                opacity: 1;
              }
              &:focus {
                outline: none;
              }
              &.focus-visible {
                outline: 2px solid currentColor;
                opacity: 1;
                outline-offset: 2px;
              }
              & svg {
                height: 1rem;
                width: 1rem;
              }
              & path {
                fill: currentColor;
              }
            `}
          >
            <svg
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M18 6v-6h-18v18h6v6h18v-18h-6zm-12 10h-4v-14h14v4h-10v10zm16 6h-14v-14h14v14z" />
            </svg>
          </button>
        </span>
      </div>
    </motion.div>
  );
};

export default PaletteColor;
