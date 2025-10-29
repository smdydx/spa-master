// app/auth/SelectRoleScreen.js
import { useRouter } from "expo-router";
import { Badge, Building, Building2, Calculator, Cpu, Database, DollarSign, Gavel, Headphones, List, Megaphone, Receipt, Scale, ShieldCheck, UserRoundCog, Users, Users2 } from "lucide-react-native";
import { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const COLORS = {
  bg: "#F1F5FF",
  card: "#FFFFFF",
  text: "#0F172A",
  sub: "#475569",
  border: "#E5E7EB",
  primary: "#0F67C6",
  purple: "#7C3AED",
};

const SectionTitle = ({ label }) => (
  <Text style={styles.sectionTitle}>{label}</Text>
);

const IconBox = ({ children, bg }) => (
  <View style={[styles.iconBox, { backgroundColor: bg }]}>{children}</View>
);

const RoleCard = ({ title, subtitle, icon, selected, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onPress}
    style={[
      styles.roleCard,
      selected && { borderColor: "#A78BFA", shadowOpacity: 0.12 },
    ]}
  >
    <IconBox bg="rgba(124,58,237,0.08)">{icon}</IconBox>
    <View style={{ flex: 1 }}>
      <Text style={styles.roleTitle}>{title}</Text>
      <Text style={styles.roleSub} numberOfLines={2}>
        {subtitle}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function SelectRoleScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("fo");

  // Sections + roles (IDs must be unique)
  const sections = useMemo(
    () => [
      {
        label: "Core Departments",
        roles: [
          {
            id: "accounts",
            title: "Accounts Department",
            subtitle: "Financial accounting and bookkeeping",
            icon: <Calculator size={22} color="#16A34A" />,
          },
          {
            id: "marketing",
            title: "Marketing Department",
            subtitle: "Brand promotion and customer acquisition",
            icon: <Megaphone size={22} color="#EC4899" />,
          },
          {
            id: "finance",
            title: "Finance Department",
            subtitle: "Financial planning and analysis",
            icon: <DollarSign size={22} color="#0EA5E9" />,
          },
          {
            id: "hr",
            title: "HR Department",
            subtitle: "Human resources and employee management",
            icon: <Users2 size={22} color="#A855F7" />,
          },
          {
            id: "it",
            title: "IT Department",
            subtitle: "Technology infrastructure and support",
            icon: <Cpu size={22} color="#6366F1" />,
          },
        ],
      },
      {
        label: "Operations",
        roles: [
          {
            id: "care",
            title: "Customer Care",
            subtitle: "Customer support and service",
            icon: <Headphones size={22} color="#10B981" />,
          },
          {
            id: "staff",
            title: "Staff Department",
            subtitle: "Staff management and coordination",
            icon: <Users size={22} color="#FB923C" />,
          },
          {
            id: "fo",
            title: "F.O. Department",
            subtitle: "Front office operations",
            icon: <Badge size={22} color="#F59E0B" />,
          },
        ],
      },
      {
        label: "Data Management",
        roles: [
          {
            id: "vendorlist",
            title: "Vendor List",
            subtitle: "Vendor database management",
            icon: <List size={22} color="#22C55E" />,
          },
          {
            id: "customerdata",
            title: "Customer Data",
            subtitle: "Customer information management",
            icon: <Database size={22} color="#06B6D4" />,
          },
        ],
      },
      {
        label: "Legal & Compliance",
        roles: [
          {
            id: "legal",
            title: "Legal Department",
            subtitle: "Legal affairs and compliance",
            icon: <Scale size={22} color="#F87171" />,
          },
          {
            id: "advocate",
            title: "Advocate",
            subtitle: "Legal representation and advice",
            icon: <Gavel size={22} color="#EF4444" />,
          },
          {
            id: "cacs",
            title: "CA & CS",
            subtitle: "Chartered Accountant & Company Secretary",
            icon: <Receipt size={22} color="#F59E0B" />,
          },
        ],
      },
      {
        label: "Leadership",
        roles: [
          {
            id: "superadmin",
            title: "Command Power — Super Admin",
            subtitle: "Ultimate system control and oversight",
            icon: <ShieldCheck size={22} color="#3B82F6" />,
          },
          {
            id: "directors",
            title: "Directors' Details",
            subtitle: "Board of directors and executive management",
            icon: <UserRoundCog size={22} color="#111827" />,
          },
        ],
      },
      {
        label: "Office Management",
        roles: [
          {
            id: "ho",
            title: "H.O. Details",
            subtitle: "Head office administration",
            icon: <Building2 size={22} color="#22D3EE" />,
          },
          {
            id: "corp",
            title: "Corporate Office Details",
            subtitle: "Corporate office management",
            icon: <Building size={22} color="#64748B" />,
          },
        ],
      },
    ],
    []
  );

  const selectedRole = useMemo(() => {
    for (const s of sections) {
      const found = s.roles.find((r) => r.id === selectedId);
      if (found) return found;
    }
    return null;
  }, [sections, selectedId]);

  const onContinue = () => {
    // Navigate based on role or pass selectedId
    // Example:
    // router.push(`/onboard?role=${selectedId}`)
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => {}}>
          <Text style={{ fontSize: 20 }}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Select Your Role</Text>
          <Text style={styles.headerSub}>Choose your department or position</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {sections.map((sec) => (
          <View key={sec.label} style={{ marginBottom: 18 }}>
            <SectionTitle label={sec.label} />
            {sec.roles.map((r) => (
              <RoleCard
                key={r.id}
                title={r.title}
                subtitle={r.subtitle}
                icon={r.icon}
                selected={selectedId === r.id}
                onPress={() => setSelectedId(r.id)}
              />
            ))}
          </View>
        ))}

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onContinue}
          style={styles.ctaBtn}
        >
          <Text style={styles.ctaText}>
            Continue as {selectedRole ? selectedRole.title : "—"}
          </Text>
        </TouchableOpacity>

        <View style={styles.demoNote}>
          <Text style={styles.demoLine}>
            <Text style={{ color: "#64748B" }}>Demo Mode:</Text>{" "}
            <Text style={{ fontWeight: "700" }}>Password: 1234</Text>{" "}
            <Text style={{ color: "#64748B" }}>for all roles</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const CARD_SHADOW = {
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
    marginTop: 40,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#EEF2FF",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: COLORS.text },
  headerSub: { fontSize: 12, color: COLORS.sub, marginTop: 2 },

  content: { paddingHorizontal: 16, paddingBottom: 90 },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#334155",
    marginBottom: 10,
    marginTop: 8,
  },

  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 10,
    ...CARD_SHADOW,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  roleTitle: { fontSize: 15, fontWeight: "800", color: COLORS.text },
  roleSub: { fontSize: 12.5, color: COLORS.sub, marginTop: 2 },

  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  ctaBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "800" },

  demoNote: {
    marginTop: 10,
    backgroundColor: "#F1F5FF",
    borderColor: "#D8E2FF",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  demoLine: { fontSize: 12.5, color: COLORS.text },
});
