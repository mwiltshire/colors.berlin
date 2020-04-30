import React, { FC } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { BP_MIN_LG } from '../components/grid';
import { Theme } from '../theme';

const Heading: FC = ({ children, ...props }) => {
  const theme = useTheme<Theme>();
  return (
    <h1
      css={css`
        font-size: ${theme.fontSizes.lg};
        ${BP_MIN_LG} {
          font-size: ${theme.fontSizes['4xl']};
        }
      `}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Heading;
