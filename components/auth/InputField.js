import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { OmbaroTheme } from '../../constants/theme';

export default function InputField({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  keyboardType = 'default',
  secureTextEntry = false,
  maxLength,
  editable = true,
  error,
  icon
}) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={OmbaroTheme.colors.textGray}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          editable={editable}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: OmbaroTheme.spacing.md,
  },
  label: {
    fontSize: OmbaroTheme.fontSize.sm,
    fontWeight: OmbaroTheme.fontWeight.medium,
    color: OmbaroTheme.colors.textLight,
    marginBottom: OmbaroTheme.spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: OmbaroTheme.colors.darkCard,
    borderRadius: OmbaroTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: OmbaroTheme.colors.border,
    paddingHorizontal: OmbaroTheme.spacing.md,
  },
  inputError: {
    borderColor: OmbaroTheme.colors.error,
  },
  iconContainer: {
    marginRight: OmbaroTheme.spacing.sm,
  },
  input: {
    flex: 1,
    color: OmbaroTheme.colors.textLight,
    fontSize: OmbaroTheme.fontSize.md,
    paddingVertical: OmbaroTheme.spacing.md,
  },
  errorText: {
    fontSize: OmbaroTheme.fontSize.xs,
    color: OmbaroTheme.colors.error,
    marginTop: OmbaroTheme.spacing.xs,
  },
});
