import React, { FC } from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
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

const variants = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1,
    transition: { staggerChildren: 0.07 }
  }
};

const headingVariants = {
  initial: { opacity: 0, y: '20%' },
  enter: { opacity: 1, y: 0, transition: { mass: 10 } }
};

const Index: FC<IndexProps> = ({ data }) => (
  <>
    <SEO title={data.site.siteMetadata.title} />
    <motion.div variants={headingVariants} initial="initial" animate="enter">
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
    </motion.div>
    <motion.div variants={variants} initial="initial" animate="enter">
      <Row>
        {data.allPalettesJson.palettes.map(({ id, ...restPalette }) => (
          <Col key={id} md={6} lg={4}>
            <Palette palette={restPalette} />
          </Col>
        ))}
      </Row>
    </motion.div>
  </>
);

export default Index;
