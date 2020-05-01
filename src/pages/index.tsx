import React, { FC } from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import { Row, Col } from '../components/grid';
import Palette from '../components/palette';
import Heading from '../components/heading';

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
        <Heading
          size="large"
          css={css`
            padding: 2vmin 0;
          `}
        >
          Color palettes from Berlin streets
        </Heading>
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
