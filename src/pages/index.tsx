import React, { FC } from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
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
  <>
    {/* <SEO title="Home" /> */}
    <div
      css={css`
        padding: 9vmin 0;
      `}
    >
      <Row>
        <Col lg={4}>
          <motion.h1
            key="home-heading"
            initial={{ y: 30 }}
            animate={{
              y: 0,
              transition: { duration: 0.5 }
            }}
            exit={{ y: -30, opacity: 0, transition: { duration: 0.5 } }}
          >
            Color palettes from Berlin streets
          </motion.h1>
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
  </>
);

export default Index;
