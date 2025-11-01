

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, Lock } from 'lucide-react-native';
import { OmbaroTheme } from '../../../constants/theme';

const { width, height } = Dimensions.get('window');

export default function DepartmentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/Department');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.splitContainer}>
          <LinearGradient
            colors={['#C8B6A6', '#D4A59A', '#F3EDE6']}
            style={styles.topSection}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <ArrowLeft size={20} color="#2C2C2C" strokeWidth={2.5} />
            </TouchableOpacity>

            <View style={styles.brandSection}>
              <View style={styles.iconContainer}>
                <View style={styles.iconCircle} />
              </View>
              <Text style={styles.brandName}>OMBARO</Text>
              <Text style={styles.brandTagline}>Department Portal</Text>
              <Text style={styles.welcomeText}>Department Login</Text>
              <Text style={styles.subText}>Manage department operations</Text>
            </View>
          </LinearGradient>

          <View style={styles.bottomSection}>
            <LinearGradient
              colors={['#1A1A1A', '#2C2520', '#1F1F1F']}
              style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Login to Continue</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Mail size={18} color="#C8B6A6" strokeWidth={2} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <Lock size={18} color="#C8B6A6" strokeWidth={2} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLogin} activeOpacity={0.9}>
                <LinearGradient
                  colors={['#C8B6A6', '#D4A59A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>LOGIN</Text>
                </LinearGradient>
              </TouchableOpacity>
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
    backgroundColor: '#1A1A1A',
  },
  keyboardView: {
    flex: 1,
  },
  splitContainer: {
    flex: 1,
  },
  topSection: {
    flex: 2,
    paddingHorizontal: Math.min(width * 0.05, 24),
    paddingTop: height * 0.025,
    paddingBottom: height * 0.05,
    justifyContent: 'space-between',
  },
  backButton: {
    width: Math.min(width * 0.1, 40),
    height: Math.min(width * 0.1, 40),
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    width: Math.min(width * 0.12, 48),
    height: Math.min(width * 0.12, 48),
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.012,
  },
  iconCircle: {
    width: Math.min(width * 0.06, 24),
    height: Math.min(width * 0.06, 24),
    borderRadius: 12,
    backgroundColor: 'rgba(200, 182, 166, 0.8)',
  },
  brandName: {
    fontSize: Math.min(width * 0.055, 22),
    fontWeight: '900',
    color: '#2C2C2C',
    letterSpacing: 2.5,
    marginBottom: height * 0.005,
  },
  brandTagline: {
    fontSize: Math.min(width * 0.025, 10),
    fontWeight: '700',
    color: '#8B6F47',
    letterSpacing: 0.5,
    marginBottom: height * 0.015,
  },
  welcomeText: {
    fontSize: Math.min(width * 0.06, 24),
    fontWeight: '900',
    color: '#1A1A1A',
    marginBottom: height * 0.008,
  },
  subText: {
    fontSize: Math.min(width * 0.025, 10),
    color: 'rgba(44, 44, 44, 0.75)',
    textAlign: 'center',
  },
  bottomSection: {
    flex: 3,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    overflow: 'hidden',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: Math.min(width * 0.05, 24),
    paddingTop: height * 0.04,
    paddingBottom: height * 0.03,
  },
  formTitle: {
    fontSize: Math.min(width * 0.06, 24),
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: height * 0.04,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: height * 0.025,
  },
  label: {
    fontSize: Math.min(width * 0.032, 13),
    fontWeight: '700',
    color: '#C8B6A6',
    marginBottom: height * 0.01,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(200, 182, 166, 0.3)',
    paddingHorizontal: width * 0.04,
    height: Math.min(height * 0.07, 56),
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: Math.min(width * 0.038, 15),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: height * 0.03,
  },
  forgotText: {
    fontSize: Math.min(width * 0.032, 13),
    fontWeight: '700',
    color: '#D4A59A',
  },
  loginButton: {
    height: Math.min(height * 0.07, 56),
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#C8B6A6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: Math.min(width * 0.04, 16),
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
});
