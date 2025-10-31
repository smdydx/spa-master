import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, User, Phone, Lock, Mail } from 'lucide-react-native';
import { AuthLayout, GradientHeader, FormCard, InputField, PrimaryButton } from '../../../components/auth';
import { useAuth } from '../../../context/AuthContext';
import { OmbaroTheme } from '../../../constants/theme';

export default function PartnerQuickSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { login } = useAuth();

  const handleSignup = () => {
    setError('');
    const result = login(mobile || email, password, 'partner');
    
    if (result.success) {
      router.replace('/Partner');
    } else {
      setError(result.error);
    }
  };

  const isValid = name.length > 0 && (mobile.length >= 10 || email.length > 5) && password.length > 0;

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
        title="Become a Partner"
        subtitle="Join our network of wellness providers"
      />

      <FormCard>
        <InputField
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          icon={<User size={20} color={OmbaroTheme.colors.textGray} />}
        />

        <InputField
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          icon={<Mail size={20} color={OmbaroTheme.colors.textGray} />}
        />

        <InputField
          label="Mobile Number"
          placeholder="Enter 10-digit mobile number"
          value={mobile}
          onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ''))}
          keyboardType="number-pad"
          maxLength={15}
          icon={<Phone size={20} color={OmbaroTheme.colors.textGray} />}
        />

        <InputField
          label="Password"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={error}
          icon={<Lock size={20} color={OmbaroTheme.colors.textGray} />}
        />

        <PrimaryButton
          title="Join as Partner"
          onPress={handleSignup}
          disabled={!isValid}
        />

        <View style={styles.demoCard}>
          <Text style={styles.demoTitle}>🤝 Demo Credentials</Text>
          <Text style={styles.demoText}>
            Fill in any details with at least 10 characters for phone/email
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
  demoCard: {
    backgroundColor: OmbaroTheme.colors.darkCard,
    borderRadius: OmbaroTheme.borderRadius.md,
    padding: OmbaroTheme.spacing.md,
    marginTop: OmbaroTheme.spacing.lg,
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
