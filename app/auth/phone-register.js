
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone, Gift, Lock, Sparkles } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
              <Sparkles size={scale(40)} color={OmbaroTheme.colors.white} strokeWidth={2.5} />
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
                  <Gift size={scale(18)} color={OmbaroTheme.colors.primary} />
                </View>
                <input
                  style={styles.input}
                  placeholder="Enter referral code"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value.toUpperCase())}
                />
              </View>
              <View style={styles.hintContainer}>
                <Gift size={scale(12)} color="#4F46E5" />
                <Text style={styles.hint}>Get 10% off your first booking!</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile Number *</Text>
              <View style={[styles.inputWrapper, error && styles.inputError]}>
                <View style={styles.iconBox}>
                  <Phone size={scale(18)} color={OmbaroTheme.colors.primary} />
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
              <Lock size={scale(14)} color={OmbaroTheme.colors.textGray} />
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
    height: width >= 768 ? '100%' : verticalScale(380),
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(24),
    justifyContent: 'flex-start',
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(12),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: verticalScale(24),
  },
  brandSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  iconContainer: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  brand: {
    fontSize: scale(40),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.white,
    letterSpacing: 3,
    marginBottom: verticalScale(8),
  },
  tagline: {
    fontSize: scale(14),
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: OmbaroTheme.fontWeight.medium,
    marginBottom: verticalScale(28),
    letterSpacing: 0.5,
  },
  welcomeBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: scale(20),
    paddingVertical: scale(24),
    paddingHorizontal: scale(28),
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    maxWidth: scale(320),
    width: '90%',
  },
  welcomeTitle: {
    fontSize: scale(24),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.white,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: scale(14),
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: scale(22),
    textAlign: 'center',
    fontWeight: OmbaroTheme.fontWeight.medium,
  },

  // White Section
  whiteSection: {
    backgroundColor: OmbaroTheme.colors.white,
    width: width >= 768 ? '50%' : '100%',
    flex: 1,
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(32),
    justifyContent: 'center',
    borderTopLeftRadius: width >= 768 ? 0 : scale(32),
    borderTopRightRadius: width >= 768 ? 0 : scale(32),
    marginTop: width >= 768 ? 0 : -scale(24),
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
    marginBottom: verticalScale(28),
    fontWeight: OmbaroTheme.fontWeight.medium,
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    paddingRight: scale(14),
    height: verticalScale(52),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
  },
  iconBox: {
    width: scale(48),
    height: '100%',
    backgroundColor: '#F0F4FF',
    borderTopLeftRadius: scale(12),
    borderBottomLeftRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputError: {
    borderColor: OmbaroTheme.colors.error,
    backgroundColor: '#FEF2F2',
  },
  input: {
    flex: 1,
    marginLeft: scale(14),
    fontSize: scale(15),
    fontWeight: OmbaroTheme.fontWeight.medium,
    color: OmbaroTheme.colors.textDark,
    backgroundColor: 'transparent',
    border: 'none',
    outlineWidth: 0,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(6),
    marginLeft: scale(4),
    gap: scale(6),
  },
  hint: {
    fontSize: scale(11),
    color: '#4F46E5',
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
  errorText: {
    fontSize: scale(11),
    color: OmbaroTheme.colors.error,
    marginTop: verticalScale(6),
    marginLeft: scale(4),
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
  button: {
    backgroundColor: OmbaroTheme.colors.primary,
    borderRadius: scale(12),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(12),
    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
    opacity: 0.6,
    boxShadow: 'none',
  },
  buttonText: {
    fontSize: scale(15),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
    paddingHorizontal: scale(12),
    gap: scale(8),
  },
  privacyText: {
    fontSize: scale(12),
    color: OmbaroTheme.colors.textGray,
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
});
