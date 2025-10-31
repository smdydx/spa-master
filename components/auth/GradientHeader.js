import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OmbaroTheme } from '../../constants/theme';

export default function GradientHeader({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>✨</Text>
      </View>
      <Text style={styles.brand}>OMBARO</Text>
      <Text style={styles.tagline}>Beauty & Wellness Hub</Text>
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: OmbaroTheme.spacing.xl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: OmbaroTheme.borderRadius.md,
    backgroundColor: OmbaroTheme.colors.roseGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: OmbaroTheme.spacing.md,
  },
  icon: {
    fontSize: 32,
  },
  brand: {
    fontSize: OmbaroTheme.fontSize.xxl,
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
    letterSpacing: 2,
    marginBottom: OmbaroTheme.spacing.xs,
  },
  tagline: {
    fontSize: OmbaroTheme.fontSize.sm,
    color: OmbaroTheme.colors.roseGoldDark,
    fontWeight: OmbaroTheme.fontWeight.medium,
    marginBottom: OmbaroTheme.spacing.lg,
  },
  title: {
    fontSize: OmbaroTheme.fontSize.xl,
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
    textAlign: 'center',
    marginTop: OmbaroTheme.spacing.lg,
  },
  subtitle: {
    fontSize: OmbaroTheme.fontSize.md,
    color: OmbaroTheme.colors.textGray,
    textAlign: 'center',
    marginTop: OmbaroTheme.spacing.sm,
  },
});
