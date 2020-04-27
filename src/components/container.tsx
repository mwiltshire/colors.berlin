import React, { FC } from 'react';
import { css } from '@emotion/core';

const Container: FC = ({ children }) => (
  <div
    css={css`
      padding: 0;
      width: 100%;
      padding: 0 2vmin;
    `}
  >
    {children}
  </div>
);

export default Container;
