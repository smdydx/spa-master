import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Building2, Clock, MapPin, Star } from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: "#E91E63",
  secondary: "#FF4081",
  accent: "#FFC107",
  dark: "#1A1A2E",
  light: "#F8F9FA",
  white: "#FFFFFF",
  overlay: "rgba(26, 26, 46, 0.7)",
};

const FloatingLeaf = ({ delay = 0, duration = 4000, style }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: 50,
            duration: duration,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: 20,
            duration: duration / 2,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: -20,
            duration: duration / 2,
            useNativeDriver: true,
          }),
        ]),
        Animated.loop(
          Animated.timing(rotate, {
            toValue: 1,
            duration: duration * 2,
            useNativeDriver: true,
          })
        ),
      ])
    ).start();
  }, []);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Text
      style={[
        styles.floatingLeaf,
        style,
        {
          transform: [
            { translateY },
            { translateX },
            { rotate: rotateInterpolate },
          ],
        },
      ]}
    >
      🌸
    </Animated.Text>
  );
};

const SakuraPattern = () => (
  <View style={styles.sakuraContainer}>
    <FloatingLeaf style={{ top: 40, left: 20 }} delay={0} />
    <FloatingLeaf style={{ top: 100, right: 40 }} delay={500} duration={5000} />
    <FloatingLeaf style={{ top: 200, left: 60 }} delay={1000} duration={4500} />
    <FloatingLeaf style={{ top: 300, right: 80 }} delay={1500} />
    <FloatingLeaf style={{ top: 400, left: 100 }} delay={2000} duration={5500} />
  </View>
);

const AppLogo = () => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.logoContainer,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={["#E91E63", "#FF4081", "#FFC107"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.logoGradient}
      >
        <Text style={styles.logoText}>✧</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const FeatureCard = ({ icon, title, subtitle, tint }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.featureCard, { opacity: fadeAnim }]}>
      <View style={[styles.featureIcon, { backgroundColor: tint }]}>
        {icon}
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureSubtitle}>{subtitle}</Text>
      </View>
    </Animated.View>
  );
};

