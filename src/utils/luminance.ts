const getRgbFromHex = (hex: string): [number, number, number] => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return [r, g, b];
};

export const luminance = (hex: string) => {
  const [r, g, b] = getRgbFromHex(hex).map(c => {
    const _c = c / 255;
    if (_c <= 0.03928) {
      return _c / 12.92;
    }
    return Math.pow((_c + 0.055) / 1.055, 2.4);
  });
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return l;
};

export const isDark = (hex: string) => luminance(hex) < 0.179;
export const isLight = (hex: string) => !isDark(hex);
