
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
  View,
  ScrollView,
  Platform,
  useWindowDimensions,
} from "react-native";

const COLORS = {
  primary: "#016B3A",
  gradientColors: ["#00FF87", "#016B3A", "#013B1F", "#012B17"],
  accent: "#FFFFFF",
  dark: "#2C2C2C",
  white: "#FFFFFF",
  overlay: "rgba(1, 107, 58, 0.15)",
  cardBg: "#FFFFFF",
  border: "#E2E8F0",
  textMuted: "#64748B",
  successBg: "#E8F5E9",
};

// Responsive scaling helper
function useScale() {
  const { width, height } = useWindowDimensions();
  const baseWidth = 390;
  const baseHeight = 844;

  const scale = Math.min(width / baseWidth, 1.2);
  const verticalScale = Math.min(height / baseHeight, 1.2);

  const sw = (size) => Math.round(size * scale);
  const sh = (size) => Math.round(size * verticalScale);

  return { sw, sh, width, height };
}

const AppLogo = ({ sw }) => {
  return (
    <View style={[styles.logoContainer, { width: sw(70), height: sw(70), borderRadius: sw(18) }]}>
      <LinearGradient
        colors={["#FFFFFF", "#f3f4f6", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.logoGradient, { borderRadius: sw(16) }]}
      >
        <Sparkles size={sw(32)} color="#016B3A" strokeWidth={2.5} />
      </LinearGradient>
    </View>
  );
};

const FeatureCard = ({ icon: Icon, title, description, sw, sh }) => (
  <View
    style={[
      styles.featureCard,
      {
        borderRadius: sw(16),
        padding: sw(16),
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
          },
          android: {
            elevation: 3,
          },
        }),
      },
    ]}
  >
    <View
      style={[
        styles.featureIcon,
        {
          width: sw(48),
          height: sw(48),
          borderRadius: sw(12),
        },
      ]}
    >
      <Icon size={sw(24)} color="#016B3A" strokeWidth={2.5} />
    </View>
    <Text style={[styles.featureTitle, { fontSize: sw(14), marginTop: sh(12) }]}>
      {title}
    </Text>
    <Text style={[styles.featureDescription, { fontSize: sw(11), marginTop: sh(4) }]}>
      {description}
    </Text>
  </View>
);

