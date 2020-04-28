import React from 'react';
import Layout from './src/components/layout';

export const wrapPageElement = ({ element, props }) => {
  console.log(props.location.pathname);
  return props.location === '/' ? (
    <Layout {...props}>{element}</Layout>
  ) : (
    <Layout showFooter={false} {...props}>
      {element}
    </Layout>
  );
};
