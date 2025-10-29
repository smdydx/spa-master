
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Building2, Clock, MapPin, Star } from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const COLORS = {
  bg: "#FFF",
  subtle: "#FAFAFF",
  title: "#3A39A7",
  text: "#111827",
  subText: "#4B5563",
  cardBg: "#FFFFFF",
  cardBorder: "#F1F5F9",
  pill: "#111827",
  pillText: "#FFFFFF",
  muted: "#6B7280",
  primary1: "#0EA5E9",
  primary2: "#3B82F6",
  accent: "#F59E0B",
};

const AppLogo = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.logoWrap, { transform: [{ scale: scaleAnim }] }]}>
      <LinearGradient
        colors={["#6D28D9", "#9333EA", "#3B82F6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.logoGradient}
      >
        <Animated.Text style={[styles.logoSpark, { transform: [{ rotate }] }]}>✧</Animated.Text>
      </LinearGradient>
    </Animated.View>
  );
};

const FeatureCard = ({ icon, title, subtitle, tint = "#0EA5E9", delay = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={[styles.cardIconWrap, { backgroundColor: `${tint}15` }]}>
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </Animated.View>
  );
};

const PillLink = ({ label, nav, router }) => (
  <TouchableOpacity style={styles.pill} onPress={() => router.push(nav)} activeOpacity={0.7}>
    <Text style={styles.pillText}>{label}</Text>
  </TouchableOpacity>
);

