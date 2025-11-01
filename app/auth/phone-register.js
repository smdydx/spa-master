
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
      <View style={styles.mainContainer}>
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
                Join thousands of beauty enthusiasts
              </Text>
            </View>
          </View>
        </View>

        {/* White Section - Right/Bottom Half */}
        <View style={styles.whiteSection}>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Get Started</Text>
            <Text style={styles.formSubtitle}>Enter your details to continue</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Referral Code (Optional)</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconBox}>
                  <Gift size={scale(16)} color={OmbaroTheme.colors.primary} />
                </View>
                <input
                  style={styles.input}
                  placeholder="Enter referral code"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value.toUpperCase())}
                />
              </View>
              <Text style={styles.hint}>🎁 Get 10% off your first booking!</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile Number *</Text>
              <View style={[styles.inputWrapper, error && styles.inputError]}>
                <View style={styles.iconBox}>
                  <Phone size={scale(16)} color={OmbaroTheme.colors.primary} />
                </View>
                <input
                  style={styles.input}
                  placeholder="Enter 10-digit number"
                  type="tel"
                  maxLength={10}
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

            <View style={styles.privacyNote}>
              <Text style={styles.privacyIcon}>🔒</Text>
              <Text style={styles.privacyText}>
                Your privacy is protected
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OmbaroTheme.colors.white,
  },
  mainContainer: {
    flex: 1,
    flexDirection: width >= 768 ? 'row' : 'column',
  },
  
  // Navy Blue Section
  navySection: {
    backgroundColor: OmbaroTheme.colors.primary,
    width: width >= 768 ? '50%' : '100%',
    height: width >= 768 ? '100%' : verticalScale(280),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
    justifyContent: 'space-between',
  },
  backButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  brandSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(20),
  },
  iconContainer: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(16),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
  },
  icon: {
    fontSize: scale(28),
  },
  brand: {
    fontSize: scale(28),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.white,
    letterSpacing: 2,
    marginBottom: verticalScale(6),
  },
  tagline: {
    fontSize: scale(12),
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: OmbaroTheme.fontWeight.medium,
    marginBottom: verticalScale(20),
  },
  welcomeBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scale(14),
    padding: scale(16),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    maxWidth: scale(280),
  },
  welcomeTitle: {
    fontSize: scale(20),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.white,
    marginBottom: verticalScale(6),
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: scale(12),
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: scale(18),
    textAlign: 'center',
  },

  // White Section
  whiteSection: {
    backgroundColor: OmbaroTheme.colors.white,
    width: width >= 768 ? '50%' : '100%',
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(24),
    justifyContent: 'center',
  },
  formContainer: {
    maxWidth: scale(380),
    width: '100%',
    alignSelf: 'center',
  },
  formTitle: {
    fontSize: scale(24),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
    marginBottom: verticalScale(6),
  },
  formSubtitle: {
    fontSize: scale(13),
    color: OmbaroTheme.colors.textGray,
    marginBottom: verticalScale(24),
  },
  
  // Form Elements
  inputGroup: {
    marginBottom: verticalScale(16),
  },
  label: {
    fontSize: scale(12),
    fontWeight: OmbaroTheme.fontWeight.semibold,
    color: OmbaroTheme.colors.textDark,
    marginBottom: verticalScale(6),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(10),
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    paddingRight: scale(12),
    height: verticalScale(48),
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  iconBox: {
    width: scale(40),
    height: '100%',
    backgroundColor: '#F0F4FF',
    borderTopLeftRadius: scale(10),
    borderBottomLeftRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputError: {
    borderColor: OmbaroTheme.colors.error,
    backgroundColor: '#FEF2F2',
  },
  input: {
    flex: 1,
    marginLeft: scale(12),
    fontSize: scale(14),
    fontWeight: OmbaroTheme.fontWeight.medium,
    color: OmbaroTheme.colors.textDark,
    backgroundColor: 'transparent',
    border: 'none',
    outlineWidth: 0,
  },
  hint: {
    fontSize: scale(10),
    color: '#4F46E5',
    marginTop: verticalScale(4),
    marginLeft: scale(2),
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
  errorText: {
    fontSize: scale(10),
    color: OmbaroTheme.colors.error,
    marginTop: verticalScale(4),
    marginLeft: scale(2),
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
  button: {
    backgroundColor: OmbaroTheme.colors.primary,
    borderRadius: scale(10),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(8),
    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
    opacity: 0.6,
    boxShadow: 'none',
  },
  buttonText: {
    fontSize: scale(14),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(16),
    paddingHorizontal: scale(12),
  },
  privacyIcon: {
    fontSize: scale(14),
    marginRight: scale(6),
  },
  privacyText: {
    fontSize: scale(11),
    color: OmbaroTheme.colors.textGray,
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
});
