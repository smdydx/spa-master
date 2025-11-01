
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone, Gift } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { AuthLayout, GradientHeader, FormCard, InputField, PrimaryButton } from '../../components/auth';
import { useAuth } from '../../context/AuthContext';
import { OmbaroTheme } from '../../constants/theme';

const { height, width } = Dimensions.get('window');
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;

export default function PhoneRegisterScreen() {
  const [mobile, setMobile] = useState('');
  const [referral, setReferral] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { registerPhone } = useAuth();

  const handleSendOTP = () => {
    setError('');
    const result = registerPhone(mobile);
    
    if (result.success) {
      router.push('/auth/otp-verification');
    } else {
      setError(result.error);
    }
  };

  const isValid = mobile.length >= 10;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ArrowLeft size={scale(20)} color={OmbaroTheme.colors.textDark} />
          </TouchableOpacity>

          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>✨</Text>
            </View>
            <Text style={styles.brand}>OMBARO</Text>
            <Text style={styles.tagline}>Beauty & Wellness Hub</Text>
            <Text style={styles.title}>Enter Your Mobile Number</Text>
            <Text style={styles.subtitle}>We'll send you a verification code</Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Referral Code (Optional)</Text>
              <View style={styles.inputContainer}>
                <Gift size={scale(16)} color={OmbaroTheme.colors.textGray} />
                <input
                  style={styles.input}
                  placeholder="Enter referral code"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                />
              </View>
              <Text style={styles.hint}>Have a referral code? Get 10% off your first booking!</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={[styles.inputContainer, error && styles.inputError]}>
                <Phone size={scale(16)} color={OmbaroTheme.colors.textGray} />
                <input
                  style={styles.input}
                  placeholder="Enter 10-digit mobile number"
                  type="tel"
                  maxLength={15}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </View>
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            <TouchableOpacity
              style={[styles.button, !isValid && styles.buttonDisabled]}
              onPress={handleSendOTP}
              disabled={!isValid}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>🔒 Your Privacy is Protected</Text>
              <Text style={styles.infoText}>
                We use your mobile number only for verification and booking confirmations.
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OmbaroTheme.colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(10),
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  iconContainer: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(12),
    backgroundColor: OmbaroTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(8),
  },
  icon: {
    fontSize: scale(24),
  },
  brand: {
    fontSize: scale(22),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
    letterSpacing: 1.5,
    marginBottom: verticalScale(4),
  },
  tagline: {
    fontSize: scale(11),
    color: OmbaroTheme.colors.primaryDark,
    fontWeight: OmbaroTheme.fontWeight.medium,
    marginBottom: verticalScale(12),
  },
  title: {
    fontSize: scale(18),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
    textAlign: 'center',
    marginTop: verticalScale(6),
  },
  subtitle: {
    fontSize: scale(12),
    color: OmbaroTheme.colors.textGray,
    textAlign: 'center',
    marginTop: verticalScale(4),
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: verticalScale(12),
  },
  label: {
    fontSize: scale(12),
    fontWeight: OmbaroTheme.fontWeight.medium,
    color: OmbaroTheme.colors.textDark,
    marginBottom: verticalScale(6),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: OmbaroTheme.colors.white,
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: scale(12),
    height: verticalScale(44),
  },
  inputError: {
    borderColor: OmbaroTheme.colors.error,
  },
  input: {
    flex: 1,
    marginLeft: scale(8),
    fontSize: scale(13),
    color: OmbaroTheme.colors.textDark,
    backgroundColor: 'transparent',
  },
  hint: {
    fontSize: scale(10),
    color: OmbaroTheme.colors.primaryDark,
    marginTop: verticalScale(4),
    marginLeft: scale(4),
  },
  errorText: {
    fontSize: scale(10),
    color: OmbaroTheme.colors.error,
    marginTop: verticalScale(4),
  },
  button: {
    backgroundColor: OmbaroTheme.colors.primary,
    borderRadius: scale(10),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(8),
  },
  buttonDisabled: {
    backgroundColor: OmbaroTheme.colors.darkCard,
    opacity: 0.5,
  },
  buttonText: {
    fontSize: scale(14),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: scale(10),
    padding: scale(12),
    marginTop: verticalScale(12),
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoTitle: {
    fontSize: scale(12),
    fontWeight: OmbaroTheme.fontWeight.semibold,
    color: OmbaroTheme.colors.textDark,
    marginBottom: verticalScale(4),
  },
  infoText: {
    fontSize: scale(10),
    color: OmbaroTheme.colors.textGray,
    lineHeight: scale(14),
  },
});
