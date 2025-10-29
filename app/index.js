
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Building2, MapPin, Zap, Sparkles } from "lucide-react-native";
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
  primary: "#C8B6A6",
  secondary: "#F3EDE6",
  accent: "#D4A59A",
  dark: "#2C2C2C",
  light: "#F8F6F3",
  white: "#FFFFFF",
  overlay: "rgba(44, 44, 44, 0.45)",
};

const AppLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <LinearGradient
        colors={["#C8B6A6", "#D4A59A", "#F3EDE6"]}
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
          colors={["#C8B6A6", "#D4A59A", "#F3EDE6"]}
          style={StyleSheet.absoluteFillObject}
        />
        <LinearGradient
          colors={["rgba(44, 44, 44, 0.25)", "rgba(44, 44, 44, 0.20)", "rgba(44, 44, 44, 0.30)"]}
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
            colors={['rgba(243, 237, 230, 0.92)', 'rgba(243, 237, 230, 0.88)', 'rgba(248, 246, 243, 0.90)']}
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
            colors={['#1e1e1e', '#2a2520', '#1a1a1a']}
            style={styles.bottomSectionGradient}
          />
          
          {/* Features Section */}
          <View style={styles.featuresSection}>
            <View style={styles.featureCard}>
              <View style={styles.featureIconBox}>
                <MapPin size={24} color="#C8B6A6" strokeWidth={2.5} />
              </View>
              <Text style={styles.featureTitle}>Find Nearby</Text>
              <Text style={styles.featureDesc}>Discover salons & spas around you</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIconBox}>
                <Zap size={24} color="#D4A59A" strokeWidth={2.5} />
              </View>
              <Text style={styles.featureTitle}>Easy Booking</Text>
              <Text style={styles.featureDesc}>Book appointments in seconds</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIconBox}>
                <Sparkles size={24} color="#F3EDE6" strokeWidth={2.5} />
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
                colors={["#C8B6A6", "#D4A59A"]}
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
              onPress={() => router.push('/Partner')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["rgba(200, 182, 166, 0.2)", "rgba(212, 165, 154, 0.15)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.vendorBtn}
              >
                <Building2 size={16} color="#C8B6A6" strokeWidth={2.5} />
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
    backgroundColor: 'rgba(200, 182, 166, 0.15)',
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
    backgroundColor: 'rgba(212, 165, 154, 0.12)',
  },
  circle3: {
    width: width * 0.4,
    height: width * 0.4,
    bottom: height * 0.35,
    left: -width * 0.05,
    backgroundColor: 'rgba(243, 237, 230, 0.1)',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bottomSectionGradient: {
    ...StyleSheet.absoluteFillObject,
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
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
    paddingBottom: height * 0.05,
    overflow: 'hidden',
    zIndex: 1,
    width: '100%',
    maxWidth: '100%',
  },
  topSectionBg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  topSectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
  },
  bottomSection: {
    flex: 3,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.04,
    paddingBottom: height * 0.03,
    justifyContent: 'space-between',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -30,
    zIndex: 2,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
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
    shadowColor: "#C8B6A6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoText: {
    fontSize: Math.min(width * 0.06, 24),
    color: "#FFF",
  },
  brandName: {
    fontSize: Math.min(width * 0.055, 22),
    fontWeight: "900",
    color: "#2C2C2C",
    letterSpacing: 2.5,
    marginBottom: height * 0.005,
    textShadowColor: "rgba(200, 182, 166, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: Math.min(width * 0.025, 10),
    color: "#8B6F47",
    fontWeight: "700",
    marginBottom: height * 0.015,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  heading: {
    fontSize: Math.min(width * 0.06, 24),
    fontWeight: "900",
    color: "#1A1A1A",
    lineHeight: Math.min(width * 0.07, 28),
    marginBottom: height * 0.008,
    textAlign: "center",
    textShadowColor: "rgba(200, 182, 166, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subheading: {
    fontSize: Math.min(width * 0.025, 10),
    color: "rgba(44, 44, 44, 0.75)",
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
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 18,
    padding: width * 0.03,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    minHeight: height * 0.13,
    justifyContent: 'center',
    maxWidth: width * 0.28,
  },
  featureIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.008,
  },
  featureTitle: {
    fontSize: Math.min(width * 0.03, 12),
    fontWeight: '800',
    color: '#FFF',
    marginBottom: height * 0.004,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: Math.min(width * 0.024, 9.5),
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    lineHeight: Math.min(width * 0.032, 13),
  },
  ctaSection: {
    gap: height * 0.01,
    marginVertical: height * 0.008,
    width: '100%',
    maxWidth: '100%',
    zIndex: 1,
  },
  primaryBtn: {
    paddingVertical: height * 0.014,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#C8B6A6",
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
    paddingVertical: height * 0.014,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#FFF",
    fontSize: Math.min(width * 0.038, 15),
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  vendorBtn: {
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: "rgba(200, 182, 166, 0.4)",
  },
  vendorBtnText: {
    fontSize: Math.min(width * 0.036, 14),
    fontWeight: "800",
    color: "#C8B6A6",
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
    color: "rgba(255, 255, 255, 0.6)",
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
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },
  pillText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: Math.min(width * 0.026, 10),
    letterSpacing: 0.4,
  },
});
