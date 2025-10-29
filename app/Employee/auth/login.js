import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Lock, User } from "lucide-react-native";
import { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EmployeeLogin() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Employee Portal</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero Section with Gradient */}
        <LinearGradient
          colors={['#a855f7', '#ec4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <View style={styles.iconWrap}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>👨‍💼</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>Welcome Back!</Text>
          <Text style={styles.heroSubtitle}>
            Sign in to access your employee dashboard
          </Text>
        </LinearGradient>

        {/* Form Card */}
        <View style={styles.formCard}>
          {/* Mobile Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.inputWrap}>
              <View style={styles.iconBox}>
                <User size={20} color="#a855f7" />
              </View>
              <TextInput
                placeholder="Enter 10-digit mobile number"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                maxLength={10}
                value={mobile}
                onChangeText={setMobile}
                style={styles.input}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrap}>
              <View style={styles.iconBox}>
                <Lock size={20} color="#a855f7" />
              </View>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={() => router.push("/Employee")}
            style={styles.loginBtn}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#a855f7', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.loginGradient}
            >
              <Text style={styles.loginBtnText}>Login to Dashboard</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Demo Credentials */}
          <View style={styles.demoBox}>
            <View style={styles.demoHeader}>
              <View style={styles.demoBadge}>
                <Text style={styles.demoBadgeText}>Demo Access</Text>
              </View>
            </View>
            <View style={styles.demoRow}>
              <Text style={styles.demoLabel}>Mobile:</Text>
              <Text style={styles.demoValue}>Any 10-digit number</Text>
            </View>
            <View style={styles.demoRow}>
              <Text style={styles.demoLabel}>Password:</Text>
              <Text style={styles.demoValue}>1234</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_SHADOW =
  Platform.OS === 'android'
    ? { elevation: 3 }
    : {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      };

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  // Hero Gradient Section
  heroGradient: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
    alignItems: 'center',
  },
  iconWrap: {
    marginBottom: 20,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: { elevation: 4 },
      default: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      },
    }),
  },
  iconEmoji: {
    fontSize: 42,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  // Form Card
  formCard: {
    marginHorizontal: 20,
    marginTop: -24,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    ...CARD_SHADOW,
  },

  // Input Groups
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#faf5ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    paddingRight: 12,
  },

  // Login Button
  loginBtn: {
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  loginGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },

  // Demo Box
  demoBox: {
    marginTop: 24,
    backgroundColor: '#fdf2f8',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fce7f3',
    padding: 16,
  },
  demoHeader: {
    marginBottom: 12,
  },
  demoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ec4899',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  demoBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  demoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  demoLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9333ea',
    width: 90,
  },
  demoValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },
});
