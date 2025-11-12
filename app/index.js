
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Building2, MapPin, Zap, Sparkles } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: "#1e3a8a",
  secondary: "#3b82f6",
  accent: "#FFFFFF",
  dark: "#2C2C2C",
  light: "#FFFFFF",
  white: "#FFFFFF",
  overlay: "rgba(30, 58, 138, 0.15)",
  darkGreen: "#016B3A",
  darkGreenMuted: "#013B1F",
  lightGreen: "#E8F5E9",
};

const AppLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <LinearGradient
        colors={["#FFFFFF", "#f3f4f6", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.logoGradient}
      >
        <Text style={styles.logoText}>✧</Text>
      </LinearGradient>
    </View>
  );
};

const PillLink = ({ label, nav, router }) => {
  return (
    <TouchableOpacity
      style={styles.pill}
      onPress={() => router.push(nav)}
      activeOpacity={0.7}
    >
      <Text style={styles.pillText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function WelcomeScreen() {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />

      {/* Background with optimized image loading */}
      <View style={styles.backgroundContainer}>
        <LinearGradient
          colors={["#00FF87", "#016B3A", "#013B1F", "#012B17"]}
          style={StyleSheet.absoluteFillObject}
        />
        <LinearGradient
          colors={["rgba(1, 107, 58, 0.05)", "rgba(0, 255, 135, 0.03)", "rgba(1, 59, 31, 0.05)"]}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      {/* Decorative Circles */}
      <View style={styles.decorativeCircles}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>

      {/* 2:3 Split Layout */}
      <View style={styles.splitContainer}>
        {/* Top Section (2 parts) */}
        <View style={styles.topSection}>
          <Image
            source={require('../assets/images/japanese-girl-bg.jpg')}
            style={styles.topSectionBg}
            resizeMode="cover"
            fadeDuration={200}
            progressiveRenderingEnabled={true}
          />
          <LinearGradient
            colors={['rgba(1, 107, 58, 0.5)', 'rgba(1, 107, 58, 0.4)', 'rgba(1, 59, 31, 0.55)']}
            style={styles.topSectionOverlay}
          />
          <View style={styles.topContent}>
            <AppLogo />
            <Text style={styles.brandName}>OMBARO</Text>
            <Text style={styles.tagline}>Beauty & Wellness Hub</Text>
            <Text style={styles.heading}>Welcome to Your Beauty Journey</Text>
            <Text style={styles.subheading}>Premium spa & wellness services</Text>
          </View>
        </View>

        {/* Bottom Section (3 parts) */}
        <View style={styles.bottomSection}>
          <LinearGradient
            colors={['#E8F5E9', '#F1F8F1', '#FFFFFF']}
            style={styles.bottomSectionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          
          {/* Leaf Pattern Overlay */}
          <View style={styles.leafPatternWelcome}>
            <Ionicons name="leaf" size={width * 0.3} color="rgba(1, 107, 58, 0.03)" style={{ position: 'absolute', top: height * 0.05, right: -width * 0.05, transform: [{ rotate: '25deg' }] }} />
            <Ionicons name="leaf" size={width * 0.2} color="rgba(1, 107, 58, 0.04)" style={{ position: 'absolute', top: height * 0.25, left: -width * 0.03, transform: [{ rotate: '-15deg' }] }} />
            <Ionicons name="leaf" size={width * 0.25} color="rgba(1, 107, 58, 0.03)" style={{ position: 'absolute', bottom: height * 0.15, right: width * 0.02, transform: [{ rotate: '45deg' }] }} />
            <Ionicons name="leaf" size={width * 0.18} color="rgba(1, 107, 58, 0.05)" style={{ position: 'absolute', bottom: height * 0.05, left: width * 0.05, transform: [{ rotate: '-30deg' }] }} />
          </View>
          
          {/* Features Section */}
          <View style={styles.featuresSection}>
            <View style={styles.featureCard}>
              <View style={styles.featureIconBox}>
                <MapPin size={24} color="#FFFFFF" strokeWidth={2.5} />
              </View>
              <Text style={styles.featureTitle}>Find Nearby</Text>
              <Text style={styles.featureDesc}>Discover salons & spas around you</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIconBox}>
                <Zap size={24} color="#FFFFFF" strokeWidth={2.5} />
              </View>
              <Text style={styles.featureTitle}>Easy Booking</Text>
              <Text style={styles.featureDesc}>Book appointments in seconds</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIconBox}>
                <Sparkles size={24} color="#FFFFFF" strokeWidth={2.5} />
              </View>
              <Text style={styles.featureTitle}>Premium Quality</Text>
              <Text style={styles.featureDesc}>Verified professionals</Text>
            </View>
          </View>

          <View style={styles.ctaSection}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push('/auth/phone-register')}
            >
              <LinearGradient
                colors={["#016B3A", "#00FF87"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryBtn}
              >
                <Text style={styles.primaryBtnText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.9}>
              <Text style={styles.secondaryBtnText}>Login to Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('Partner')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.95)", "rgba(248, 249, 250, 0.95)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.vendorBtn}
              >
                <Building2 size={16} color="#1e3a8a" strokeWidth={2.5} />
                <Text style={styles.vendorBtnText}>Become a Partner</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.quickAccessSection}>
            <Text style={styles.quickAccessLabel}>Quick Access</Text>
            <View style={styles.pillsContainer}>
              <PillLink label="Employee" nav="/Employee/auth/login" router={router} />
              <PillLink label="Vendor" nav="/Vendor/auth/login" router={router} />
              <PillLink label="Therapist" nav="/Therapist/auth/login" router={router} />
              <PillLink label="Beautician" nav="/Therapist/auth/login" router={router} />
              <PillLink label="Admin" nav="/Admin/auth/login" router={router} />
              <PillLink label="Departments" nav="/Department/auth/login" router={router} />
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
    maxWidth: '100%',
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
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  circle1: {
    width: width * 0.6,
    height: width * 0.6,
    top: height * 0.15,
    right: -width * 0.25,
  },
  circle2: {
    width: width * 0.5,
    height: width * 0.5,
    top: height * 0.1,
    left: -width * 0.2,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  circle3: {
    width: width * 0.4,
    height: width * 0.4,
    bottom: height * 0.35,
    left: -width * 0.05,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bottomSectionGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
  },
  leafPatternWelcome: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  splitContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',
  },
  topSection: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: Math.max(width * 0.05, 16),
    paddingTop: Math.max(height * 0.03, 20),
    paddingBottom: Math.max(height * 0.05, 30),
    overflow: 'hidden',
    zIndex: 1,
    width: '100%',
    maxWidth: '100%',
    backgroundColor: '#016B3A',
  },
  topSectionBg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  topSectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    opacity: 1,
  },
  bottomSection: {
    flex: 3,
    paddingHorizontal: Math.max(width * 0.05, 16),
    paddingTop: Math.max(height * 0.04, 24),
    paddingBottom: Math.max(height * 0.03, 20),
    justifyContent: 'space-between',
    borderTopLeftRadius: Math.min(width * 0.1, 40),
    borderTopRightRadius: Math.min(width * 0.1, 40),
    marginTop: -30,
    zIndex: 2,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  topContent: {
    alignItems: "center",
    width: '100%',
    maxWidth: '100%',
  },
  logoContainer: {
    marginBottom: height * 0.012,
  },
  logoGradient: {
    width: Math.min(width * 0.12, 48),
    height: Math.min(width * 0.12, 48),
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  logoText: {
    fontSize: Math.min(width * 0.06, 24),
    color: "#016B3A",
  },
  brandName: {
    fontSize: Math.min(width * 0.055, 22),
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 2.5,
    marginBottom: height * 0.005,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: Math.min(width * 0.025, 10),
    color: "#00FF87",
    fontWeight: "700",
    marginBottom: height * 0.015,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  heading: {
    fontSize: Math.min(width * 0.06, 24),
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: Math.min(width * 0.07, 28),
    marginBottom: height * 0.008,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subheading: {
    fontSize: Math.min(width * 0.025, 10),
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: Math.min(width * 0.035, 14),
    textAlign: "center",
    paddingHorizontal: width * 0.02,
  },
  featuresSection: {
    flexDirection: 'row',
    gap: width * 0.025,
    justifyContent: 'space-between',
    paddingVertical: height * 0.01,
    width: '100%',
    maxWidth: '100%',
    zIndex: 1,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: Math.min(width * 0.046, 18),
    padding: Math.max(width * 0.03, 10),
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    minHeight: Math.max(height * 0.13, 100),
    justifyContent: 'center',
    maxWidth: width * 0.28,
  },
  featureIconBox: {
    width: Math.min(width * 0.113, 44),
    height: Math.min(width * 0.113, 44),
    borderRadius: Math.min(width * 0.031, 12),
    backgroundColor: '#016B3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Math.max(height * 0.008, 6),
  },
  featureTitle: {
    fontSize: Math.min(width * 0.03, 12),
    fontWeight: '800',
    color: '#016B3A',
    marginBottom: height * 0.004,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: Math.min(width * 0.024, 9.5),
    color: '#64748b',
    textAlign: 'center',
    lineHeight: Math.min(width * 0.032, 13),
  },
  ctaSection: {
    gap: Math.max(height * 0.01, 8),
    marginVertical: Math.max(height * 0.008, 6),
    width: '100%',
    maxWidth: '100%',
    zIndex: 1,
  },
  primaryBtn: {
    paddingVertical: Math.max(height * 0.014, 12),
    borderRadius: Math.min(width * 0.036, 14),
    alignItems: "center",
    shadowColor: "#016B3A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryBtnText: {
    color: "#FFF",
    fontSize: Math.min(width * 0.04, 16),
    fontWeight: "900",
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  secondaryBtn: {
    paddingVertical: Math.max(height * 0.014, 12),
    borderRadius: Math.min(width * 0.036, 14),
    borderWidth: 1.5,
    borderColor: "#016B3A",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#016B3A",
    fontSize: Math.min(width * 0.038, 15),
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  vendorBtn: {
    paddingVertical: Math.max(height * 0.012, 10),
    paddingHorizontal: Math.max(width * 0.04, 14),
    borderRadius: Math.min(width * 0.036, 14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    shadowColor: "#016B3A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  vendorBtnText: {
    fontSize: Math.min(width * 0.036, 14),
    fontWeight: "800",
    color: "#016B3A",
    letterSpacing: 0.5,
  },
  quickAccessSection: {
    alignItems: "center",
    paddingBottom: height * 0.01,
    width: '100%',
    maxWidth: '100%',
    zIndex: 1,
  },
  quickAccessLabel: {
    fontSize: Math.min(width * 0.026, 10),
    fontWeight: "800",
    color: "#016B3A",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: height * 0.01,
  },
  pillsContainer: {
    flexDirection: "row",
    gap: width * 0.02,
    flexWrap: "wrap",
    justifyContent: "center",
    width: '100%',
    maxWidth: '100%',
    paddingHorizontal: width * 0.02,
  },
  pill: {
    paddingHorizontal: width * 0.035,
    paddingVertical: height * 0.009,
    borderRadius: 18,
    backgroundColor: "#E8F5E9",
    borderWidth: 1.5,
    borderColor: "#016B3A",
  },
  pillText: {
    color: "#016B3A",
    fontWeight: "800",
    fontSize: Math.min(width * 0.026, 10),
    letterSpacing: 0.4,
  },
});
