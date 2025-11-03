import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, User, Phone, Lock, Mail } from 'lucide-react-native';
import { AuthLayout, GradientHeader, FormCard, InputField, PrimaryButton } from '../../../components/auth';
import { useAuth } from '../../../context/AuthContext';
import { OmbaroTheme } from '../../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

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
      <LinearGradient
        colors={['#001f3f', '#003366', '#004080']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Become a Partner</Text>
          <Text style={styles.headerSubtitle}>Join our network of wellness providers</Text>
        </View>
      </LinearGradient>

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
  headerGradient: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#001f3f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 24,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  demoCard: {
    backgroundColor: '#E0F2FE',
    borderRadius: OmbaroTheme.borderRadius.md,
    padding: OmbaroTheme.spacing.md,
    marginTop: OmbaroTheme.spacing.lg,
    borderWidth: 2,
    borderColor: '#93C5FD',
  },
  demoTitle: {
    fontSize: OmbaroTheme.fontSize.md,
    fontWeight: '900',
    color: '#001f3f',
    marginBottom: OmbaroTheme.spacing.sm,
  },
  demoText: {
    fontSize: OmbaroTheme.fontSize.sm,
    color: '#001f3f',
    marginVertical: 2,
    fontWeight: '600',
  },
  demoBold: {
    fontWeight: '900',
    color: '#003366',
  },
});
