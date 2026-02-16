export const colors = {
  primary: '#FF6B35',
  secondary: '#4ECDC4',
  accent: '#FFE66D',
  background: '#FFFFFF',
  surface: '#F7F7F7',
  text: '#2D3436',
  textLight: '#636E72',
  success: '#00B894',
  error: '#E74C3C',
  white: '#FFFFFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export default {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
};
