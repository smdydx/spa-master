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
              <UserCircle2 size={32} color="#FFFFFF" strokeWidth={2} />
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoGradient: {
    width: 72,
    height: 72,
    borderRadius: 18,
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
    fontSize: 16,
    fontWeight: "900",
    color: "#2C2C2C",
    letterSpacing: 2.5,
    marginBottom: 12,
    textShadowColor: "rgba(200, 182, 166, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heading: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1A1A1A",
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "rgba(200, 182, 166, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subheading: {
    fontSize: 13,
    color: "rgba(44, 44, 44, 0.75)",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  // Bottom Section - Form
  bottomSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
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
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
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
    paddingHorizontal: 6,
    paddingVertical: 6,
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
    paddingVertical: 16,
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
    fontSize: 15,
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
