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

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path.startsWith('/404')) {
    page.context.layout = '404';
    // Track whether the dev 404 page is being created.
    // Will check this in wrapPages in order to avoid
    // duplicate Layouts.
  } else if (page.path.startsWith('/dev-404')) {
    page.context.layout = 'dev404';
  } else if (page.path === '/') {
    page.context.layout = 'home';
  } else {
    page.context.layout = 'palette';
  }
  createPage(page);
};
