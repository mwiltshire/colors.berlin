import React, { FC } from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import { Row, Col, BP_MIN_LG } from '../components/grid';
import Palette from '../components/palette';

export const query = graphql`
  query IndexPageQuery {
    allPalettesJson {
      palettes: nodes {
        colors
        district
        name
        plz
        slug
        id
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

type PaletteData = {
  id: string;
  colors: string[];
  district: string;
  name: string;
  plz: string;
  slug: string;
};

type IndexProps = {
  data: {
    allPalettesJson: {
      palettes: PaletteData[];
    };
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
};

const Index: FC<IndexProps> = ({ data }) => (
  <>
    <SEO title={data.site.siteMetadata.title} />
    <Row>
      <Col lg={4}>
        <h1
          css={css`
            padding: 9vmin 0;
            font-size: 2rem;
            ${BP_MIN_LG} {
              font-size: 2.5rem;
            }
          `}
        >
          Color palettes from Berlin streets
        </h1>
      </Col>
    </Row>
    <Row>
      {data.allPalettesJson.palettes.map(({ id, ...restPalette }) => (
        <Col key={id} md={6} lg={4}>
          <Palette palette={restPalette} />
        </Col>
      ))}
    </Row>
  </>
);

export default Index;
