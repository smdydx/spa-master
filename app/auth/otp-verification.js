import React, { useEffect, useMemo, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, MessageSquare } from "lucide-react-native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

// Utility: mask phone like +91 98****5678 (handles 10-digit Indian numbers or E.164)
function maskPhone(raw) {
  if (!raw) return "";
  const v = String(raw).replace(/\s/g, "");
  if (/^\d{10}$/.test(v)) {
    return `+91 ${v.slice(0, 2)}****${v.slice(-4)}`;
  }
  if (/^\+?\d+$/.test(v) && v.length > 6) {
    return `${v.slice(0, 3)} ${v.slice(3, 5)}****${v.slice(-4)}`;
  }
  return raw;
}

export default function OtpVerificationScreen() {
  const router = useRouter();
  // If using TypeScript, prefer: const { phone } = useLocalSearchParams<{ phone?: string }>();
  const { phone } = useLocalSearchParams();

  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [verifying, setVerifying] = useState(false);

  const inputRef = useRef(null);

  // Countdown
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const isComplete = code.length === OTP_LENGTH;
  const masked = useMemo(() => maskPhone(String(phone ?? "")), [phone]);

  // Keep only digits, trim to length
  const onChangeCode = (t) => {
    const digits = t.replace(/[^\d]/g, "").slice(0, OTP_LENGTH);
    setCode(digits);
  };

  const handleVerify = async () => {
    if (!isComplete || verifying) return;
    try {
      setVerifying(true);
      // TODO: call your API here, e.g.:
      // await api.verifyOtp({ phone, code });
      await new Promise((r) => setTimeout(r, 600)); // demo delay
      router.replace("(tabs)");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (seconds > 0) return;
    // TODO: await api.sendOtp({ phone })
    setSeconds(RESEND_SECONDS);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex1}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={[styles.flex1, styles.hPad]}>
            {/* Top bar */}
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backBtn}
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <ArrowLeft size={22} color="#111827" />
              </TouchableOpacity>
              <Text style={styles.topTitle}>Verify OTP</Text>
            </View>

            {/* App icon tile */}
            <View style={styles.iconWrap}>
              <LinearGradient
                colors={["#FF5C9A", "#7B61FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconGrad}
              >
                <MessageSquare size={40} color="#ffffff" />
              </LinearGradient>
            </View>

            {/* Title & subtitle */}
            <View style={styles.titleWrap}>
              <Text style={styles.title}>Enter Verification Code</Text>
              <Text style={styles.subtitle}>
                We’ve sent a {OTP_LENGTH}-digit code to {masked}
              </Text>
            </View>

            {/* Hidden input that actually handles text */}
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={onChangeCode}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              maxLength={OTP_LENGTH}
              autoFocus
              style={styles.hiddenInput}
            />

            {/* OTP boxes (press anywhere to focus) */}
            <Pressable
              onPress={() => inputRef.current?.focus()}
              style={styles.otpRow}
              accessibilityLabel="Enter OTP code"
            >
              {Array.from({ length: OTP_LENGTH }).map((_, i) => {
                const char = code[i] ?? "";
                const active = i === code.length && code.length < OTP_LENGTH;
                return (
                  <View
                    key={i}
                    style={[
                      styles.otpCell,
                      active && styles.otpCellActiveBorder,
                    ]}
                  >
                    <Text style={styles.otpChar}>{char}</Text>
                  </View>
                );
              })}
            </Pressable>

            {/* Resend timer */}
            <View style={styles.center}>
              <Text style={styles.resendText}>
                Resend OTP in{" "}
                <Text
                  style={[
                    styles.resendLink,
                    { color: seconds > 0 ? "#7C3AED" : "#10B981" },
                  ]}
                  onPress={handleResend}
                >
                  {seconds > 0 ? `${seconds}s` : "Tap to resend"}
                </Text>
              </Text>
            </View>

            {/* Verify button */}
            <Pressable
              onPress={handleVerify}
              disabled={!isComplete || verifying}
              style={styles.verifyBtnWrap}
              accessibilityRole="button"
              accessibilityLabel="Verify and continue"
            >
              <LinearGradient
                colors={
                  isComplete && !verifying
                    ? ["#C084FC", "#7C3AED"]
                    : ["#E5E7EB", "#E5E7EB"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.verifyGrad,
                  { shadowOpacity: isComplete ? 0.25 : 0.08 },
                ]}
              >
                <Text
                  style={[
                    styles.verifyText,
                    !isComplete && { opacity: 0.6 },
                  ]}
                >
                  {verifying ? "Verifying..." : "Verify & Continue"}
                </Text>
              </LinearGradient>
            </Pressable>

            {/* Help text */}
            <View style={styles.center}>
              <Text style={styles.helpText}>
                Didn’t receive the code? Check your SMS or try resending
              </Text>
            </View>

            <View style={{ marginBottom: 24 }} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  safe: { flex: 1, backgroundColor: "#FAF7FD" },
  hPad: { paddingHorizontal: 20 },

  // Top bar
  topBar: { flexDirection: "row", alignItems: "center", paddingTop: 4, paddingBottom: 12 },
  backBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  topTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginRight: 40, // balance the back button width
  },

  // Icon
  iconWrap: { alignItems: "center", marginTop: 24 },
  iconGrad: {
    borderRadius: 20,
    padding: 18,
    shadowColor: "#6b21a8",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 6,
  },

  // Title/subtitle
  titleWrap: { marginTop: 32, alignItems: "center" },
  title: { fontSize: 26, lineHeight: 32, fontWeight: "800", color: "#0B1220" },
  subtitle: { marginTop: 12, textAlign: "center", fontSize: 16, lineHeight: 22, color: "#6B7280" },

  // Hidden input
  hiddenInput: { position: "absolute", opacity: 0, height: 0, width: 0 },

  // OTP row
  otpRow: { marginTop: 32, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 24 },
  otpCell: {
    height: 64,
    width: 64,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#111827",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    borderWidth: 0,
    borderColor: "transparent",
  },
  otpCellActiveBorder: {
    borderWidth: 2,
    borderColor: "#A78BFA", // violet-400
  },
  otpChar: { fontSize: 22, fontWeight: "600", color: "#0B1220" },

  // Resend
  center: { alignItems: "center", marginTop: 16 },
  resendText: { fontSize: 16, color: "#6B7280" },
  resendLink: { fontWeight: "600" },

  // Verify button
  verifyBtnWrap: { marginTop: 32, borderRadius: 24, overflow: "hidden" },
  verifyGrad: {
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#7C3AED",
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  verifyText: { color: "#ffffff", fontSize: 18, fontWeight: "600" },

  // Help
  helpText: { textAlign: "center", fontSize: 15, lineHeight: 22, color: "#6B7280" },
});






// useEffect(() => {
//   if (code.length === OTP_LENGTH && !verifying) {
//     handleVerify();
//   }
// }, [code, verifying]);
