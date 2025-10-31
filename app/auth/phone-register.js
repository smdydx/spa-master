// screens/PhoneVerificationScreen.js
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Gift, Phone, Shield } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  bg: "#FEF9F3", // light cream
  text: "#1A1A1A",
  sub: "#6B7280",
  border: "#F3E8DC",
  fieldBg: "#FFFFFF",
  hint: "#a855f7",
  btn: "#a855f7",
  btnText: "#FFF",
  iconPhoneA: "#a855f7",
  iconPhoneB: "#ec4899",
  shield: "#a855f7",
};

const IconField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  maxLength,
}) => (
  <View style={styles.fieldWrap}>
    <View style={styles.fieldIcon}>{icon}</View>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      maxLength={maxLength}
      style={styles.input}
    />
  </View>
);

export default function PhoneVerificationScreen({ navigation }) {
  const [referral, setReferral] = useState("");
  const [mobile, setMobile] = useState("");

  const route = useRouter();

  const isValid = useMemo(() => /^[6-9]\d{9}$/.test(mobile), [mobile]);

  const onSendOtp = () => {
    if (!isValid) return;
    // trigger your OTP API here
    route.push("/auth/otp-verification")
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with gradient */}
          <LinearGradient
            colors={['#a855f7', '#ec4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGrad}
          >
            <View style={styles.headerRow}>
              <TouchableOpacity
                onPress={() => navigation?.goBack?.()}
                style={styles.backBtn}
                activeOpacity={0.8}
              >
                <ArrowLeft size={22} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Phone Verification</Text>
              <View style={{ width: 44 }} />
            </View>

            {/* Location info similar to home */}
            <View style={styles.locRow}>
              <View style={styles.locIconBox}>
                <Shield size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.locLabel}>Secure Verification</Text>
                <Text style={styles.locCity}>Your privacy is protected</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={{ padding: 20 }}>

          {/* Phone badge */}
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <LinearGradient
              colors={[COLORS.iconPhoneA, COLORS.iconPhoneB]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.phoneBadge}
            >
              <Phone size={34} color="#fff" />
            </LinearGradient>
          </View>

          {/* Headline */}
          <View style={{ marginTop: 18 }}>
            <Text style={styles.h1}>Enter Your Mobile Number</Text>
            <Text style={styles.lead}>
              We'll send you a verification code to confirm your number
            </Text>
          </View>

          {/* Referral field */}
          <IconField
            icon={<Gift size={20} color="#9CA3AF" />}
            placeholder="Enter referral code (optional)"
            value={referral}
            onChangeText={setReferral}
          />
          <Text style={styles.hint}>
            Have a referral code? Get 10% off your first booking!
          </Text>

          {/* Mobile field */}
          <IconField
            icon={<Phone size={20} color="#9CA3AF" />}
            placeholder="Enter 10-digit mobile number"
            keyboardType="number-pad"
            value={mobile}
            onChangeText={(t) => setMobile(t.replace(/[^0-9]/g, ""))}
            maxLength={10}
          />

          {/* Send OTP button */}
          <TouchableOpacity
            onPress={onSendOtp}
            activeOpacity={isValid ? 0.9 : 1}
            disabled={!isValid}
          >
            <LinearGradient
              colors={isValid ? ['#a855f7', '#ec4899'] : ['#E5E7EB', '#E5E7EB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryBtn}
            >
              <Text style={styles.primaryBtnText}>Send OTP</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Privacy card */}
          <View style={styles.privacyCard}>
            <View style={styles.privacyIconWrap}>
              <Shield size={22} color={COLORS.shield} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.privacyTitle}>Your Privacy is Protected</Text>
              <Text style={styles.privacyText}>
                We use your mobile number only for account verification and
                booking confirmations. Your data is encrypted and handled with
                strict security.
              </Text>
            </View>
          </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerGrad: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  locRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locIconBox: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  locLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  locCity: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  phoneBadge: {
    width: 96,
    height: 96,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  h1: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },
  lead: {
    marginTop: 8,
    fontSize: 15,
    color: COLORS.sub,
    textAlign: "center",
    lineHeight: 22,
  },

  fieldWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.fieldBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 18,
  },
  fieldIcon: {
    width: 26,
    alignItems: "center",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  hint: {
    marginTop: 8,
    marginLeft: 6,
    fontSize: 13,
    color: COLORS.hint,
  },

  primaryBtn: {
    marginTop: 22,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#a855f7",
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    overflow: 'hidden',
  },
  primaryBtnText: {
    color: COLORS.btnText,
    fontSize: 18,
    fontWeight: "800",
  },

  privacyCard: {
    marginTop: 26,
    backgroundColor: "#faf5ff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ede9fe",
    flexDirection: "row",
    gap: 12,
  },
  privacyIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECFDF5",
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 4,
  },
  privacyText: {
    fontSize: 14,
    color: COLORS.sub,
    lineHeight: 20,
  },
});
