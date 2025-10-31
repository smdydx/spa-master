import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, Lock } from 'lucide-react-native';
import { AuthLayout, GradientHeader, FormCard, InputField, PrimaryButton } from '../../../components/auth';
import { useAuth } from '../../../context/AuthContext';
import { OmbaroTheme } from '../../../constants/theme';

export default function TherapistLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = () => {
    setError('');
    const result = login(email, password, 'therapist');
    
    if (result.success) {
      router.replace('/Therapist');
    } else {
      setError(result.error);
    }
  };

  const isValid = email.length >= 10 && password.length > 0;

  return (
    <AuthLayout>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <ArrowLeft size={24} color={OmbaroTheme.colors.textDark} />
      </TouchableOpacity>

      <GradientHeader
        title="Therapist Portal"
        subtitle="Manage your assignments and schedule"
      />

      <FormCard>
        <InputField
          label="Email or Phone"
          placeholder="Enter your email or phone"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          icon={<Mail size={20} color={OmbaroTheme.colors.textGray} />}
        />

        <InputField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={error}
          icon={<Lock size={20} color={OmbaroTheme.colors.textGray} />}
        />

        <PrimaryButton
          title="Login as Therapist"
          onPress={handleLogin}
          disabled={!isValid}
        />

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Don't have an account? Contact your vendor to get registered.
          </Text>
        </View>

        <View style={styles.demoCard}>
          <Text style={styles.demoTitle}>✧ Demo Credentials</Text>
          <Text style={styles.demoText}>
            <Text style={styles.demoBold}>Email/Phone:</Text> Any 10+ characters
          </Text>
          <Text style={styles.demoText}>
            <Text style={styles.demoBold}>Password:</Text> 1234
          </Text>
        </View>
      </FormCard>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 48,
    height: 48,
    borderRadius: OmbaroTheme.borderRadius.md,
    backgroundColor: OmbaroTheme.colors.beige,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: OmbaroTheme.spacing.md,
  },
  infoCard: {
    backgroundColor: OmbaroTheme.colors.darkCard,
    borderRadius: OmbaroTheme.borderRadius.md,
    padding: OmbaroTheme.spacing.md,
    marginTop: OmbaroTheme.spacing.md,
    borderWidth: 1,
    borderColor: OmbaroTheme.colors.border,
  },
  infoText: {
    fontSize: OmbaroTheme.fontSize.sm,
    color: OmbaroTheme.colors.textLight,
    textAlign: 'center',
  },
  demoCard: {
    backgroundColor: OmbaroTheme.colors.darkCard,
    borderRadius: OmbaroTheme.borderRadius.md,
    padding: OmbaroTheme.spacing.md,
    marginTop: OmbaroTheme.spacing.md,
    borderWidth: 1,
    borderColor: OmbaroTheme.colors.roseGold,
  },
  demoTitle: {
    fontSize: OmbaroTheme.fontSize.md,
    fontWeight: OmbaroTheme.fontWeight.semibold,
    color: OmbaroTheme.colors.textLight,
    marginBottom: OmbaroTheme.spacing.sm,
  },
  demoText: {
    fontSize: OmbaroTheme.fontSize.sm,
    color: OmbaroTheme.colors.textLight,
    marginVertical: 2,
  },
  demoBold: {
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.roseGold,
  },
});
