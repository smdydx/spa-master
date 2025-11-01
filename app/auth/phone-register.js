
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
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
          {/* Navy Blue Section */}
          <View style={styles.navySection}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <ArrowLeft size={scale(22)} color={OmbaroTheme.colors.white} strokeWidth={2.5} />
            </TouchableOpacity>

            <View style={styles.brandSection}>
              <View style={styles.iconContainer}>
                <Sparkles size={scale(36)} color={OmbaroTheme.colors.white} strokeWidth={2.5} />
              </View>
              <Text style={styles.brand}>OMBARO</Text>
              <Text style={styles.tagline}>Beauty & Wellness Hub</Text>
              
              <View style={styles.welcomeBox}>
                <Text style={styles.welcomeMessage}>
                  Welcome! Join thousands of beauty enthusiasts
                </Text>
              </View>
            </View>
          </View>

          {/* White Section */}
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
                  <Gift size={scale(11)} color="#4F46E5" />
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
                <Lock size={scale(13)} color={OmbaroTheme.colors.textGray} />
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
    height: height,
  },
  
  // Navy Blue Section
  navySection: {
    backgroundColor: OmbaroTheme.colors.primary,
    width: width >= 768 ? '50%' : '100%',
    height: width >= 768 ? '100%' : height * 0.42,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(16),
    justifyContent: 'space-between',
  },
  backButton: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(12),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  brandSection: {
    alignItems: 'center',
    paddingHorizontal: scale(12),
  },
  iconContainer: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(16),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  brand: {
    fontSize: scale(32),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.white,
    letterSpacing: 2.5,
    marginBottom: verticalScale(4),
  },
  tagline: {
    fontSize: scale(12),
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: OmbaroTheme.fontWeight.medium,
    marginBottom: verticalScale(14),
    letterSpacing: 0.5,
  },
  welcomeBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: scale(14),
    paddingVertical: scale(14),
    paddingHorizontal: scale(20),
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    width: '90%',
    maxWidth: scale(320),
  },
  welcomeMessage: {
    fontSize: scale(14),
    fontWeight: OmbaroTheme.fontWeight.semibold,
    color: OmbaroTheme.colors.white,
    textAlign: 'center',
    lineHeight: scale(20),
  },

  // White Section
  whiteSection: {
    backgroundColor: OmbaroTheme.colors.white,
    width: width >= 768 ? '50%' : '100%',
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(16),
    borderTopLeftRadius: width >= 768 ? 0 : scale(32),
    borderTopRightRadius: width >= 768 ? 0 : scale(32),
    marginTop: width >= 768 ? 0 : -scale(24),
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: scale(420),
    alignSelf: 'center',
  },
  formTitle: {
    fontSize: scale(22),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
    marginBottom: verticalScale(4),
  },
  formSubtitle: {
    fontSize: scale(12),
    color: OmbaroTheme.colors.textGray,
    marginBottom: verticalScale(18),
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
  
  // Form Elements
  inputGroup: {
    marginBottom: verticalScale(14),
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
    borderRadius: scale(12),
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    paddingRight: scale(12),
    height: verticalScale(46),
  },
  iconBox: {
    width: scale(50),
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
    outline: 'none',
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(5),
    marginLeft: scale(4),
    gap: scale(5),
  },
  hint: {
    fontSize: scale(11),
    color: '#4F46E5',
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
  errorText: {
    fontSize: scale(11),
    color: OmbaroTheme.colors.error,
    marginTop: verticalScale(5),
    marginLeft: scale(4),
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
  button: {
    backgroundColor: OmbaroTheme.colors.primary,
    borderRadius: scale(12),
    paddingVertical: verticalScale(14),
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
    backgroundColor: '#D1D5DB',
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: scale(14),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(12),
    paddingHorizontal: scale(12),
    gap: scale(6),
  },
  privacyText: {
    fontSize: scale(11),
    color: OmbaroTheme.colors.textGray,
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
});
