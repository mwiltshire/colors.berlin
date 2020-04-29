import React, { FC } from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import SEO from '../components/seo';
import { Row, Col } from '../components/grid';
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

const duration = 0.7;

const variants = {
  initial: {
    y: 30
  },
  enter: {
    y: 0,
    transition: { duration }
  },
  exit: {
    y: -30,
    transition: { duration }
  }
};

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
    <div
      css={css`
        padding: 9vmin 0;
      `}
    >
      <Row>
        <Col lg={4}>
          <motion.h1
            key="home-heading"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
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
