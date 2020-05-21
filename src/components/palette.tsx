import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import VisuallyHidden from './visually-hidden';
import Tags from './tags';
import { AnimatePresence, motion } from 'framer-motion';

export type PaletteData = {
  name: string;
  colors: string[];
  plz: string;
  district: string;
  slug: string;
};

type PaletteProps = {
  palette: PaletteData;
};

const variants = {
  initial: { opacity: 0, y: '20%' },
  enter: {
    opacity: 1,
    y: 0,
    transition: { mass: 10 }
  }
};

const Palette: FC<PaletteProps> = ({ palette }) => (
  <AnimatePresence>
    <motion.div
      variants={variants}
      css={css`
        position: relative;
        margin-bottom: 4vmin;
        padding: 2vmin;
      `}
    >
      <Link
        to={`/${palette.slug}`}
        css={css`
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          border-radius: 5px;
          color: inherit;
          box-shadow: inset 0 0 0 1px currentColor;
          transition: box-shadow 300ms ease;
          &:hover {
            box-shadow: inset 0 0 0 3px currentColor;
          }
          &:focus {
            outline: none;
          }
          &.focus-visible {
            border: 2px solid currentColor;
          }
        `}
      >
        <VisuallyHidden>{`Color palette for ${palette.name}`}</VisuallyHidden>
      </Link>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          overflow: hidden;
          border-radius: 5px;
          height: 12rem;
        `}
      >
        {palette.colors.map(color => (
          <div
            key={color}
            css={css`
            height: 100%;
            background-color: ${color};
            flex: 1;
            &:first-of-type {
              flex: 2.5;
            }
            &:last-of-type {
              flex 1.75;
            }
          `}
          />
        ))}
      </div>
      <p
        css={css`
          margin: 0.5rem 0;
        `}
      >
        {palette.name}
      </p>
      <Tags tagList={[palette.plz, palette.district]} />
    </motion.div>
  </AnimatePresence>
);

export default Palette;
