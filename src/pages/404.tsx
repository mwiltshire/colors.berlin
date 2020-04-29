import React, { FC } from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import PalettePost from '../templates/palette-post';

type NotFoundProps = {
  data: {
    palette: {
      colors: string[];
      district: string;
      name: string;
      plz: string;
      slug: string;
    };
  };
};

export const query = graphql`
  query NotFoundQuery {
    palette: palettesJson(name: { eq: "Sterni" }) {
      colors
      district
      name
      plz
      slug
    }
  }
`;

const NotFoundPage: FC<NotFoundProps> = ({ data }) => (
  <>
    <SEO title="404: Nope" />
    {/* Let's show a Sterni palette, why the hell not */}
    <PalettePost data={data} />
  </>
);

export default NotFoundPage;
