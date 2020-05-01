import React from 'react';
import Layout from './src/components/layout';

import 'focus-visible';

export const wrapPageElement = ({ element, props }) =>
  // The dev 404 will be wrapped in the Layout component.
  // When clicking through to the custom 404, the layout
  // will then be duplicated. This is a workaround to avoid
  // that by not rendering Layout in the dev version.
  props.pageContext?.layout !== 'dev404' ? (
    <Layout {...props}>{element}</Layout>
  ) : (
    element
  );
