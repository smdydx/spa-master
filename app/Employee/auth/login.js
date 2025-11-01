
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { OmbaroTheme } from '../../../constants/theme';

export default function EmployeeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const isSmallDevice = height < 700;
  const scale = Math.min(width / 390, 1.2);

  const handleLogin = () => {
    router.replace('/Employee');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={[styles.header, { marginBottom: height * (isSmallDevice ? 0.02 : 0.03) }]}>
            <View style={[styles.iconContainer, { 
              width: 56 * scale, 
              height: 56 * scale,
              marginBottom: height * 0.015
            }]}>
              <Text style={{ fontSize: 28 * scale }}>💼</Text>
            </View>
            <Text style={[styles.brand, { fontSize: 28 * scale }]}>OMBARO</Text>
            <Text style={[styles.tagline, { fontSize: 12 * scale }]}>Employee Portal</Text>
          </View>

          {/* Form Card */}
          <View style={[styles.formCard, { 
            padding: 24 * scale,
            marginBottom: height * (isSmallDevice ? 0.015 : 0.02)
          }]}>
            <Text style={[styles.formTitle, { 
              fontSize: 20 * scale,
              marginBottom: height * 0.02
            }]}>Welcome Back</Text>

            {/* Email Input */}
            <View style={[styles.inputContainer, { marginBottom: height * 0.015 }]}>
              <Text style={[styles.label, { fontSize: 13 * scale }]}>Email</Text>
              <View style={[styles.inputWrapper, { height: 48 * scale }]}>
                <Text style={{ fontSize: 16 * scale, marginRight: 8 }}>📧</Text>
                <TextInput
                  style={[styles.input, { fontSize: 15 * scale }]}
                  placeholder="Enter your email"
                  placeholderTextColor={OmbaroTheme.colors.textGray}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={[styles.inputContainer, { marginBottom: height * 0.015 }]}>
              <Text style={[styles.label, { fontSize: 13 * scale }]}>Password</Text>
              <View style={[styles.inputWrapper, { height: 48 * scale }]}>
                <Text style={{ fontSize: 16 * scale, marginRight: 8 }}>🔒</Text>
                <TextInput
                  style={[styles.input, { fontSize: 15 * scale }]}
                  placeholder="Enter your password"
                  placeholderTextColor={OmbaroTheme.colors.textGray}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotContainer}>
              <Text style={[styles.forgotText, { fontSize: 13 * scale }]}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, { 
                height: 52 * scale,
                marginTop: height * 0.015
              }]}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={[styles.loginButtonText, { fontSize: 15 * scale }]}>LOGIN</Text>
            </TouchableOpacity>
          </View>

          {/* Back Button */}
          <TouchableOpacity
            style={[styles.backButton, { height: 48 * scale }]}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={[styles.backButtonText, { fontSize: 14 * scale }]}>← Back to Home</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OmbaroTheme.colors.beigeLight,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 16,
    backgroundColor: OmbaroTheme.colors.roseGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontWeight: '800',
    color: OmbaroTheme.colors.textDark,
    letterSpacing: 2,
    marginBottom: 4,
  },
  tagline: {
    color: OmbaroTheme.colors.roseGoldDark,
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: OmbaroTheme.colors.white,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  formTitle: {
    fontWeight: '800',
    color: OmbaroTheme.colors.textDark,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    fontWeight: '600',
    color: OmbaroTheme.colors.textDark,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: OmbaroTheme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: OmbaroTheme.colors.textDark,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotText: {
    color: OmbaroTheme.colors.roseGoldDark,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: OmbaroTheme.colors.roseGold,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: OmbaroTheme.colors.roseGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: OmbaroTheme.colors.white,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  backButton: {
    borderWidth: 1.5,
    borderColor: OmbaroTheme.colors.border,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  backButtonText: {
    color: OmbaroTheme.colors.textDark,
    fontWeight: '700',
  },
});
