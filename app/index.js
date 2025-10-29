
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Building2, MapPin, Zap, Sparkles } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
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

const CherryBlossomPetal = ({ delay, startX, endX }) => {
  const translateY = useRef(new Animated.Value(-50)).current;
  const translateX = useRef(new Animated.Value(startX)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: height + 50,
            duration: 8000 + Math.random() * 4000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(translateX, {
            toValue: endX,
            duration: 8000 + Math.random() * 4000,
            useNativeDriver: true,
          }),
        ]),
        Animated.loop(
          Animated.timing(rotate, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          })
        ),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.petal,
        {
          opacity,
          transform: [
            { translateX },
            { translateY },
            { rotate: rotateInterpolate },
          ],
        },
      ]}
    >
      <Text style={styles.petalText}>🌸</Text>
    </Animated.View>
  );
};

const AtmosphericLight = () => {
  const petals = Array.from({ length: 15 }, (_, i) => ({
    key: i,
    delay: i * 800,
    startX: Math.random() * width,
    endX: Math.random() * width,
  }));

  return (
    <View style={styles.atmosphericContainer}>
      {petals.map((petal) => (
        <CherryBlossomPetal
          key={petal.key}
          delay={petal.delay}
          startX={petal.startX}
          endX={petal.endX}
        />
      ))}
    </View>
  );
};

const AppLogo = () => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1200,
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
        colors={["#C8B6A6", "#D4A59A", "#F3EDE6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.logoGradient}
      >
        <Text style={styles.logoText}>✧</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const PillLink = ({ label, nav, router, index }) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: opacityAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        style={styles.pill}
        onPress={() => router.push(nav)}
        activeOpacity={0.7}
      >
        <Text style={styles.pillText}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonScale = useRef(new Animated.Value(0.9)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        delay: 800,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />

      {/* Background with optimized image loading */}
      <View style={styles.backgroundContainer}>
        {!imageLoaded && (
          <LinearGradient
            colors={["#C8B6A6", "#D4A59A", "#F3EDE6"]}
            style={StyleSheet.absoluteFillObject}
          />
        )}
        <Image
          source={require('../assets/images/japanese-girl-bg.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
          onLoad={() => setImageLoaded(true)}
          fadeDuration={300}
        />
        <LinearGradient
          colors={["rgba(44, 44, 44, 0.25)", "rgba(44, 44, 44, 0.20)", "rgba(44, 44, 44, 0.30)"]}
          style={StyleSheet.absoluteFillObject}
        />
        <AtmosphericLight />
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
          <Animated.View
            style={[
              styles.topContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <AppLogo />
            <Animated.Text
              style={[
                styles.brandName,
                {
                  transform: [{ translateY: floatAnim }],
                },
              ]}
            >
              OMBARO
            </Animated.Text>
            <Animated.Text
              style={[
                styles.tagline,
                {
                  transform: [{ translateY: floatAnim }],
                },
              ]}
            >
              Beauty & Wellness Hub
            </Animated.Text>

            <Animated.Text
              style={[
                styles.heading,
                {
                  transform: [{ translateY: floatAnim }],
                },
              ]}
            >
              Welcome to Your Beauty Journey
            </Animated.Text>
            <Animated.Text
              style={[
                styles.subheading,
                {
                  transform: [{ translateY: floatAnim }],
                },
              ]}
            >
              Premium spa & wellness services
            </Animated.Text>
          </Animated.View>
        </View>

        {/* Bottom Section (3 parts) */}
        <View style={styles.bottomSection}>
          {/* Features Section */}
          <Animated.View
            style={[
              styles.featuresSection,
              {
                opacity: fadeAnim,
              },
            ]}
          >
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
          </Animated.View>

          <Animated.View
            style={[
              styles.ctaSection,
              {
                opacity: fadeAnim,
                transform: [{ scale: buttonScale }],
              },
            ]}
          >
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
          </Animated.View>

          <Animated.View
            style={[
              styles.quickAccessSection,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.quickAccessLabel}>Quick Access</Text>
            <View style={styles.pillsContainer}>
              <PillLink label="Employee" nav="/Employee/auth/login" router={router} index={0} />
              <PillLink label="Vendor" nav="/Vendor/auth/login" router={router} index={1} />
              <PillLink label="Therapist" nav="/Therapist/auth/login" router={router} index={2} />
              <PillLink label="Beautician" nav="/Therapist/auth/login" router={router} index={3} />
              <PillLink label="Admin" nav="/Admin/auth/login" router={router} index={4} />
              <PillLink label="Departments" nav="/Department/auth/login" router={router} index={5} />
            </View>
          </Animated.View>
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
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  decorativeCircles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
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
    right: -width * 0.2,
  },
  circle2: {
    width: width * 0.5,
    height: width * 0.5,
    top: height * 0.1,
    left: -width * 0.15,
    backgroundColor: 'rgba(212, 165, 154, 0.12)',
  },
  circle3: {
    width: width * 0.4,
    height: width * 0.4,
    bottom: height * 0.35,
    left: width * 0.05,
    backgroundColor: 'rgba(243, 237, 230, 0.1)',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  atmosphericContainer: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  petal: {
    position: 'absolute',
    top: -50,
  },
  petalText: {
    fontSize: 20,
    opacity: 0.8,
  },
  splitContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  topSection: {
    flex: 2,
    backgroundColor: 'rgba(255, 245, 235, 0.95)',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
    paddingBottom: height * 0.05,
    overflow: 'hidden',
  },
  bottomSection: {
    flex: 3,
    backgroundColor: 'rgba(30, 30, 30, 0.92)',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.04,
    paddingBottom: height * 0.03,
    justifyContent: 'space-between',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -30,
  },
  topContent: {
    alignItems: "center",
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
