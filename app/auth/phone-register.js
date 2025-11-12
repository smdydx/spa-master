
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone, Gift, Lock, Mail, Sparkles } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';

const { height, width } = Dimensions.get('window');
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;

export default function PhoneRegisterScreen() {
  const [mode, setMode] = useState('phone');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { registerPhone } = useAuth();

  const handleSendOTP = () => {
    setError('');
    if (mode === 'phone') {
      const result = registerPhone(mobile);
      if (result.success) {
        router.push('/auth/otp-verification');
      } else {
        setError(result.error);
      }
    } else {
      if (email && password) {
        router.push('/auth/otp-verification');
      } else {
        setError('Please fill in all required fields');
      }
    }
  };

  const isValid = mode === 'phone' ? mobile.length >= 10 : email.length > 0 && password.length >= 6;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <LinearGradient
            colors={['#064e3b', '#047857', '#059669']}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <ArrowLeft size={scale(22)} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>

            <View style={styles.brandSection}>
              <View style={styles.iconContainer}>
                <Sparkles size={scale(32)} color="#FFFFFF" strokeWidth={2.5} />
              </View>
              <Text style={styles.brand}>OMBARO</Text>
              <Text style={styles.tagline}>Beauty & Wellness Hub</Text>
              
              <View style={styles.welcomeBox}>
                <Text style={styles.welcomeMessage}>
                  Welcome! Join thousands of{'\n'}beauty enthusiasts
                </Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.formSection}>
            <LinearGradient
              colors={['rgba(5, 150, 105, 0.05)', 'rgba(255, 255, 255, 0)']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.formBackgroundEffect}
            />
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Get Started</Text>
              <Text style={styles.formSubtitle}>Enter your details to continue</Text>

              <View style={styles.modeToggle}>
                <TouchableOpacity
                  style={[styles.modeButton, mode === 'phone' && styles.modeButtonActive]}
                  onPress={() => setMode('phone')}
                  activeOpacity={0.7}
                >
                  <Phone size={scale(16)} color={mode === 'phone' ? '#FFFFFF' : '#64748b'} />
                  <Text style={[styles.modeText, mode === 'phone' && styles.modeTextActive]}>Phone</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modeButton, mode === 'email' && styles.modeButtonActive]}
                  onPress={() => setMode('email')}
                  activeOpacity={0.7}
                >
                  <Mail size={scale(16)} color={mode === 'email' ? '#FFFFFF' : '#64748b'} />
                  <Text style={[styles.modeText, mode === 'email' && styles.modeTextActive]}>Email</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Referral Code (Optional)</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.iconBox}>
                    <Gift size={scale(18)} color="#059669" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter referral code"
                    placeholderTextColor="#94a3b8"
                    value={referral}
                    onChangeText={(text) => setReferral(text.toUpperCase())}
                    autoCapitalize="characters"
                  />
                </View>
                <View style={styles.hintContainer}>
                  <Gift size={scale(11)} color="#059669" />
                  <Text style={styles.hint}>Get 10% off your first booking!</Text>
                </View>
              </View>

              {mode === 'phone' ? (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mobile Number *</Text>
                  <View style={[styles.inputWrapper, error && styles.inputError]}>
                    <View style={styles.iconBox}>
                      <Phone size={scale(18)} color="#059669" />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter 10-digit number"
                      placeholderTextColor="#94a3b8"
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={mobile}
                      onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ''))}
                    />
                  </View>
                  {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
              ) : (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email Address *</Text>
                    <View style={[styles.inputWrapper, error && styles.inputError]}>
                      <View style={styles.iconBox}>
                        <Mail size={scale(18)} color="#059669" />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#94a3b8"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        scrollEnabled={false}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password *</Text>
                    <View style={[styles.inputWrapper, error && styles.inputError]}>
                      <View style={styles.iconBox}>
                        <Lock size={scale(18)} color="#059669" />
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Create a password"
                        placeholderTextColor="#94a3b8"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                      />
                    </View>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                  </View>
                </>
              )}

              <TouchableOpacity
                style={[styles.button, !isValid && styles.buttonDisabled]}
                onPress={handleSendOTP}
                disabled={!isValid}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  {mode === 'phone' ? 'SEND OTP' : 'SIGN UP'}
                </Text>
              </TouchableOpacity>

              <View style={styles.privacyNote}>
                <Lock size={scale(13)} color="#64748b" />
                <Text style={styles.privacyText}>Your privacy is protected</Text>
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
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(20),
  },
  
  header: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(30),
    borderBottomLeftRadius: scale(24),
    borderBottomRightRadius: scale(24),
    minHeight: verticalScale(280),
  },
  backButton: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(12),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
  },
  brandSection: {
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  iconContainer: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(15),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  brand: {
    fontSize: scale(28),
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: verticalScale(4),
  },
  tagline: {
    fontSize: scale(12),
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginBottom: verticalScale(16),
  },
  welcomeBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: scale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  welcomeMessage: {
    fontSize: scale(13),
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: scale(18),
  },

  formSection: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(20),
    position: 'relative',
  },
  formBackgroundEffect: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '40%',
    borderTopRightRadius: scale(80),
    borderBottomRightRadius: scale(80),
  },
  formContainer: {
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  formTitle: {
    fontSize: scale(24),
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: verticalScale(6),
  },
  formSubtitle: {
    fontSize: scale(13),
    color: '#64748b',
    marginBottom: verticalScale(20),
    fontWeight: '500',
  },

  modeToggle: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: scale(12),
    padding: scale(4),
    marginBottom: verticalScale(20),
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
    borderRadius: scale(10),
    gap: scale(6),
  },
  modeButtonActive: {
    backgroundColor: '#059669',
  },
  modeText: {
    fontSize: scale(13),
    fontWeight: '600',
    color: '#64748b',
  },
  modeTextActive: {
    color: '#FFFFFF',
  },

  inputGroup: {
    marginBottom: verticalScale(16),
  },
  label: {
    fontSize: scale(13),
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: verticalScale(8),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#e2e8f0',
    height: verticalScale(52),
    paddingHorizontal: scale(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconBox: {
    width: scale(36),
    height: scale(36),
    backgroundColor: '#f0fdf4',
    borderRadius: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    fontSize: scale(14),
    fontWeight: '500',
    color: '#1e293b',
    paddingVertical: 0,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(6),
    marginLeft: scale(4),
    gap: scale(5),
  },
  hint: {
    fontSize: scale(11),
    color: '#059669',
    fontWeight: '500',
  },
  errorText: {
    fontSize: scale(11),
    color: '#ef4444',
    marginTop: verticalScale(6),
    marginLeft: scale(4),
    fontWeight: '500',
  },

  button: {
    backgroundColor: '#059669',
    borderRadius: scale(12),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(8),
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#cbd5e1',
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: scale(14),
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(16),
    gap: scale(6),
  },
  privacyText: {
    fontSize: scale(12),
    color: '#64748b',
    fontWeight: '500',
  },
});
