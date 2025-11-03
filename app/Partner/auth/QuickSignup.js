
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, User, Phone, Lock, Mail } from 'lucide-react-native';
import { useAuth } from '../../../context/AuthContext';
import { OmbaroTheme } from '../../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <LinearGradient
            colors={['#001f3f', '#003366', '#1e3a8a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <ArrowLeft size={Math.min(width * 0.06, 24)} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Become a Partner</Text>
              <Text style={styles.headerSubtitle}>Join our network of wellness providers</Text>
            </View>
          </LinearGradient>

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Create Partner Account</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <User size={Math.min(width * 0.05, 20)} color="#64748b" />
                </View>
                <Text style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#94a3b8"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <Mail size={Math.min(width * 0.05, 20)} color="#64748b" />
                </View>
                <Text style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <Phone size={Math.min(width * 0.05, 20)} color="#64748b" />
                </View>
                <Text style={styles.input}
                  placeholder="Enter 10-digit mobile number"
                  placeholderTextColor="#94a3b8"
                  value={mobile}
                  onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ''))}
                  keyboardType="number-pad"
                  maxLength={15}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <Lock size={Math.min(width * 0.05, 20)} color="#64748b" />
                </View>
                <Text style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.signupButton, !isValid && styles.signupButtonDisabled]}
              onPress={handleSignup}
              disabled={!isValid}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={isValid ? ['#001f3f', '#1e3a8a'] : ['#94a3b8', '#cbd5e1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.signupButtonGradient}
              >
                <Text style={styles.signupButtonText}>Join as Partner</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.demoCard}>
              <Text style={styles.demoTitle}>🤝 Demo Credentials</Text>
              <Text style={styles.demoText}>
                Fill in any details with at least 10 characters for phone/email
              </Text>
              <Text style={styles.demoText}>
                <Text style={styles.demoBold}>Password:</Text> 1234
              </Text>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: height * 0.03,
  },
  headerGradient: {
    paddingHorizontal: Math.min(width * 0.05, 20),
    paddingTop: height * 0.02,
    paddingBottom: height * 0.04,
    borderBottomLeftRadius: Math.min(width * 0.07, 28),
    borderBottomRightRadius: Math.min(width * 0.07, 28),
    shadowColor: '#001f3f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  backButton: {
    width: Math.min(width * 0.12, 48),
    height: Math.min(width * 0.12, 48),
    borderRadius: Math.min(width * 0.03, 12),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.015,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: height * 0.015,
  },
  headerTitle: {
    fontSize: Math.min(width * 0.065, 26),
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: height * 0.008,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: Math.min(width * 0.035, 14),
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    paddingHorizontal: width * 0.05,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: Math.min(width * 0.05, 20),
    marginTop: height * 0.025,
    borderRadius: Math.min(width * 0.05, 20),
    paddingHorizontal: Math.min(width * 0.05, 20),
    paddingVertical: height * 0.03,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: Math.min(width * 0.055, 22),
    fontWeight: '900',
    color: '#001f3f',
    marginBottom: height * 0.025,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: height * 0.02,
  },
  label: {
    fontSize: Math.min(width * 0.035, 14),
    fontWeight: '700',
    color: '#001f3f',
    marginBottom: height * 0.008,
    letterSpacing: 0.3,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: Math.min(width * 0.035, 14),
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    paddingHorizontal: Math.min(width * 0.04, 16),
    height: Math.min(height * 0.065, 54),
  },
  iconContainer: {
    width: Math.min(width * 0.09, 36),
    height: Math.min(width * 0.09, 36),
    backgroundColor: '#e0f2fe',
    borderRadius: Math.min(width * 0.025, 10),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Math.min(width * 0.03, 12),
  },
  input: {
    flex: 1,
    fontSize: Math.min(width * 0.038, 15),
    color: '#001f3f',
    fontWeight: '600',
  },
  errorText: {
    fontSize: Math.min(width * 0.03, 12),
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: height * 0.015,
    fontWeight: '600',
  },
  signupButton: {
    marginTop: height * 0.01,
    borderRadius: Math.min(width * 0.035, 14),
    overflow: 'hidden',
    shadowColor: '#001f3f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  signupButtonDisabled: {
    shadowOpacity: 0.1,
    elevation: 2,
  },
  signupButtonGradient: {
    height: Math.min(height * 0.065, 54),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonText: {
    fontSize: Math.min(width * 0.042, 17),
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  demoCard: {
    backgroundColor: '#e0f2fe',
    borderRadius: Math.min(width * 0.04, 16),
    padding: Math.min(width * 0.04, 16),
    marginTop: height * 0.025,
    borderWidth: 2,
    borderColor: '#93C5FD',
  },
  demoTitle: {
    fontSize: Math.min(width * 0.038, 15),
    fontWeight: '900',
    color: '#001f3f',
    marginBottom: height * 0.01,
  },
  demoText: {
    fontSize: Math.min(width * 0.033, 13),
    color: '#003366',
    marginVertical: height * 0.003,
    fontWeight: '600',
    lineHeight: Math.min(width * 0.045, 18),
  },
  demoBold: {
    fontWeight: '900',
    color: '#001f3f',
  },
});
