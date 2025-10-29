import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Lock, User } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: "#C8B6A6",
  secondary: "#F3EDE6",
  accent: "#D4A59A",
  dark: "#2C2C2C",
  light: "#F8F6F3",
  white: "#FFFFFF",
};

export default function EmployeeLogin() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Background */}
      <View style={styles.backgroundContainer}>
        <LinearGradient
          colors={["#C8B6A6", "#D4A59A", "#F3EDE6"]}
          style={StyleSheet.absoluteFillObject}
        />
        <LinearGradient
          colors={["rgba(44, 44, 44, 0.20)", "rgba(44, 44, 44, 0.15)", "rgba(44, 44, 44, 0.25)"]}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      {/* Decorative Circles */}
      <View style={styles.decorativeCircles}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={20} color="#2C2C2C" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        {/* Top Section - Logo & Title */}
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={["#C8B6A6", "#D4A59A", "#F3EDE6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoGradient}
            >
              <Text style={styles.logoText}>👨‍💼</Text>
            </LinearGradient>
          </View>
          <Text style={styles.brandName}>EMPLOYEE PORTAL</Text>
          <Text style={styles.heading}>Welcome Back!</Text>
          <Text style={styles.subheading}>Sign in to access your dashboard</Text>
        </View>

        {/* Bottom Section - Login Form */}
        <View style={styles.bottomSection}>
          <LinearGradient
            colors={['#1e1e1e', '#2a2520', '#1a1a1a']}
            style={styles.bottomSectionGradient}
          />

          <View style={styles.formContent}>
            {/* Mobile Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.inputWrap}>
                <View style={styles.iconBox}>
                  <User size={20} color="#C8B6A6" strokeWidth={2.5} />
                </View>
                <TextInput
                  placeholder="Enter 10-digit mobile number"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  keyboardType="number-pad"
                  maxLength={10}
                  value={mobile}
                  onChangeText={setMobile}
                  style={styles.input}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrap}>
                <View style={styles.iconBox}>
                  <Lock size={20} color="#C8B6A6" strokeWidth={2.5} />
                </View>
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                />
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={() => router.push("/Employee")}
              style={styles.loginBtnWrap}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["#C8B6A6", "#D4A59A"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginBtn}
              >
                <Text style={styles.loginBtnText}>LOGIN TO DASHBOARD</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Demo Credentials */}
            <View style={styles.demoBox}>
              <View style={styles.demoBadge}>
                <Text style={styles.demoBadgeText}>DEMO ACCESS</Text>
              </View>
              <View style={styles.demoRow}>
                <Text style={styles.demoLabel}>Mobile:</Text>
                <Text style={styles.demoValue}>Any 10-digit number</Text>
              </View>
              <View style={styles.demoRow}>
                <Text style={styles.demoLabel}>Password:</Text>
                <Text style={styles.demoValue}>1234</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    width: '100%',
    overflow: 'hidden',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    overflow: 'hidden',
  },
  decorativeCircles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: 'rgba(200, 182, 166, 0.15)',
  },
  circle1: {
    width: width * 0.6,
    height: width * 0.6,
    top: height * 0.05,
    right: -width * 0.25,
  },
  circle2: {
    width: width * 0.5,
    height: width * 0.5,
    top: height * 0.02,
    left: -width * 0.2,
    backgroundColor: 'rgba(212, 165, 154, 0.12)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    zIndex: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(200, 182, 166, 0.3)",
    shadowColor: "#C8B6A6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  // Top Section
  topSection: {
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.04,
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: height * 0.015,
  },
  logoGradient: {
    width: 72,
    height: 72,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#C8B6A6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoText: {
    fontSize: 36,
  },
  brandName: {
    fontSize: Math.min(width * 0.045, 18),
    fontWeight: "900",
    color: "#2C2C2C",
    letterSpacing: 2.5,
    marginBottom: height * 0.01,
    textShadowColor: "rgba(200, 182, 166, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heading: {
    fontSize: Math.min(width * 0.065, 26),
    fontWeight: "900",
    color: "#1A1A1A",
    lineHeight: Math.min(width * 0.075, 30),
    marginBottom: height * 0.008,
    textAlign: "center",
    textShadowColor: "rgba(200, 182, 166, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subheading: {
    fontSize: Math.min(width * 0.028, 11),
    color: "rgba(44, 44, 44, 0.75)",
    lineHeight: Math.min(width * 0.038, 15),
    textAlign: "center",
  },

  // Bottom Section - Form
  bottomSection: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.04,
    paddingBottom: height * 0.03,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -20,
    zIndex: 2,
    overflow: 'hidden',
  },
  bottomSectionGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  formContent: {
    zIndex: 1,
  },

  // Input Groups
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 14,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(200, 182, 166, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#FFF',
    paddingRight: 12,
  },

  // Login Button
  loginBtnWrap: {
    marginTop: 12,
  },
  loginBtn: {
    paddingVertical: height * 0.016,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#C8B6A6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  loginBtnText: {
    color: "#FFF",
    fontSize: Math.min(width * 0.04, 16),
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  // Demo Box
  demoBox: {
    marginTop: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(200, 182, 166, 0.3)',
    padding: 18,
  },
  demoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(200, 182, 166, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(200, 182, 166, 0.4)',
  },
  demoBadgeText: {
    color: '#C8B6A6',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  demoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  demoLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#D4A59A',
    width: 90,
    letterSpacing: 0.5,
  },
  demoValue: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
  },
});
