export type Theme = {
  black: string;
  white: string;
  fontStack: string;
  background: string;
  text: string;
  fontSizes: {
    /** 0.75rem */
    xs: string;
    /** 0.875rem */
    sm: string;
    /** 1rem */
    md: string;
    /** 1.125rem */
    lg: string;
    /** 1.25rem' */
    xl: string;
    /** 1.5rem */
    '2xl': string;
    /** 1.875rem */
    '3xl': string;
    /** 2.25rem'*/
    '4xl': string;
    /** 3rem */
    '5xl': string;
    /** 4rem */
    '6xl': string;
  };
};

export const global = {
  black: '#000',
  white: '#fff',
  fontStack:
    "'Josefin Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem'
  }
};

export const light: Theme = {
  ...global,
  background: '#fff6de',
  text: global.black
};

export const dark: Theme = {
  ...global,
  background: '#282828',
  text: global.white
};
