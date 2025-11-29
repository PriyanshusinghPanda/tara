import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';
import { spacing, borderRadius, shadows } from '../theme/spacing';

interface CardProps {
  children: React.ReactNode;
  gradient?: boolean;
  gradientColors?: string[];
  onPress?: () => void;
  style?: ViewStyle;
  padding?: number;
}

export default function Card({
  children,
  gradient = false,
  gradientColors,
  onPress,
  style,
  padding = spacing.lg,
}: CardProps) {
  const containerStyle = [
    styles.card,
    { padding },
    style,
  ];

  if (gradient) {
    const colors = gradientColors || ['#FF6B35', '#FFB800'];
    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={containerStyle}
          >
            {children}
          </LinearGradient>
        </TouchableOpacity>
      );
    }
    return (
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={containerStyle}
      >
        {children}
      </LinearGradient>
    );
  }

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={containerStyle}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    ...shadows.md,
  },
});
