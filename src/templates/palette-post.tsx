import React, { FC } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { graphql } from 'gatsby';
import { PaletteData } from '../components/palette';
import { BP_MIN_LG } from '../components/grid';
import { isDark } from '../utils/luminance';
import SEO from '../components/seo';
import Heading from '../components/heading';
import Tags from '../components/tags';
import { Theme } from '../theme';

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

const PalettePost: FC<PalettePostProps> = ({ data: { palette } }) => {
  const theme = useTheme<Theme>();
  return (
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
            <div
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
              {color}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PalettePost;
