import React, { FC } from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { PaletteData } from '../components/palette';
import { BP_MIN_LG } from '../components/grid';
import { isDark } from '../utils/luminance';

type PalettePostProps = {
  data: {
    allPalettesJson: {
      palettes: Omit<PaletteData, 'slug'>[];
    };
  };
};

export const query = graphql`
  query($slug: String) {
    allPalettesJson(filter: { slug: { eq: $slug } }) {
      palettes: nodes {
        colors
        district
        name
        plz
      }
    }
  }
`;

const PalettePost: FC<PalettePostProps> = ({
  data: {
    allPalettesJson: {
      palettes: [palette]
    }
  }
}) => (
  <>
    {/* <AnimatePresence> */}
    <div
      css={css`
        height: calc(100vh - 3rem);
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          padding: 9vmin 0;
        `}
      >
        <motion.h1
          key="palette-heading"
          initial={{
            y: 30
          }}
          animate={{
            y: 0,
            transition: { duration: 0.5 }
          }}
          exit={{
            y: -30,
            transition: { duration: 0.5 }
          }}
        >
          {palette.name}
        </motion.h1>
        <ul
          css={css`
            display: flex;
            flex-direction: row;
            list-style: none;
            margin: 0;
            font-size: 0.75rem;
            & li {
              margin: 0 0.5rem 0 0;
              padding: 0.1rem 0.4rem;
              border: 1px solid currentColor;
              border-radius: 2px;
            }
          `}
        >
          <li>{palette.plz}</li>
          <li>{palette.district}</li>
        </ul>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          ${BP_MIN_LG} {
            flex-direction: row;
          }
          flex: 1;
          margin: 0 -2vmin;
        `}
      >
        {palette.colors.map(color => (
          <div
            key={color}
            css={css`
            height: 100%;
            background-color: ${color};
            color: ${isDark(color) ? '#fff' : '#000'};
            font-size: 0.9rem;
            padding: 2vmin;
            &:first-of-type {
              flex: 2.5;
            }
            &:last-of-type {
              flex 1.75;
            }
            &:not(:first-of-type):not(:last-of-type) {
              flex: 1;
            }
          `}
          >
            {color}
          </div>
        ))}
      </div>
    </div>
    {/* </AnimatePresence> */}
  </>
);

export default PalettePost;
