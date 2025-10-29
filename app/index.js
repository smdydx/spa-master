import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Building2, Clock, MapPin, Star } from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  SafeAreaView,
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
  overlay: "rgba(26, 26, 46, 0.85)",
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

      {/* Background with Japanese Girl Image */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1000' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(26, 26, 46, 0.9)", "rgba(26, 26, 46, 0.85)", "rgba(26, 26, 46, 0.9)"]}
          style={StyleSheet.absoluteFillObject}
        />
        <SakuraPattern />
      </ImageBackground>

      <View style={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
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

            <Text style={styles.heading}>
              Welcome to Your{'\n'}Beauty Journey
            </Text>
            <Text style={styles.subheading}>
              Discover and book premium spa, salon, and wellness services near you.
            </Text>
          </Animated.View>
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
              <Building2 size={18} color="#FFC107" />
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
            <PillLink label="Admin" nav="/Admin/auth/login" router={router} />
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
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  sakuraContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingLeaf: {
    position: "absolute",
    fontSize: 24,
    opacity: 0.6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  heroSection: {
    alignItems: "center",
    paddingTop: 20,
  },
  leftContent: {
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 12,
  },
  logoGradient: {
    width: 70,
    height: 70,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E91E63",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  logoText: {
    fontSize: 36,
    color: "#FFF",
  },
  brandName: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 4,
    marginBottom: 6,
    textShadowColor: "rgba(233, 30, 99, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: 14,
    color: "#FF4081",
    fontWeight: "600",
    marginBottom: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFF",
    lineHeight: 36,
    marginBottom: 12,
    textAlign: "center",
  },
  subheading: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  ctaSection: {
    gap: 12,
    marginVertical: 10,
  },
  primaryBtn: {
    paddingVertical: 16,
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
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 1,
  },
  secondaryBtn: {
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
  },
  vendorBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 193, 7, 0.3)",
  },
  vendorBtnText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFC107",
  },
  quickAccessSection: {
    alignItems: "center",
    paddingBottom: 10,
  },
  quickAccessLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.5)",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  pillsContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  pillText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 11,
  },
});