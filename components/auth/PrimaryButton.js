import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { OmbaroTheme } from '../../constants/theme';

export default function PrimaryButton({ 
  title, 
  onPress, 
  variant = 'primary',
  disabled = false,
  loading = false,
  style 
}) {
  const getButtonStyle = () => {
    if (disabled) return [styles.button, styles.buttonDisabled, style];
    if (variant === 'secondary') return [styles.button, styles.buttonSecondary, style];
    return [styles.button, styles.buttonPrimary, style];
  };

  const getTextStyle = () => {
    if (variant === 'secondary') return [styles.text, styles.textSecondary];
    return styles.text;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? OmbaroTheme.colors.textDark : OmbaroTheme.colors.textLight} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: OmbaroTheme.borderRadius.lg,
    paddingVertical: OmbaroTheme.spacing.md,
    paddingHorizontal: OmbaroTheme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    marginVertical: OmbaroTheme.spacing.sm,
  },
  buttonPrimary: {
    backgroundColor: OmbaroTheme.colors.roseGold,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: OmbaroTheme.colors.border,
  },
  buttonDisabled: {
    backgroundColor: OmbaroTheme.colors.darkCard,
    opacity: 0.5,
  },
  text: {
    fontSize: OmbaroTheme.fontSize.md,
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  textSecondary: {
    color: OmbaroTheme.colors.textLight,
  },
});
