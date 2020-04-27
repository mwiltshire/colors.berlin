import React, { FC } from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { Row, Col } from '../components/grid';
import Palette from '../components/palette';
// import SEO from '../components/seo';

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
  };
};

const Index: FC<IndexProps> = ({ data }) => (
  <Layout>
    {/* <SEO title="Home" /> */}
    <div
      css={css`
        padding: 9vmin 0;
      `}
    >
      <Row>
        <Col lg={4}>
          <h1>Color palettes from Berlin streets</h1>
        </Col>
      </Row>
    </div>
    <Row>
      {data.allPalettesJson.palettes.map(({ id, ...restPalette }) => (
        <Col key={id} md={6} lg={4}>
          <Palette palette={restPalette} />
        </Col>
      ))}
    </Row>
  </Layout>
);

export default Index;
