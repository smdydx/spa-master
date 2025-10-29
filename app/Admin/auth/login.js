import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Lock, User } from "lucide-react-native";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminLoginScreen() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Login</Text>
      </View>

      {/* Gradient Icon */}
      <View style={styles.iconWrapper}>
        <LinearGradient
          colors={["#9333EA", "#EC4899"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientIcon}
        >
          <Text style={styles.emoji}>👑</Text>
        </LinearGradient>
      </View>

      {/* Title */}
      <Text style={styles.title}>Admin Portal</Text>
      <Text style={styles.subtitle}>
        Enter your credentials to access the Admin dashboard
      </Text>

      {/* Input Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputBox}>
          <User size={18} color="#9CA3AF" />
          <TextInput
            style={styles.input}
            placeholder="Enter 10-digit mobile number"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
        <View style={styles.inputBox}>
          <Lock size={18} color="#9CA3AF" />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginBtn} activeOpacity={0.9}>
        <Text style={styles.loginBtnText}>Login to Admin Portal</Text>
      </TouchableOpacity>

      {/* Demo Credentials */}
      <View style={styles.demoBox}>
        <Text style={styles.demoTitle}>Demo Credentials</Text>
        <Text style={styles.demoText}>
          <Text style={{ fontWeight: "700" }}>Mobile: </Text>
          Any 10-digit number
        </Text>
        <Text style={styles.demoText}>
          <Text style={{ fontWeight: "700" }}>Password: </Text>1234
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDF4FF", paddingHorizontal: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },

  iconWrapper: { alignItems: "center", marginBottom: 16 },
  gradientIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: { fontSize: 30, color: "#fff" },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginTop: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 28,
  },

  form: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 6 },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    height: 50,
  },
  input: { flex: 1, marginLeft: 8, fontSize: 15, color: "#111827" },

  loginBtn: {
    backgroundColor: "#60A5FA",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  loginBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  demoBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 16,
  },
  demoTitle: { fontSize: 15, fontWeight: "700", color: "#1E3A8A" },
  demoText: { fontSize: 14, color: "#111827", marginTop: 4 },
});
