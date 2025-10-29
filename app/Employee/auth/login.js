import { BlurView } from 'expo-blur';
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
          colors={["rgba(44, 44, 44, 0.15)", "rgba(44, 44, 44, 0.10)", "rgba(44, 44, 44, 0.20)"]}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      {/* Blur Bubbles */}
      <View style={styles.bubblesContainer}>
        <View style={[styles.bubble, styles.bubble1]}>
          <BlurView intensity={40} style={styles.blurBubble} tint="light" />
        </View>
        <View style={[styles.bubble, styles.bubble2]}>
          <BlurView intensity={50} style={styles.blurBubble} tint="light" />
        </View>
        <View style={[styles.bubble, styles.bubble3]}>
          <BlurView intensity={35} style={styles.blurBubble} tint="light" />
        </View>
        <View style={[styles.bubble, styles.bubble4]}>
          <BlurView intensity={45} style={styles.blurBubble} tint="light" />
        </View>
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
              <UserCircle2 size={width * 0.08} color="#FFFFFF" strokeWidth={2} />
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
                  <User size={width * 0.05} color="#C8B6A6" strokeWidth={2.5} />
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
                  <Lock size={width * 0.05} color="#C8B6A6" strokeWidth={2.5} />
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
  bubblesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  bubble: {
    position: 'absolute',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  blurBubble: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  bubble1: {
    width: width * 0.5,
    height: width * 0.5,
    top: height * 0.08,
    right: -width * 0.15,
  },
  bubble2: {
    width: width * 0.35,
    height: width * 0.35,
    top: height * 0.02,
    left: -width * 0.1,
  },
  bubble3: {
    width: width * 0.4,
    height: width * 0.4,
    top: height * 0.15,
    left: width * 0.15,
  },
  bubble4: {
    width: width * 0.25,
    height: width * 0.25,
    top: height * 0.05,
    right: width * 0.2,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: height * 0.05,
  },

  // Header
  header: {
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.015,
    zIndex: 10,
  },
  backBtn: {
    width: width * 0.11,
    height: width * 0.11,
    maxWidth: 48,
    maxHeight: 48,
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
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.04,
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: height * 0.02,
  },
  logoGradient: {
    width: width * 0.18,
    height: width * 0.18,
    maxWidth: 80,
    maxHeight: 80,
    borderRadius: 20,
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
    fontSize: width * 0.042,
    fontWeight: "900",
    color: "#2C2C2C",
    letterSpacing: 2.5,
    marginBottom: height * 0.012,
    textShadowColor: "rgba(200, 182, 166, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heading: {
    fontSize: width * 0.065,
    fontWeight: "900",
    color: "#1A1A1A",
    marginBottom: height * 0.01,
    textAlign: "center",
    textShadowColor: "rgba(200, 182, 166, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subheading: {
    fontSize: width * 0.032,
    color: "rgba(44, 44, 44, 0.75)",
    textAlign: "center",
    paddingHorizontal: width * 0.05,
  },

  // Bottom Section - Form
  bottomSection: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.04,
    paddingBottom: height * 0.03,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -20,
    zIndex: 2,
    overflow: 'hidden',
    minHeight: height * 0.5,
  },
  bottomSectionGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  formContent: {
    zIndex: 1,
  },

  // Input Groups
  inputGroup: {
    marginBottom: height * 0.025,
  },
  label: {
    fontSize: width * 0.032,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: height * 0.012,
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
    paddingHorizontal: width * 0.015,
    paddingVertical: height * 0.008,
  },
  iconBox: {
    width: width * 0.11,
    height: width * 0.11,
    maxWidth: 48,
    maxHeight: 48,
    borderRadius: 10,
    backgroundColor: 'rgba(200, 182, 166, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width * 0.025,
  },
  input: {
    flex: 1,
    fontSize: width * 0.038,
    color: '#FFF',
    paddingRight: width * 0.03,
  },

  // Login Button
  loginBtnWrap: {
    marginTop: height * 0.015,
  },
  loginBtn: {
    paddingVertical: height * 0.018,
    borderRadius: 14,
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
    fontSize: width * 0.04,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  // Demo Box
  demoBox: {
    marginTop: height * 0.035,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(200, 182, 166, 0.3)',
    padding: width * 0.045,
  },
  demoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(200, 182, 166, 0.25)',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.008,
    borderRadius: 8,
    marginBottom: height * 0.018,
    borderWidth: 1,
    borderColor: 'rgba(200, 182, 166, 0.4)',
  },
  demoBadgeText: {
    color: '#C8B6A6',
    fontSize: width * 0.028,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  demoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  demoLabel: {
    fontSize: width * 0.034,
    fontWeight: '800',
    color: '#D4A59A',
    width: width * 0.22,
    letterSpacing: 0.5,
  },
  demoValue: {
    fontSize: width * 0.036,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
  },
});
