import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Lock, User, UserCircle2 } from "lucide-react-native";
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
          colors={["rgba(44, 44, 44, 0.12)", "rgba(44, 44, 44, 0.08)", "rgba(44, 44, 44, 0.15)"]}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

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
            <UserCircle2 size={28} color="#FFFFFF" strokeWidth={2} />
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    width: '100%',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
  },

  // Header
  header: {
    paddingHorizontal: Math.min(width * 0.05, 20),
    paddingTop: height * 0.015,
    paddingBottom: height * 0.01,
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
    ...Platform.select({
      ios: {
        shadowColor: "#C8B6A6",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  // Top Section
  topSection: {
    paddingHorizontal: Math.min(width * 0.06, 24),
    paddingTop: height * 0.015,
    paddingBottom: height * 0.02,
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: height * 0.012,
  },
  logoGradient: {
    width: Math.min(width * 0.15, 60),
    height: Math.min(width * 0.15, 60),
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#C8B6A6",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  brandName: {
    fontSize: Math.min(width * 0.038, 14),
    fontWeight: "900",
    color: "#2C2C2C",
    letterSpacing: 2,
    marginBottom: height * 0.008,
    textShadowColor: "rgba(200, 182, 166, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heading: {
    fontSize: Math.min(width * 0.058, 22),
    fontWeight: "900",
    color: "#1A1A1A",
    marginBottom: height * 0.006,
    textAlign: "center",
    textShadowColor: "rgba(200, 182, 166, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subheading: {
    fontSize: Math.min(width * 0.032, 12),
    color: "rgba(44, 44, 44, 0.75)",
    textAlign: "center",
    paddingHorizontal: width * 0.05,
  },

  // Bottom Section - Form
  bottomSection: {
    flex: 1,
    paddingHorizontal: Math.min(width * 0.06, 24),
    paddingTop: height * 0.025,
    paddingBottom: height * 0.02,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -15,
    zIndex: 2,
    overflow: 'hidden',
  },
  bottomSectionGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  formContent: {
    zIndex: 1,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },

  // Input Groups
  inputGroup: {
    marginBottom: height * 0.018,
  },
  label: {
    fontSize: Math.min(width * 0.032, 12),
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: height * 0.01,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  iconBox: {
    width: Math.min(width * 0.1, 40),
    height: Math.min(width * 0.1, 40),
    borderRadius: 10,
    backgroundColor: 'rgba(200, 182, 166, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: Math.min(width * 0.038, 14),
    color: '#FFF',
    paddingRight: 12,
    paddingVertical: height * 0.01,
  },

  // Login Button
  loginBtnWrap: {
    marginTop: height * 0.012,
  },
  loginBtn: {
    paddingVertical: height * 0.018,
    borderRadius: 12,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#C8B6A6",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  loginBtnText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  // Demo Box
  demoBox: {
    marginTop: height * 0.02,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(200, 182, 166, 0.3)',
    padding: Math.min(width * 0.04, 16),
  },
  demoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(200, 182, 166, 0.25)',
    paddingHorizontal: Math.min(width * 0.03, 10),
    paddingVertical: height * 0.006,
    borderRadius: 8,
    marginBottom: height * 0.012,
    borderWidth: 1,
    borderColor: 'rgba(200, 182, 166, 0.4)',
  },
  demoBadgeText: {
    color: '#C8B6A6',
    fontSize: Math.min(width * 0.028, 10),
    fontWeight: '900',
    letterSpacing: 1,
  },
  demoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.008,
  },
  demoLabel: {
    fontSize: Math.min(width * 0.032, 12),
    fontWeight: '800',
    color: '#D4A59A',
    width: Math.min(width * 0.22, 85),
    letterSpacing: 0.5,
  },
  demoValue: {
    fontSize: Math.min(width * 0.035, 13),
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
  },
});
