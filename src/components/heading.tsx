import React, { FC } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { BP_MIN_LG } from '../components/grid';
import { Theme } from '../theme';

type HeadingProps = {
  size: 'normal' | 'large';
};

const Heading: FC<HeadingProps> = ({ children, size = 'normal', ...props }) => {
  const theme = useTheme<Theme>();
  return (
    <h1
      css={css`
        font-size: ${size === 'large'
          ? theme.fontSizes['4xl']
          : theme.fontSizes['2xl']};
        ${BP_MIN_LG} {
          font-size: ${size === 'large'
            ? theme.fontSizes['6xl']
            : theme.fontSizes['4xl']};
        }
      `}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Heading;
