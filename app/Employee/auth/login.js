import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, Lock } from 'lucide-react-native';
import { OmbaroTheme } from '../../../constants/theme';

const { width, height } = Dimensions.get('window');

export default function EmployeeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/Employee');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Split Screen Layout */}
        <View style={styles.splitContainer}>
          {/* Top Section - Brand & Visual */}
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
              <Text style={styles.brandTagline}>Employee Portal</Text>
              <Text style={styles.welcomeText}>Employee Login</Text>
              <Text style={styles.subText}>Access your dashboard</Text>
            </View>
          </LinearGradient>

          {/* Bottom Section - Form */}
          <View style={styles.bottomSection}>
            <LinearGradient
              colors={['#1A1A1A', '#2C2520', '#1F1F1F']}
              style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Login to Continue</Text>

              {/* Email Input */}
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

              {/* Password Input */}
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

              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleLogin}
                activeOpacity={0.9}
              >
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
    flex: 1.5, // Adjusted flex for better proportion
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 24,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Ensure back button is above gradient
  },
  brandSection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Take full width
  },
  iconContainer: {
    width: 72, // Slightly larger icon container
    height: 72,
    borderRadius: 18, // Slightly larger border radius
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Increased margin
  },
  iconCircle: {
    width: 40, // Size of the inner circle
    height: 40, // Size of the inner circle
    borderRadius: 20, // Half of width/height for a perfect circle
    backgroundColor: '#FFFFFF', // White circle
  },
  brandName: {
    fontSize: width * 0.08, // Responsive font size
    fontWeight: '900',
    color: '#2C2C2C',
    letterSpacing: 3,
    marginBottom: 10, // Reduced margin
  },
  brandTagline: {
    fontSize: width * 0.035, // Responsive font size
    fontWeight: '700',
    color: '#8B6F47',
    letterSpacing: 1,
    marginBottom: 20, // Increased margin
  },
  welcomeText: {
    fontSize: width * 0.06, // Responsive font size for welcome text
    fontWeight: '900',
    color: '#1A1A1A',
    marginBottom: 10, // Reduced margin
    textAlign: 'center',
  },
  subText: {
    fontSize: width * 0.04, // Responsive font size for sub text
    color: 'rgba(44, 44, 44, 0.8)', // Slightly darker for better readability
    textAlign: 'center',
    paddingHorizontal: 20, // Add padding to prevent text from touching edges
  },
  bottomSection: {
    flex: 2, // Increased flex for the form section
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    overflow: 'hidden',
    justifyContent: 'center', // Center form content
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40, // Increased padding top
    paddingBottom: 32, // Increased padding bottom
    justifyContent: 'center', // Center form elements
  },
  formTitle: {
    fontSize: width * 0.07, // Responsive font size
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 24, // Increased margin between input groups
  },
  label: {
    fontSize: width * 0.035, // Responsive font size
    fontWeight: '700',
    color: '#C8B6A6',
    marginBottom: 10, // Increased margin
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(200, 182, 166, 0.3)',
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: width * 0.04, // Responsive font size
    color: '#FFFFFF',
    fontWeight: '600',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 32, // Increased margin
  },
  forgotText: {
    fontSize: width * 0.035, // Responsive font size
    fontWeight: '700',
    color: '#D4A59A',
  },
  loginButton: {
    height: 56,
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
    fontSize: width * 0.045, // Responsive font size
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
});