const PillLink = ({ label, nav, router }) => (
  <TouchableOpacity
    style={styles.pill}
    onPress={() => router.push(nav)}
    activeOpacity={0.7}
  >
    <Text style={styles.pillText}>{label}</Text>
  </TouchableOpacity>
);

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />

      {/* Background with Gradient Overlay */}
      <View style={styles.backgroundContainer}>
        <LinearGradient
          colors={["#1A1A2E", "#16213E", "#0F3460"]}
          style={StyleSheet.absoluteFillObject}
        />
        <SakuraPattern />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section with Sidebar Layout */}
        <View style={styles.heroSection}>
          {/* Left Content */}
          <Animated.View
            style={[
              styles.leftContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <AppLogo />
            <Text style={styles.brandName}>OMBARO</Text>
            <Text style={styles.tagline}>Beauty & Wellness Hub</Text>

            <View style={styles.japaneseDecor}>
              <Text style={styles.japaneseText}>美と健康</Text>
            </View>

            <Text style={styles.heading}>
              Welcome to Your{'\n'}Beauty Journey
            </Text>
            <Text style={styles.subheading}>
              Discover and book premium spa, salon, and wellness services near
              you. Experience luxury at your fingertips.
            </Text>

            {/* Features */}
            <View style={styles.featuresContainer}>
              <FeatureCard
                icon={<MapPin size={22} color="#FFF" />}
                title="Find Nearby"
                subtitle="Premium salons & spas"
                tint="rgba(14, 165, 233, 0.3)"
              />
              <FeatureCard
                icon={<Clock size={22} color="#FFF" />}
                title="Easy Booking"
                subtitle="Book in seconds"
                tint="rgba(139, 92, 246, 0.3)"
              />
              <FeatureCard
                icon={<Star size={22} color="#FFF" />}
                title="Premium Service"
                subtitle="Verified professionals"
                tint="rgba(16, 185, 129, 0.3)"
              />
            </View>
          </Animated.View>

          {/* Right Decorative Element (Girl Silhouette Area) */}
          <View style={styles.rightDecor}>
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />
            <Text style={styles.decorSakura}>🌸</Text>
            <Text style={[styles.decorSakura, styles.decorSakura2]}>🌸</Text>
            <Text style={[styles.decorSakura, styles.decorSakura3]}>🌸</Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/auth/phone-register')}
          >
            <LinearGradient
              colors={["#E91E63", "#FF4081", "#FFC107"]}
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
              colors={["rgba(255, 193, 7, 0.2)", "rgba(255, 193, 7, 0.1)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.vendorBtn}
            >
              <Building2 size={20} color="#FFC107" />
              <Text style={styles.vendorBtnText}>Become a Partner</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Quick Access */}
        <View style={styles.quickAccessSection}>
          <Text style={styles.quickAccessLabel}>Quick Access</Text>
          <View style={styles.pillsContainer}>
            <PillLink label="Employee" nav="/Employee/auth/login" router={router} />
            <PillLink label="Vendor" nav="/Vendor/auth/login" router={router} />
            <PillLink label="Therapist" nav="/Therapist/auth/login" router={router} />
          </View>
          <View style={styles.pillsContainer}>
            <PillLink label="Admin" nav="/Admin/auth/login" router={router} />
            <PillLink label="Departments" nav="/Department/auth/login" router={router} />
          </View>
        </View>

        {/* Terms */}
        <Text style={styles.terms}>
          By continuing, you agree to our{" "}
          <Text style={styles.link}>Terms & Privacy Policy</Text>
        </Text>

        {/* Japanese Pattern Footer */}
        <View style={styles.patternFooter}>
          <Text style={styles.patternText}>桜 • 美 • 和 • 心</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  sakuraContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingLeaf: {
    position: "absolute",
    fontSize: 24,
    opacity: 0.6,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    flexDirection: width > 768 ? "row" : "column",
    paddingHorizontal: 24,
    paddingTop: 60,
    minHeight: height * 0.7,
  },
  leftContent: {
    flex: 1,
    alignItems: width > 768 ? "flex-start" : "center",
    paddingRight: width > 768 ? 40 : 0,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E91E63",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  logoText: {
    fontSize: 40,
    color: "#FFF",
  },
  brandName: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 4,
    marginBottom: 8,
    textShadowColor: "rgba(233, 30, 99, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#FF4081",
    fontWeight: "600",
    marginBottom: 20,
  },
  japaneseDecor: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 24,
  },
  japaneseText: {
    fontSize: 14,
    color: "#FFC107",
    fontWeight: "700",
    letterSpacing: 2,
  },
  heading: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFF",
    lineHeight: 40,
    marginBottom: 16,
    textAlign: width > 768 ? "left" : "center",
  },
  subheading: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 24,
    marginBottom: 32,
    textAlign: width > 768 ? "left" : "center",
  },
  featuresContainer: {
    width: "100%",
    gap: 12,
    marginTop: 16,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    gap: 14,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFF",
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
  },
  rightDecor: {
    width: width > 768 ? width * 0.4 : width,
    height: width > 768 ? "100%" : 200,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  decorCircle1: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(233, 30, 99, 0.1)",
    position: "absolute",
    top: 50,
  },
  decorCircle2: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 193, 7, 0.1)",
    position: "absolute",
    bottom: 50,
    right: 20,
  },
  decorSakura: {
    fontSize: 48,
    position: "absolute",
    top: 100,
    right: 40,
  },
  decorSakura2: {
    top: 180,
    left: 30,
    fontSize: 36,
  },
  decorSakura3: {
    bottom: 80,
    right: 60,
    fontSize: 40,
  },
  ctaSection: {
    paddingHorizontal: 24,
    marginTop: 32,
    gap: 14,
  },
  primaryBtn: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#E91E63",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryBtnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },
  secondaryBtn: {
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "800",
  },
  vendorBtn: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 193, 7, 0.3)",
  },
  vendorBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFC107",
  },
  quickAccessSection: {
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 24,
  },
  quickAccessLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.5)",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  pillsContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  pillText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 12,
  },
  terms: {
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: 28,
    fontSize: 12,
    paddingHorizontal: 32,
  },
  link: {
    color: "#FF4081",
    fontWeight: "700",
  },
  patternFooter: {
    alignItems: "center",
    marginTop: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  patternText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.3)",
    letterSpacing: 8,
    fontWeight: "300",
  },
});