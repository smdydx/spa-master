import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  bg: "#FFF7FC",
  text: "#111827",
  sub: "#6B7280",
  border: "#E5E7EB",
  primary: "#2563EB",
  accent1: "#9333EA",
  accent2: "#F43F5E",
  demoBg: "#EFF6FF",
  demoBorder: "#DBEAFE",
};

export default function TherapistLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Therapist Portal</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Icon */}
        <View style={styles.iconWrap}>
          <LinearGradient colors={[COLORS.accent1, COLORS.accent2]} style={styles.iconGradient}>
            <Text style={{ fontSize: 32, color: "#FFF" }}>✧</Text>
          </LinearGradient>
        </View>

        {/* Title */}
        <Text style={styles.title}>Therapist Portal</Text>
        <Text style={styles.subtitle}>
          Login to manage your assignments and schedule
        </Text>

        {/* Email */}
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputWrap}>
          <Mail size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrap}>
          <Lock size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity onPress={()=>router.push("/Therapist")} style={styles.primaryBtn} activeOpacity={0.9}>
          <Text style={styles.primaryBtnText}>Login as Therapist</Text>
        </TouchableOpacity>

        {/* Register Link */}
        <Text style={styles.registerText}>
          Don’t have an account?{" "}
          <Text style={styles.registerLink}>
            Contact your vendor to get registered
          </Text>
        </Text>

        {/* Demo Credentials */}
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>Demo Credentials</Text>
          <Text style={styles.demoLine}>
            <Text style={{ fontWeight: "700" }}>Email: </Text>
            priya.sharma@example.com
          </Text>
          <Text style={styles.demoLine}>
            <Text style={{ fontWeight: "700" }}>Password: </Text>
            therapist123
          </Text>
          <Text style={styles.demoNote}>
            * Note: Therapist accounts are created by vendors
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 40,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: COLORS.text },

  iconWrap: { alignItems: "center", marginTop: 16 },
  iconGradient: {
    width: 90,
    height: 90,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.sub,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },

  label: { fontSize: 14, fontWeight: "700", color: COLORS.text, marginTop: 16 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 6,
  },
  input: { flex: 1, fontSize: 15, color: COLORS.text },

  primaryBtn: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  primaryBtnText: { color: "#FFF", fontSize: 16, fontWeight: "700" },

  registerText: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 14,
    color: COLORS.sub,
  },
  registerLink: {
    color: "#9333EA",
    fontWeight: "700",
  },

  demoBox: {
    marginTop: 24,
    backgroundColor: COLORS.demoBg,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.demoBorder,
    padding: 16,
  },
  demoTitle: { fontWeight: "800", fontSize: 16, marginBottom: 6, color: COLORS.text },
  demoLine: { fontSize: 14, color: COLORS.text, marginTop: 2 },
  demoNote: { fontSize: 13, color: "#2563EB", marginTop: 8, fontStyle: "italic" },
});
