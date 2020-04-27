const path = require('path');
const data = require('./src/data/palettes.json');

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  data.forEach(palette => {
    createPage({
      path: palette.slug,
      component: path.resolve('./src/templates/palette-post.tsx'),
      context: {
        slug: palette.slug
      }
    });
  });
};
