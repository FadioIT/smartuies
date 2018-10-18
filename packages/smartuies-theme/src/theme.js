export const colors = {
  textLighter: '#666',
  text: '#444',
  textDarker: '#222',
  primary: '#2196f3',
  primaryDarker: '#1e88e5',
  primaryLighter: '#64b5f6',
  secondary: '#607d8b',
  secondaryDarker: '#455a64',
  risky: '#ffc107',
  riskyDarker: '#ffb300',
  fatal: '#f44336',
  fatalDarker: '#e53935',
};

export const fonts = {
  normal: 'sans-serif',
};

export const fontSizes = {
  small: 12,
  normal: 14,
  big: 24,
};

export const boxShadows = {
  focus: '0 0 0 3px rgba(0,0,0,.15)',
};

export const mixins = {
  outsight: {
    border: 'none',
    clip: 'rect(0,0,0,0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: 1,
  },
};

export const globals = {
  color: colors.text,
  fontSize: fontSizes.normal,
  fontFamily: fonts.normal,
};
