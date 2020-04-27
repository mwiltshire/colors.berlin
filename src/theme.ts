export type Theme = {
  fontStack: string;
  background: string;
  text: string;
};

const global = {
  fontStack:
    "'Josefin Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
};

export const light: Theme = {
  ...global,
  background: '#fff6de',
  text: '#000'
};

export const dark: Theme = {
  ...global,
  background: '#282828',
  text: '#fff'
};
