
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Building2 } from "lucide-react-native";
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
  overlay: "rgba(26, 26, 46, 0.75)",
};

const FloatingLeaf = ({ delay = 0, duration = 4000, style }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: 60,
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
            toValue: 30,
            duration: duration / 2,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: -30,
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
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.8,
            duration: duration / 2,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.4,
            duration: duration / 2,
            useNativeDriver: true,
          }),
        ]),
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
          opacity,
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
    <FloatingLeaf style={{ top: height * 0.08, left: 30 }} delay={0} />
    <FloatingLeaf style={{ top: height * 0.2, right: 50 }} delay={500} duration={5000} />
    <FloatingLeaf style={{ top: height * 0.35, left: 70 }} delay={1000} duration={4500} />
    <FloatingLeaf style={{ top: height * 0.5, right: 90 }} delay={1500} />
    <FloatingLeaf style={{ top: height * 0.7, left: 110 }} delay={2000} duration={5500} />
  </View>
);

const AppLogo = () => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

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
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.logoContainer,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }, { rotate }],
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
          toValue: -8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 8,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />

      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/originals/df/6c/98/df6c98f0eb0e4e3e8c0a6e5e3f5e5e5e.jpg' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(26, 26, 46, 0.70)", "rgba(26, 26, 46, 0.65)", "rgba(26, 26, 46, 0.75)"]}
          style={StyleSheet.absoluteFillObject}
        />
        <SakuraPattern />
      </ImageBackground>

      <View style={styles.content}>
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
              Welcome to Your{'\n'}Beauty Journey
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
              <Building2 size={16} color="#FFC107" />
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
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.04,
    paddingBottom: height * 0.02,
    justifyContent: 'space-between',
  },
  heroSection: {
    alignItems: "center",
    paddingTop: height * 0.02,
  },
  leftContent: {
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: height * 0.012,
  },
  logoGradient: {
    width: Math.min(width * 0.18, 70),
    height: Math.min(width * 0.18, 70),
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
    fontSize: Math.min(width * 0.09, 36),
    color: "#FFF",
  },
  brandName: {
    fontSize: Math.min(width * 0.085, 32),
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 4,
    marginBottom: height * 0.008,
    textShadowColor: "rgba(233, 30, 99, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: Math.min(width * 0.035, 14),
    color: "#FF4081",
    fontWeight: "700",
    marginBottom: height * 0.015,
    letterSpacing: 0.8,
  },
  heading: {
    fontSize: Math.min(width * 0.07, 26),
    fontWeight: "900",
    color: "#FFF",
    lineHeight: Math.min(width * 0.085, 32),
    marginBottom: height * 0.012,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subheading: {
    fontSize: Math.min(width * 0.035, 14),
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: Math.min(width * 0.05, 20),
    textAlign: "center",
    paddingHorizontal: width * 0.05,
  },
  ctaSection: {
    gap: height * 0.014,
    marginVertical: height * 0.01,
  },
  primaryBtn: {
    paddingVertical: height * 0.018,
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
    fontSize: Math.min(width * 0.042, 16),
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  secondaryBtn: {
    paddingVertical: height * 0.018,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#FFF",
    fontSize: Math.min(width * 0.04, 15),
    fontWeight: "800",
  },
  vendorBtn: {
    paddingVertical: height * 0.016,
    paddingHorizontal: width * 0.05,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1.5,
    borderColor: "rgba(255, 193, 7, 0.35)",
  },
  vendorBtnText: {
    fontSize: Math.min(width * 0.037, 14),
    fontWeight: "800",
    color: "#FFC107",
  },
  quickAccessSection: {
    alignItems: "center",
    paddingBottom: height * 0.01,
  },
  quickAccessLabel: {
    fontSize: Math.min(width * 0.028, 11),
    fontWeight: "800",
    color: "rgba(255, 255, 255, 0.55)",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: height * 0.01,
  },
  pillsContainer: {
    flexDirection: "row",
    gap: width * 0.022,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  pill: {
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  pillText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: Math.min(width * 0.028, 11),
    letterSpacing: 0.4,
  },
});