const AnimatedBackground = () => {
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(anim1, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(anim1, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(anim2, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(anim2, {
            toValue: 0,
            duration: 5000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const translateX1 = anim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const translateX2 = anim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });

  return (
    <>
      <Animated.View
        style={[
          styles.bgCircle,
          {
            top: -100,
            right: -50,
            transform: [{ translateX: translateX1 }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bgCircle2,
          {
            bottom: -80,
            left: -40,
            transform: [{ translateX: translateX2 }],
          },
        ]}
      />
    </>
  );
};

const IndianLeafDecor = ({ style }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <Animated.View style={[style, { transform: [{ translateY }] }]}>
      <Text style={styles.leafIcon}>🌿</Text>
    </Animated.View>
  );
};



export default function WelcomeBeautyScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar backgroundColor="#FFE4E8" barStyle="dark-content" hidden={false} animated={true} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Pink Section with Animated Background */}
        <View style={styles.pinkSection}>
          <AnimatedBackground />
          
          {/* Logo + Brand */}
          <Animated.View style={{ alignItems: "center", marginTop: 40, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <AppLogo />
            <Text style={styles.brand}>OMBARO</Text>
            <Text style={styles.tagline}>Beauty & Wellness Hub</Text>
          </Animated.View>

          {/* Headline */}
          <Animated.View style={{ marginTop: 24, opacity: fadeAnim }}>
            <Text style={styles.h1}>Welcome to Your Beauty{`\n`}Journey</Text>
            <Text style={styles.lead}>
              Discover and book premium spa, salon, and wellness services near
              you. Experience luxury at your fingertips.
            </Text>
          </Animated.View>
        </View>

        {/* White Section */}
        <View style={styles.whiteSection}>
          {/* Indian Leaf Decorations */}
          <IndianLeafDecor style={{ position: 'absolute', top: 20, left: 20, opacity: 0.3 }} />
          <IndianLeafDecor style={{ position: 'absolute', top: 60, right: 30, opacity: 0.25 }} />
          <IndianLeafDecor style={{ position: 'absolute', bottom: 100, left: 40, opacity: 0.2 }} />
          <IndianLeafDecor style={{ position: 'absolute', bottom: 150, right: 25, opacity: 0.3 }} />
          {/* Premium Services Header */}
          <View style={styles.servicesHeader}>
            <Text style={styles.servicesTitle}>Premium Services</Text>
            <Text style={styles.servicesSubtitle}>Experience luxury wellness at its finest</Text>
          </View>

          {/* Features - Premium Grid Layout */}
          <View style={styles.featuresGrid}>
            <View style={styles.featureRow}>
              <View style={styles.premiumCard}>
                <LinearGradient
                  colors={["#0EA5E9", "#06B6D4"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.premiumIconGradient}
                >
                  <MapPin size={26} color="#FFF" />
                </LinearGradient>
                <Text style={styles.premiumCardTitle}>Find Nearby</Text>
                <Text style={styles.premiumCardDesc}>Discover premium salons & spas</Text>
              </View>

              <View style={styles.premiumCard}>
                <LinearGradient
                  colors={["#8B5CF6", "#A78BFA"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.premiumIconGradient}
                >
                  <Clock size={26} color="#FFF" />
                </LinearGradient>
                <Text style={styles.premiumCardTitle}>Easy Booking</Text>
                <Text style={styles.premiumCardDesc}>Book in seconds, relax instantly</Text>
              </View>
            </View>

            <View style={styles.featuredCard}>
              <LinearGradient
                colors={["#10B981", "#34D399"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.featuredGradient}
              >
                <View style={styles.featuredContent}>
                  <View style={styles.featuredIconWrap}>
                    <Star size={32} color="#FFF" fill="#FFF" />
                  </View>
                  <View style={styles.featuredText}>
                    <Text style={styles.featuredTitle}>Premium Service</Text>
                    <Text style={styles.featuredDesc}>Verified professionals, guaranteed excellence</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* CTAs - Premium Buttons */}
          <View style={styles.ctaSection}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push('/auth/phone-register')}
            >
              <LinearGradient
                colors={["#EC4899", "#F472B6", "#FB7185"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.primaryBtnNew}
              >
                <Text style={styles.primaryBtnTextNew}>Get Started</Text>
                <View style={styles.btnShine} />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtnNew}
              activeOpacity={0.9}
            >
              <Text style={styles.secondaryBtnTextNew}>Login to Account</Text>
            </TouchableOpacity>

            {/* Vendor Partner - Premium */}
            <TouchableOpacity
              onPress={() => router.push('/Partner')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["#FFFBEB", "#FEF3C7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.vendorBtnNew}
              >
                <View style={styles.vendorIconWrap}>
                  <Building2 size={20} color="#D97706" />
                </View>
                <Text style={styles.vendorBtnTextNew}>Become a Partner</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Quick Access Pills - Refined */}
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
              <PillLink label="Doc" nav="/Doc/auth/login" router={router} />
            </View>
          </View>

          {/* Terms - Elegant */}
          <Text style={styles.termsNew}>
            By continuing, you agree to our{" "}
            <Text style={styles.linkNew}>Terms & Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pinkSection: {
    backgroundColor: "#FFE4E8",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
    flex: 2,
    overflow: "hidden",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  whiteSection: {
    backgroundColor: "#FFFFFF",
    flex: 3,
    paddingBottom: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -30,
  },
  servicesHeader: {
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 24,
  },
  servicesTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#111827",
    letterSpacing: 0.5,
  },
  servicesSubtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
  },
  featuresGrid: {
    paddingHorizontal: 20,
    marginTop: 24,
    gap: 14,
  },
  featureRow: {
    flexDirection: "row",
    gap: 14,
  },
  premiumCard: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  premiumIconGradient: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  premiumCardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginTop: 4,
  },
  premiumCardDesc: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
    fontWeight: "500",
  },
  featuredCard: {
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#10B981",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  featuredGradient: {
    padding: 24,
  },
  featuredContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  featuredIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  featuredText: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 0.5,
  },
  featuredDesc: {
    fontSize: 14,
    color: "#FFF",
    marginTop: 4,
    fontWeight: "500",
    opacity: 0.95,
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginTop: 28,
    gap: 12,
  },
  primaryBtnNew: {
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#EC4899",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    overflow: "hidden",
  },
  primaryBtnTextNew: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },
  btnShine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  secondaryBtnNew: {
    paddingVertical: 18,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  secondaryBtnTextNew: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  vendorBtnNew: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 2,
    borderColor: "#FDE68A",
    shadowColor: "#F59E0B",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  vendorIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
  },
  vendorBtnTextNew: {
    fontSize: 16,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.5,
  },
  quickAccessSection: {
    alignItems: "center",
    marginTop: 28,
    paddingHorizontal: 20,
  },
  quickAccessLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9CA3AF",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  pillsContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  termsNew: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 24,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
    paddingHorizontal: 32,
  },
  linkNew: {
    color: "#EC4899",
    fontWeight: "700",
  },
  bgCircle: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(255, 182, 193, 0.3)",
  },
  bgCircle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 192, 203, 0.25)",
  },
  leafIcon: {
    fontSize: 32,
    transform: [{ rotate: '15deg' }],
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 8,
    paddingTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  navIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  navIconActive: {
    backgroundColor: "#FCE7F3",
  },
  navLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
    marginTop: 2,
  },
  navLabelActive: {
    color: "#EC4899",
    fontWeight: "700",
  },
  logoWrap: {
    width: 96,
    height: 96,
    borderRadius: 28,
    shadowColor: "#6D28D9",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  logoGradient: {
    flex: 1,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  logoSpark: {
    fontSize: 34,
    color: "#FFFFFF",
    marginTop: -4,
  },
  brand: {
    marginTop: 14,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 3,
    color: "#5B21B6",
  },
  tagline: {
    marginTop: 4,
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  h1: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  lead: {
    marginTop: 10,
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
    marginHorizontal: 15,
    textAlign: "center",
    fontWeight: "400",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 18,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  cardIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  primaryBtn: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3B82F6",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  primaryBtnText: { 
    color: "#FFF", 
    fontSize: 18, 
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  secondaryBtn: {
    marginTop: 14,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  secondaryBtnText: { 
    color: "#111827", 
    fontSize: 18, 
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  vendorBtn: {
    marginTop: 14,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#F59E0B",
    backgroundColor: "#FFFBEB",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  vendorBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#B45309",
    letterSpacing: 0.3,
  },

  pillsRow: {
    flexDirection: "row",
    gap: 10,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 22,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  pillText: { 
    color: "#4B5563", 
    fontWeight: "700", 
    fontSize: 12,
    letterSpacing: 0.8,
  },

  terms: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 20,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
  },
  link: { 
    color: "#2563EB", 
    fontWeight: "700",
  },
});
