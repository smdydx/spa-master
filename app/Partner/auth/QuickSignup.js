// src/screens/QuickSignupScreen.js
import { useNavigation } from "@react-navigation/native";
import { memo } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const COLORS = {
  bg: "#FFF7E9",           // soft warm background
  cardBg: "#FFFFFF",
  text: "#111827",
  textMuted: "#6B7280",
  border: "rgba(2,6,23,0.08)",
  divider: "rgba(2,6,23,0.06)",
  primary: "#0EA5E9",
  primaryDark: "#2563EB",
  link: "#EA580C",
  noteBg: "#EEF5FF",
  noteText: "#1E3A8A",
  google: "#EA4335",
  fb: "#1877F2",
  ig: "#E1306C",
  success: "#10B981",
};

function useScale() {
  const { width } = useWindowDimensions();
  const base = Math.min(Math.max(width, 320), 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw };
}

const OutlineButton = memo(function OutlineButton({
  icon,
  label,
  color = COLORS.primaryDark,
  onPress,
  sw,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.outlineBtn,
        {
          paddingVertical: sw(14),
          borderRadius: sw(12),
          borderColor: color,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: sw(8) }}>
        <Text style={{ fontSize: sw(18) }}>{icon}</Text>
        <Text style={{ color, fontWeight: "800", fontSize: sw(16) }}>{label}</Text>
      </View>
    </Pressable>
  );
});

const Step = memo(function Step({ n, title, subtitle, sw }) {
  return (
    <View style={{ flexDirection: "row", gap: sw(10), marginBottom: sw(12), alignItems: "flex-start" }}>
      <View
        style={{
          width: sw(26),
          height: sw(26),
          borderRadius: sw(13),
          backgroundColor: "#FFF1B2",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "800", color: "#A16207", fontSize: sw(14) }}>{n}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: COLORS.text, fontSize: sw(15), fontWeight: "700" }}>{title}</Text>
        {subtitle ? (
          <Text style={{ color: COLORS.textMuted, marginTop: sw(2), fontSize: sw(13) }}>{subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
});

export default function QuickSignup({
  onGoogle,
  onFacebook,
  onInstagram,
  onDetailed,  
}) {
  const { sw } = useScale();
  
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{  paddingBottom: sw(44),paddingTop:30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Card container */}
        <View
          style={[
            styles.card,
            shadowStyle,
            { borderRadius: sw(18), padding: sw(16), borderColor: COLORS.border },
          ]}
        >
          {/* Header */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(10) }}>
            <Pressable
              onPress={()=>navigation.goBack()}
              hitSlop={12}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1, marginRight: sw(8) }]}
            >
              <Text style={{ color: COLORS.textMuted, fontSize: sw(16) }}>← Back</Text>
            </Pressable>
            <Text style={{ color: COLORS.text, fontWeight: "800", fontSize: sw(18) }}>Quick Signup</Text>
          </View>

          {/* Big icon + title */}
          <View style={{ alignItems: "center", marginTop: sw(4), marginBottom: sw(10) }}>
            <View
              style={{
                width: sw(64),
                height: sw(64),
                borderRadius: sw(16),
                backgroundColor: "#FDE68A",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: sw(28) }}>✉️</Text>
            </View>
            <Text style={{ color: COLORS.text, fontSize: sw(20), fontWeight: "900", marginTop: sw(12), textAlign: "center" }}>
              Sign up with Social{"\n"}Media
            </Text>
            <Text style={{ color: COLORS.textMuted, fontSize: sw(14), textAlign: "center", marginTop: sw(6) }}>
              Choose your preferred social media{"\n"}account to get started instantly
            </Text>
          </View>

          {/* Social buttons */}
          <OutlineButton
            icon="🟠" // swap with your SVG/icon as needed
            label="Continue with Google"
            color={COLORS.primaryDark}
            onPress={onGoogle}
            sw={sw}
          />
          <View style={{ height: sw(12) }} />

          <OutlineButton
            icon="📘"
            label="Continue with Facebook"
            color={COLORS.primaryDark}
            onPress={onFacebook}
            sw={sw}
          />
          <View style={{ height: sw(12) }} />

          <OutlineButton
            icon="📸"
            label="Continue with Instagram"
            color={COLORS.primaryDark}
            onPress={onInstagram}
            sw={sw}
          />

          {/* Divider with label */}
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: sw(16) }}>
            <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: COLORS.divider }} />
            <Text style={{ marginHorizontal: sw(10), color: COLORS.textMuted, fontWeight: "700", fontSize: sw(13) }}>
              What happens next?
            </Text>
            <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: COLORS.divider }} />
          </View>

          {/* Steps */}
          <Step
            n="1"
            title="Authorize with Social Account"
            subtitle="We'll get your name and email automatically"
            sw={sw}
          />
          <Step n="2" title="Add Mobile Number" subtitle="Enter your mobile for OTP verification" sw={sw} />
          <Step n="3" title="Verify OTP" subtitle="Enter the 4-digit code sent to your mobile" sw={sw} />
          <View style={{ flexDirection: "row", gap: sw(10), alignItems: "center", marginBottom: sw(12) }}>
            <Text style={{ color: COLORS.success, fontSize: sw(16) }}>✓</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: COLORS.text, fontWeight: "800", fontSize: sw(15) }}>You're All Set!</Text>
              <Text style={{ color: COLORS.textMuted, fontSize: sw(13), marginTop: sw(2) }}>
                Access your vendor dashboard immediately
              </Text>
            </View>
          </View>

          {/* Privacy note */}
          <View
            style={{
              backgroundColor: COLORS.noteBg,
              borderRadius: sw(12),
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "rgba(59, 92, 204, 0.25)",
              padding: sw(12),
              marginTop: sw(6),
            }}
          >
            <Text style={{ color: COLORS.noteText, fontSize: sw(13), lineHeight: sw(18) }}>
              <Text style={{ fontWeight: "900" }}>Privacy Note:</Text> We only access your name and
              email. Your social media credentials are never stored by us.
            </Text>
          </View>

          {/* Link to detailed signup */}
          <Pressable
            onPress={onDetailed}
            hitSlop={8}
            style={({ pressed }) => [{ alignItems: "center", marginTop: sw(18), opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={{ color: COLORS.link, fontWeight: "800", fontSize: sw(14) }}>
              Prefer detailed signup? Click here
            </Text>
          </Pressable>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}

const shadowStyle =
  Platform.OS === "ios"
    ? { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } }
    : { elevation: 2 };

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderWidth: StyleSheet.hairlineWidth,
  },
  outlineBtn: {
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
});