const QuickAccessPill = ({ label, nav, router, sw, sh }) => {
  return (
    <TouchableOpacity
      style={[
        styles.pill,
        {
          paddingHorizontal: sw(16),
          paddingVertical: sh(8),
          borderRadius: sw(20),
          marginRight: sw(8),
          marginBottom: sh(8),
        },
      ]}
      onPress={() => router.push(nav)}
      activeOpacity={0.7}
    >
      <Text style={[styles.pillText, { fontSize: sw(12) }]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function WelcomeScreen() {
  const router = useRouter();
  const { sw, sh, width, height } = useScale();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#016B3A" barStyle="light-content" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={COLORS.gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[
          styles.header,
          {
            paddingBottom: sh(30),
            paddingTop: Platform.OS === "ios" ? sh(60) : sh(20),
            paddingHorizontal: sw(20),
          },
        ]}
      >
        <View style={styles.decorativeCircles}>
          <View style={[styles.circle, styles.circle1, { width: sw(280), height: sw(280) }]} />
          <View style={[styles.circle, styles.circle2, { width: sw(200), height: sw(200) }]} />
          <View style={[styles.circle, styles.circle3, { width: sw(150), height: sw(150) }]} />
        </View>

        <View style={[styles.brandSection, { marginTop: sh(20) }]}>
          <AppLogo sw={sw} />
          <Text style={[styles.brand, { fontSize: sw(30), marginTop: sh(16) }]}>OMBARO</Text>
          <Text style={[styles.tagline, { fontSize: sw(12), marginTop: sh(4) }]}>
            Beauty & Wellness Hub
          </Text>
          <Text style={[styles.welcomeTitle, { fontSize: sw(20), marginTop: sh(16) }]}>
            Welcome to Your Beauty Journey
          </Text>
          <Text style={[styles.welcomeSubtitle, { fontSize: sw(13), marginTop: sh(6) }]}>
            Premium spa & wellness services
          </Text>
        </View>
      </LinearGradient>

      {/* Content Section with Leaf Pattern */}
      <View
        style={[
          styles.contentSection,
          {
            borderTopLeftRadius: sw(28),
            borderTopRightRadius: sw(28),
            marginTop: -sh(20),
          },
        ]}
      >
        {/* Gradient Background */}
        <LinearGradient
          colors={["#E8F5E9", "#F1F8F1", "#FFFFFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[
            styles.contentGradient,
            {
              borderTopLeftRadius: sw(28),
              borderTopRightRadius: sw(28),
            },
          ]}
        />

        {/* Leaf Pattern Overlay */}
        <View
          style={[
            styles.leafPattern,
            {
              borderTopLeftRadius: sw(28),
              borderTopRightRadius: sw(28),
            },
          ]}
        >
          <Ionicons
            name="leaf"
            size={sw(120)}
            color="rgba(1, 107, 58, 0.03)"
            style={{
              position: "absolute",
              top: sh(20),
              right: sw(-20),
              transform: [{ rotate: "25deg" }],
            }}
          />
          <Ionicons
            name="leaf"
            size={sw(80)}
            color="rgba(1, 107, 58, 0.04)"
            style={{
              position: "absolute",
              top: sh(140),
              left: sw(-10),
              transform: [{ rotate: "-15deg" }],
            }}
          />
          <Ionicons
            name="leaf"
            size={sw(100)}
            color="rgba(1, 107, 58, 0.03)"
            style={{
              position: "absolute",
              top: sh(280),
              right: sw(10),
              transform: [{ rotate: "45deg" }],
            }}
          />
          <Ionicons
            name="leaf"
            size={sw(70)}
            color="rgba(1, 107, 58, 0.05)"
            style={{
              position: "absolute",
              top: sh(400),
              left: sw(20),
              transform: [{ rotate: "-30deg" }],
            }}
          />
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: sw(20),
              paddingTop: sh(30),
              paddingBottom: sh(30),
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Features Grid */}
          <View style={[styles.featuresGrid, { marginBottom: sh(24) }]}>
            <FeatureCard
              icon={MapPin}
              title="Find Nearby"
              description="Discover salons & spas around you"
              sw={sw}
              sh={sh}
            />
            <FeatureCard
              icon={Zap}
              title="Easy Booking"
              description="Book appointments in seconds"
              sw={sw}
              sh={sh}
            />
            <FeatureCard
              icon={Sparkles}
              title="Premium Quality"
              description="Verified professionals"
              sw={sw}
              sh={sh}
            />
          </View>

          {/* Primary Buttons */}
          <View style={[styles.buttonContainer, { marginBottom: sh(16) }]}>
            <TouchableOpacity
              onPress={() => router.push("/auth/phone-register")}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={COLORS.gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.primaryButton,
                  {
                    borderRadius: sw(14),
                    paddingVertical: sh(16),
                  },
                ]}
              >
                <Text style={[styles.primaryButtonText, { fontSize: sw(16) }]}>
                  GET STARTED
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.secondaryButton,
                {
                  borderRadius: sw(14),
                  paddingVertical: sh(16),
                  borderWidth: 2,
                  marginTop: sh(12),
                },
              ]}
              onPress={() => router.push("/auth/phone-register")}
              activeOpacity={0.7}
            >
              <Text style={[styles.secondaryButtonText, { fontSize: sw(16) }]}>
                Login to Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.partnerButton,
                {
                  borderRadius: sw(14),
                  paddingVertical: sh(14),
                  borderWidth: 1.5,
                  marginTop: sh(12),
                },
              ]}
              onPress={() => router.push("/Partner")}
              activeOpacity={0.7}
            >
              <Building2 size={sw(18)} color="#016B3A" strokeWidth={2.5} />
              <Text style={[styles.partnerButtonText, { fontSize: sw(14), marginLeft: sw(8) }]}>
                Become a Partner
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quick Access Section */}
          <View style={[styles.quickAccessSection, { marginTop: sh(24) }]}>
            <Text style={[styles.quickAccessTitle, { fontSize: sw(13), marginBottom: sh(12) }]}>
              QUICK ACCESS
            </Text>
            <View style={styles.pillsContainer}>
              <QuickAccessPill label="Employee" nav="/Employee/auth/login" router={router} sw={sw} sh={sh} />
              <QuickAccessPill label="Vendor" nav="/Vendor/auth/login" router={router} sw={sw} sh={sh} />
              <QuickAccessPill label="Therapist" nav="/Therapist/auth/login" router={router} sw={sw} sh={sh} />
              <QuickAccessPill label="Beautician" nav="/auth/phone-register" router={router} sw={sw} sh={sh} />
              <QuickAccessPill label="Admin" nav="/Admin/auth/login" router={router} sw={sw} sh={sh} />
              <QuickAccessPill label="Departments" nav="/Department/auth/login" router={router} sw={sw} sh={sh} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    position: "relative",
    overflow: "hidden",
  },
  decorativeCircles: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  circle: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  circle1: {
    top: -100,
    right: -80,
  },
  circle2: {
    bottom: -60,
    left: -50,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  circle3: {
    top: "40%",
    left: -40,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  brandSection: {
    alignItems: "center",
    zIndex: 1,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  logoGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 2.5,
  },
  tagline: {
    color: "rgba(255, 255, 255, 0.95)",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  welcomeTitle: {
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  welcomeSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontWeight: "500",
  },
  contentSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
    overflow: "hidden",
  },
  contentGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  leafPattern: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContent: {
    flexGrow: 1,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "31%",
    minWidth: 100,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    marginBottom: 12,
  },
  featureIcon: {
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },
  featureDescription: {
    color: "#64748B",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 16,
  },
  buttonContainer: {
    width: "100%",
  },
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#016B3A",
  },
  secondaryButtonText: {
    color: "#016B3A",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  partnerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
  },
  partnerButtonText: {
    color: "#016B3A",
    fontWeight: "700",
  },
  quickAccessSection: {
    width: "100%",
  },
  quickAccessTitle: {
    fontWeight: "700",
    color: "#016B3A",
    letterSpacing: 1.5,
  },
  pillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pill: {
    backgroundColor: "rgba(1, 107, 58, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(1, 107, 58, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  pillText: {
    color: "#016B3A",
    fontWeight: "700",
  },
});
