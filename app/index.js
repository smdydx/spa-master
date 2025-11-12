
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
  View,
  ScrollView,
  Platform,
  useWindowDimensions,
} from "react-native";

const COLORS = {
  primary: "#016B3A",
  gradientColors: ["#00D98A", "#00B572", "#00965E", "#016B3A"],
  statusBarGradient: ["#00FF87", "#00D98A", "#00B572"],
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
    <View
      style={[
        styles.logoContainer,
        { width: sw(80), height: sw(80), borderRadius: sw(20) },
      ]}
    >
      <View style={[styles.logoGradient, { borderRadius: sw(18) }]}>
        <Sparkles size={sw(36)} color="#016B3A" strokeWidth={2.5} />
      </View>
    </View>
  );
};

const FeatureCard = ({ icon: Icon, title, description, sw, sh }) => (
  <View
    style={[
      styles.featureCard,
      {
        borderRadius: sw(20),
        padding: sw(20),
        width: sw(105),
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
          },
          android: {
            elevation: 4,
          },
        }),
      },
    ]}
  >
    <View
      style={[
        styles.featureIcon,
        {
          width: sw(52),
          height: sw(52),
          borderRadius: sw(16),
        },
      ]}
    >
      <Icon size={sw(26)} color="#016B3A" strokeWidth={2.5} />
    </View>
    <Text
      style={[styles.featureTitle, { fontSize: sw(15), marginTop: sh(14) }]}
    >
      {title}
    </Text>
    <Text
      style={[
        styles.featureDescription,
        { fontSize: sw(11.5), marginTop: sh(6), lineHeight: sh(15) },
      ]}
    >
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
          paddingHorizontal: sw(18),
          paddingVertical: sh(10),
          borderRadius: sw(22),
          marginRight: sw(10),
          marginBottom: sh(10),
        },
      ]}
      onPress={() => router.push(nav)}
      activeOpacity={0.7}
    >
      <Text style={[styles.pillText, { fontSize: sw(13) }]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function WelcomeScreen() {
  const router = useRouter();
  const { sw, sh, width, height } = useScale();

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />

      {/* Header with Gradient matching status bar */}
      <LinearGradient
        colors={COLORS.statusBarGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[
          styles.header,
          {
            paddingBottom: sh(32),
            paddingTop: Platform.OS === "ios" ? sh(50) : sh(40),
            paddingHorizontal: sw(24),
          },
        ]}
      >
        <View style={styles.brandSection}>
          <AppLogo sw={sw} />
          <Text style={[styles.brand, { fontSize: sw(32), marginTop: sh(18) }]}>
            OMBARO
          </Text>
          <Text
            style={[styles.tagline, { fontSize: sw(13), marginTop: sh(6) }]}
          >
            Beauty & Wellness Hub
          </Text>
          <Text
            style={[
              styles.welcomeTitle,
              { fontSize: sw(22), marginTop: sh(20) },
            ]}
          >
            Welcome to Your Beauty Journey
          </Text>
          <Text
            style={[
              styles.welcomeSubtitle,
              { fontSize: sw(14), marginTop: sh(8) },
            ]}
          >
            Premium spa & wellness services
          </Text>
        </View>
      </LinearGradient>

      {/* Content Section */}
      <View
        style={[
          styles.contentSection,
          {
            borderTopLeftRadius: sw(32),
            borderTopRightRadius: sw(32),
            marginTop: -sh(24),
          },
        ]}
      >
        <LinearGradient
          colors={["#E8F5E9", "#F1F8F1", "#FFFFFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[
            styles.contentGradient,
            {
              borderTopLeftRadius: sw(32),
              borderTopRightRadius: sw(32),
            },
          ]}
        />

        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: sw(24),
              paddingTop: sh(32),
              paddingBottom: sh(40),
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Features Grid */}
          <View style={[styles.featuresGrid, { marginBottom: sh(28), gap: sw(12) }]}>
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
          <View style={[styles.buttonContainer, { gap: sh(14) }]}>
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
                    borderRadius: sw(16),
                    paddingVertical: sh(18),
                  },
                ]}
              >
                <Text style={[styles.primaryButtonText, { fontSize: sw(17) }]}>
                  GET STARTED
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.secondaryButton,
                {
                  borderRadius: sw(16),
                  paddingVertical: sh(18),
                  borderWidth: 2,
                },
              ]}
              onPress={() => router.push("/auth/phone-register")}
              activeOpacity={0.7}
            >
              <Text style={[styles.secondaryButtonText, { fontSize: sw(17) }]}>
                Login to Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.partnerButton,
                {
                  borderRadius: sw(16),
                  paddingVertical: sh(16),
                  borderWidth: 1.5,
                },
              ]}
              onPress={() => router.push("/Partner")}
              activeOpacity={0.7}
            >
              <Building2 size={sw(20)} color="#016B3A" strokeWidth={2.5} />
              <Text
                style={[
                  styles.partnerButtonText,
                  { fontSize: sw(15), marginLeft: sw(10) },
                ]}
              >
                Become a Partner
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quick Access Section */}
          <View style={[styles.quickAccessSection, { marginTop: sh(32) }]}>
            <Text
              style={[
                styles.quickAccessTitle,
                { fontSize: sw(14), marginBottom: sh(16) },
              ]}
            >
              QUICK ACCESS
            </Text>
            <View style={styles.pillsContainer}>
              <QuickAccessPill
                label="Employee"
                nav="/Employee/auth/login"
                router={router}
                sw={sw}
                sh={sh}
              />
              <QuickAccessPill
                label="Vendor"
                nav="/Vendor/auth/login"
                router={router}
                sw={sw}
                sh={sh}
              />
              <QuickAccessPill
                label="Therapist"
                nav="/Therapist/auth/login"
                router={router}
                sw={sw}
                sh={sh}
              />
              <QuickAccessPill
                label="Beautician"
                nav="/auth/phone-register"
                router={router}
                sw={sw}
                sh={sh}
              />
              <QuickAccessPill
                label="Admin"
                nav="/Admin/auth/login"
                router={router}
                sw={sw}
                sh={sh}
              />
              <QuickAccessPill
                label="Departments"
                nav="/Department/auth/login"
                router={router}
                sw={sw}
                sh={sh}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
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
  brandSection: {
    alignItems: "center",
    zIndex: 1,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  logoGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  brand: {
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 3,
  },
  tagline: {
    color: "rgba(255, 255, 255, 0.95)",
    fontWeight: "600",
    letterSpacing: 0.8,
  },
  welcomeTitle: {
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 0.3,
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
  scrollContent: {
    flexGrow: 1,
  },
  featuresGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  featureCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8F5E9",
    alignItems: "center",
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
  },
  buttonContainer: {
    width: "100%",
  },
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#016B3A",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    letterSpacing: 1,
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
    borderColor: "#E8F5E9",
  },
  partnerButtonText: {
    color: "#016B3A",
    fontWeight: "700",
  },
  quickAccessSection: {
    width: "100%",
  },
  quickAccessTitle: {
    fontWeight: "800",
    color: "#016B3A",
    letterSpacing: 1.8,
  },
  pillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pill: {
    backgroundColor: "#E8F5E9",
    borderWidth: 1.5,
    borderColor: "rgba(1, 107, 58, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  pillText: {
    color: "#016B3A",
    fontWeight: "700",
  },
});
