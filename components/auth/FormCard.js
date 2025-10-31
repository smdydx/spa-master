import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OmbaroTheme } from '../../constants/theme';

export default function FormCard({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: OmbaroTheme.colors.darkBg,
    borderRadius: OmbaroTheme.borderRadius.lg,
    padding: OmbaroTheme.spacing.xl,
    marginVertical: OmbaroTheme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});
