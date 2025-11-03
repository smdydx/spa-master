import { useNavigation } from "@react-navigation/native";
import { memo, useCallback, useState } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";

const COLORS = {
  bg: "#F8FAFC",
  cardBg: "#FFFFFF",
  border: "#E0F2FE",
  text: "#001f3f",
  textMuted: "#64748B",
  iconBg1: "#DBEAFE",
  iconBg2: "#E0F2FE",
  tagFast: "#001f3f",
  tagRec: "#001f3f",
  noteBg: "#E0F2FE",
  noteText: "#001f3f",
  check: "#001f3f",
  divider: "#E2E8F0",
};

function useScale() {
  const { width } = useWindowDimensions();
  const base = Math.min(Math.max(width, 320), 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw };
}

const CheckItem = memo(({ text, sw }) => (
  <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: sw(6) }}>
    <Text style={{ color: COLORS.check, marginRight: sw(6), fontSize: sw(14) }}>✓</Text>
    <Text style={{ color: COLORS.text, fontSize: sw(14), flex: 1 }}>{text}</Text>
  </View>
));

const MethodCard = memo(({ variant, title, subtitle, points, tag, onPress, selected, sw }) => {
  const isSelected = selected === variant;
  const color = variant === "quick" ? COLORS.iconBg1 : COLORS.iconBg2;
  const tagBg = variant === "quick" ? COLORS.tagFast : COLORS.tagRec;
  const tagLabel = variant === "quick" ? "FASTEST" : "RECOMMENDED";

  return (
    <Pressable
      onPress={() => onPress(variant)}
      style={({ pressed }) => [
        styles.card,
        {
          borderColor: isSelected ? tagBg : COLORS.border,
          backgroundColor: COLORS.cardBg,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        shadowStyle,
      ]}
    >
      <View style={styles.rowBetween}>
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: color, width: sw(48), height: sw(48), borderRadius: sw(12) },
          ]}
        >
          <Text style={{ fontSize: sw(22) }}>{variant === "quick" ? "⚡" : "📄"}</Text>
        </View>
        <View
          style={{
            backgroundColor: tagBg,
            paddingHorizontal: sw(10),
            paddingVertical: sw(4),
            borderRadius: sw(10),
          }}
        >
          <Text style={{ color: "#fff", fontSize: sw(11), fontWeight: "700" }}>{tagLabel}</Text>
        </View>
      </View>

      <Text style={[styles.title, { fontSize: sw(16) }]}>{title}</Text>
      <Text style={[styles.subtitle, { fontSize: sw(13), marginBottom: sw(10) }]}>{subtitle}</Text>

      {points.map((p, i) => (
        <CheckItem key={i} text={p} sw={sw} />
      ))}

      <View style={{ height: sw(12) }} />
      <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: COLORS.divider }} />

      {variant === "quick" ? (
        <Text style={{ color: COLORS.textMuted, fontSize: sw(13), marginTop: sw(8) }}>🔗 Social Login</Text>
      ) : (
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: "#EFF6FF",
            borderRadius: sw(8),
            marginTop: sw(8),
            paddingHorizontal: sw(10),
            paddingVertical: sw(4),
          }}
        >
          <Text style={{ color: COLORS.tagRec, fontSize: sw(12), fontWeight: "600" }}>Takes 5-10 minutes</Text>
        </View>
      )}
    </Pressable>
  );
});

export default function SignupMethod({ onBack }) {
  const navigation = useNavigation()
  const { sw } = useScale();
  const [selected, setSelected] = useState(null);

  const handleSelect = useCallback((variant) => setSelected(variant), []);

  const onContinue = ()=>{
    navigation.navigate("Partner/auth/QuickSignup")
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80,paddingTop:40,marginHorizontal:15 }}
                showsVerticalScrollIndicator={false}>
        {/* header */}
        <View style={[styles.rowBetween, { marginBottom: sw(10) }]}>
          <Pressable
            onPress={()=>navigation.goBack()}
            hitSlop={12}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <Text style={{ color: COLORS.textMuted, fontSize: sw(16) }}>← Back</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { fontSize: sw(18) }]}>Choose Signup{"\n"}Method</Text>
        </View>

        {/* question */}
        <View style={{ marginBottom: sw(14) }}>
          <Text style={[styles.sectionTitle, { fontSize: sw(20), marginBottom: sw(6) }]}>
            How would you like to sign up?
          </Text>
          <Text style={[styles.sectionSub, { fontSize: sw(13) }]}>
            Choose the signup method that works best for you
          </Text>
        </View>

        {/* method cards */}
        <MethodCard
          variant="quick"
          title="Quick Signup"
          subtitle="Get started in under 2 minutes using your social media account"
          points={[
            "Sign up with Google, Facebook, or Instagram",
            "Verify mobile number with OTP",
            "Start receiving bookings immediately",
            "Complete profile details later",
          ]}
          selected={selected}
          onPress={handleSelect}
          sw={sw}
        />

        <View style={{ height: sw(16) }} />

        <MethodCard
          variant="detailed"
          title="Detailed Signup"
          subtitle="Complete your business profile with all details for faster approval"
          points={[
            "Provide complete business information",
            "Add GST, PAN, and business details",
            "Choose partnership type",
            "Faster approval process",
          ]}
          selected={selected}
          onPress={handleSelect}
          sw={sw}
        />

        {/* note */}
        <View
          style={{
            backgroundColor: COLORS.noteBg,
            borderRadius: sw(10),
            marginTop: sw(18),
            padding: sw(12),
          }}
        >
          <Text style={{ color: COLORS.noteText, fontSize: sw(13), lineHeight: sw(18) }}>
            <Text style={{ fontWeight: "700" }}>Note:</Text> Quick signup vendors can complete their
            detailed profile anytime from the dashboard. Both methods lead to the same vendor portal
            access.
          </Text>
        </View>

        {/* continue btn */}
        <Pressable
          onPress={() => selected && onContinue && onContinue(selected)}
          disabled={!selected}
          style={({ pressed }) => [
            styles.cta,
            {
              backgroundColor: selected ? COLORS.tagRec : "#94A3B8",
              opacity: pressed ? 0.9 : 1,
              borderRadius: sw(14),
              paddingVertical: sw(16),
              marginTop: sw(20),
            },
            shadowStyle,
          ]}
        >
          <Text style={[styles.ctaText, { fontSize: sw(16), fontWeight: "900" }]}>
            {selected ? "Continue" : "Select a method to continue"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const shadowStyle =
  Platform.OS === "ios"
    ? { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } }
    : { elevation: 2 };

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  iconWrap: { alignItems: "center", justifyContent: "center" },
  card: {
    width: "100%",
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: { color: COLORS.text, fontWeight: "900", lineHeight: 24, textAlign: "right" },
  sectionTitle: { color: COLORS.text, fontWeight: "900" },
  sectionSub: { color: COLORS.textMuted, fontWeight: "600" },
  title: { color: COLORS.text, fontWeight: "900", marginTop: 8 },
  subtitle: { color: COLORS.textMuted, fontWeight: "600" },
  cta: { alignItems: "center", justifyContent: "center" },
  ctaText: { color: "#FFFFFF", fontWeight: "900" },
});
