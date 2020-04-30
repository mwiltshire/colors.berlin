import React, { FC } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../theme';

type TagsProps = {
  tagList: string[];
  border?: boolean;
};

const Tags: FC<TagsProps> = ({ tagList, border = false }) => {
  const theme = useTheme<Theme>();
  return (
    <ul
      css={css`
        display: flex;
        flex-direction: row;
        list-style: none;
        margin: 0;
        font-size: ${theme.fontSizes.xs};
        & li {
          margin: 0 0.5rem 0 0;
          ${border &&
          `
            padding: 0.1rem 0.4rem;
            border: 1px solid currentColor;
            border-radius: 2px;
          `}
        }
      `}
    >
      {tagList.map(tag => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
};

export default Tags;
