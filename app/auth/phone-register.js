
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone, Gift } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';
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
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Navy Blue Section - Left/Top Half */}
          <View style={styles.navySection}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <ArrowLeft size={scale(20)} color={OmbaroTheme.colors.white} />
            </TouchableOpacity>

            <View style={styles.brandSection}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>✨</Text>
              </View>
              <Text style={styles.brand}>OMBARO</Text>
              <Text style={styles.tagline}>Beauty & Wellness Hub</Text>
              <View style={styles.welcomeBox}>
                <Text style={styles.welcomeTitle}>Welcome!</Text>
                <Text style={styles.welcomeSubtitle}>
                  Join thousands of beauty enthusiasts and discover your perfect wellness experience
                </Text>
              </View>
            </View>
          </View>

          {/* White Section - Right/Bottom Half */}
          <View style={styles.whiteSection}>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Get Started</Text>
              <Text style={styles.formSubtitle}>Enter your mobile number to continue</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Referral Code (Optional)</Text>
                <View style={styles.inputContainer}>
                  <Gift size={scale(18)} color={OmbaroTheme.colors.textGray} />
                  <input
                    style={styles.input}
                    placeholder="Enter referral code"
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                  />
                </View>
                <Text style={styles.hint}>🎁 Have a referral code? Get 10% off your first booking!</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number *</Text>
                <View style={[styles.inputContainer, error && styles.inputError]}>
                  <Phone size={scale(18)} color={OmbaroTheme.colors.textGray} />
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
                <Text style={styles.infoIcon}>🔒</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>Your Privacy is Protected</Text>
                  <Text style={styles.infoText}>
                    We use your mobile number only for verification and booking confirmations.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    flexDirection: width >= 768 ? 'row' : 'column',
  },
  
  // Navy Blue Section
  navySection: {
    backgroundColor: OmbaroTheme.colors.primary,
    width: width >= 768 ? '50%' : '100%',
    minHeight: width >= 768 ? '100%' : verticalScale(320),
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(20),
    justifyContent: 'space-between',
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(12),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  brandSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  iconContainer: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(16),
  },
  icon: {
    fontSize: scale(32),
  },
  brand: {
    fontSize: scale(32),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.white,
    letterSpacing: 2,
    marginBottom: verticalScale(8),
  },
  tagline: {
    fontSize: scale(14),
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: OmbaroTheme.fontWeight.medium,
    marginBottom: verticalScale(32),
  },
  welcomeBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scale(16),
    padding: scale(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    maxWidth: scale(320),
  },
  welcomeTitle: {
    fontSize: scale(22),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.white,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: scale(13),
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: scale(20),
    textAlign: 'center',
  },

  // White Section
  whiteSection: {
    backgroundColor: OmbaroTheme.colors.white,
    width: width >= 768 ? '50%' : '100%',
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(32),
    justifyContent: 'center',
  },
  formContainer: {
    maxWidth: scale(400),
    width: '100%',
    alignSelf: 'center',
  },
  formTitle: {
    fontSize: scale(26),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
    marginBottom: verticalScale(8),
  },
  formSubtitle: {
    fontSize: scale(14),
    color: OmbaroTheme.colors.textGray,
    marginBottom: verticalScale(32),
  },
  
  // Form Elements
  inputGroup: {
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: scale(13),
    fontWeight: OmbaroTheme.fontWeight.semibold,
    color: OmbaroTheme.colors.textDark,
    marginBottom: verticalScale(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: scale(12),
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    paddingHorizontal: scale(14),
    height: verticalScale(52),
  },
  inputError: {
    borderColor: OmbaroTheme.colors.error,
    backgroundColor: '#fef2f2',
  },
  input: {
    flex: 1,
    marginLeft: scale(10),
    fontSize: scale(14),
    color: OmbaroTheme.colors.textDark,
    backgroundColor: 'transparent',
    outline: 'none',
  },
  hint: {
    fontSize: scale(11),
    color: OmbaroTheme.colors.primary,
    marginTop: verticalScale(6),
    marginLeft: scale(4),
  },
  errorText: {
    fontSize: scale(11),
    color: OmbaroTheme.colors.error,
    marginTop: verticalScale(6),
    marginLeft: scale(4),
  },
  button: {
    backgroundColor: OmbaroTheme.colors.primary,
    borderRadius: scale(12),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(8),
    shadowColor: OmbaroTheme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db',
    opacity: 0.6,
    shadowOpacity: 0,
  },
  buttonText: {
    fontSize: scale(15),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#eff6ff',
    borderRadius: scale(12),
    padding: scale(16),
    marginTop: verticalScale(24),
    borderWidth: 1,
    borderColor: '#dbeafe',
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: scale(20),
    marginRight: scale(12),
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: scale(13),
    fontWeight: OmbaroTheme.fontWeight.semibold,
    color: OmbaroTheme.colors.primary,
    marginBottom: verticalScale(4),
  },
  infoText: {
    fontSize: scale(11),
    color: OmbaroTheme.colors.textGray,
    lineHeight: scale(16),
  },
});
