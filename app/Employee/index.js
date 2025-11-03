import { LinearGradient } from "expo-linear-gradient";
import {
  AlertCircle,
  BarChart2,
  Filter,
  MapPin,
  Search,
  Users,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Attendance from "./Attendance";
import Overview from "./Overview";
import PendingApproval from "./pending-approval";
import Report from "./report";
import SpaManagement from "./spa-management";

const { width } = Dimensions.get("window");

export default function EmployeeDashboard() {
  const [selectedTab, setSelectedTab] = useState("Overview");

  // Map tab labels to components
  const tabMap = useMemo(
    () => ({
      Overview: Overview,
      "Spa Management": SpaManagement,
      "Pending Approvals": PendingApproval,
      Report: Report,
      Attendance: Attendance,
    }),
    []
  );

  const CurrentTabComponent = tabMap[selectedTab] ?? Overview;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <StatusBar backgroundColor="#001f3f" barStyle="light-content" hidden={false} animated={true} />

      <LinearGradient
        colors={["#001f3f", "#003366", "#004080"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>Employee Dashboard</Text>
        <Text style={styles.subtitle}>Welcome back, Employee</Text>

        <View style={styles.searchBox}>
          <Search size={18} color="#64748b" />
          <TextInput
            placeholder="Search spas, vendors, or services..."
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterBtn} >
            <Filter color="#fff" size={18} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* STATS CARDS */}
      <View style={styles.statsContainer}>
        <StatCard
          icon={<MapPin color="#001f3f" size={22} />}
          title="Total Spas"
          value="47"
          subText="+5 this month"
          bgColor="#e0f2fe"
        />
        <StatCard
          icon={<Users color="#003366" size={22} />}
          title="Active Vendors"
          value="32"
          subText="+3 this week"
          bgColor="#dbeafe"
        />
        <StatCard
          icon={<AlertCircle color="#004080" size={22} />}
          title="Pending Approvals"
          value="8"
          subText="2 urgent"
          bgColor="#bfdbfe"
        />
        <StatCard
          icon={<BarChart2 color="#001f3f" size={22} />}
          title="Monthly Revenue"
          value="₹2.4L"
          subText="+12% growth"
          bgColor="#93c5fd"
        />
      </View>

      {/* TABS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
      >
        {Object.keys(tabMap).map((label) => {
          const active = selectedTab === label;
          return (
            <TouchableOpacity key={label} onPress={() => setSelectedTab(label)}>
              <Text style={[styles.tab, active && styles.activeTab]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* CONDITIONAL CONTENT */}
      <CurrentTabComponent />
    </ScrollView>
  );
}

// --- COMPONENTS ---
const StatCard = ({ icon, title, value, subText, bgColor }) => (
  <View style={[styles.statCard, { backgroundColor: bgColor || '#f9fafb' }]}>
    <View style={styles.iconCircle}>{icon}</View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statSub}>{subText}</Text>
  </View>
);

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: { color: "#fff", fontSize: 26, fontWeight: "900", letterSpacing: 0.5 },
  subtitle: { color: "rgba(255, 255, 255, 0.85)", marginTop: 6, fontSize: 14 },
  searchBox: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: { flex: 1, marginLeft: 12, color: "#001f3f", fontSize: 15, fontWeight: "600" },
  filterBtn: { 
    backgroundColor: "#001f3f", 
    padding: 8, 
    borderRadius: 10,
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  statCard: {
    width: width / 2 - 24,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: { fontSize: 22, fontWeight: "900", marginTop: 8, color: "#001f3f" },
  statTitle: { color: "#001f3f", fontSize: 13, fontWeight: "700", marginTop: 4 },
  statSub: { color: "#64748b", fontSize: 12, fontWeight: "600", marginTop: 2 },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#e2e8f0",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  tab: { 
    marginRight: 24, 
    paddingVertical: 14, 
    color: "#64748b",
    fontSize: 15,
    fontWeight: "700",
  },
  activeTab: { 
    color: "#001f3f", 
    borderBottomWidth: 3, 
    borderBottomColor: "#001f3f",
  },
});
