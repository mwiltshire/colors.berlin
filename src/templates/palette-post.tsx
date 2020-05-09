import React, { FC } from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import { PaletteData } from '../components/palette';
import { BP_MIN_LG } from '../components/grid';
import SEO from '../components/seo';
import Heading from '../components/heading';
import Tags from '../components/tags';
import PaletteColor from '../components/palette-color';

type PalettePostProps = {
  data: {
    palette: Omit<PaletteData, 'slug'>;
  };
};

export const query = graphql`
  query($slug: String) {
    palette: palettesJson(slug: { eq: $slug }) {
      colors
      district
      name
      plz
    }
  }
`;

const PalettePost: FC<PalettePostProps> = ({ data: { palette } }) => (
  <>
    <SEO title={`${palette.name} | colors.berlin`} />
    <div
      css={css`
        height: calc(100vh - 3rem);
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          padding: 7vmin 0;
        `}
      >
        <Heading>{palette.name}</Heading>
        <Tags tagList={[palette.plz, palette.district]} border />
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
          <PaletteColor key={color} color={color} />
        ))}
      </div>
    </div>
  </>
);

export default PalettePost;
