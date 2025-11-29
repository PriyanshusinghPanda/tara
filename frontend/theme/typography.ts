import { TextStyle } from 'react-native';

export const typography: Record<string, TextStyle> = {
  // Headings
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.2,
  },
  h4: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
  },
  
  // Body text
  bodyLarge: {
    fontFamily: 'Inter-Medium',
    fontSize: 19,
    lineHeight: 28,
    letterSpacing: 0,
  },
  body: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  
  // Special
  caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  button: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 19,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  buttonSmall: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
};
