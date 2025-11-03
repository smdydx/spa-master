import { useNavigation } from "@react-navigation/native";
import {
  AlertCircle,
  BarChart2,
  Briefcase,
  CheckSquare,
  Clock,
  FileText,
  MapPin,
  Plus,
  Settings,
  User,
  UserCheck,
  Users,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Overview() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      {/* QUICK ACTIONS */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickContainer}>
        <QuickAction
          icon={<Plus color="#fff" size={20} />}
          bg="#001f3f"
          title="Onboard New Spa"
          desc="Add a new spa to platform"
        />
        <QuickAction
          icon={<MapPin color="#001f3f" size={20} />}
          title="Manage Spas"
          desc="View and edit existing spas"
        />
        <QuickAction
          icon={<AlertCircle color="#001f3f" size={20} />}
          title="Review Approvals"
          desc="8 items need attention"
        />
        <QuickAction
          icon={<Users color="#001f3f" size={20} />}
          title="Vendor Relations"
          desc="Manage vendor partnerships"
        />
        <QuickAction
          icon={<BarChart2 color="#001f3f" size={20} />}
          title="Analytics"
          desc="View performance metrics"
        />
        <QuickAction
          icon={<Settings color="#001f3f" size={20} />}
          title="System Settings"
          desc="Configure preferences"
          nav={() => navigation.navigate("Employee/QuickAction/systemSetting")}
        />

        <QuickAction
          icon={<User color="#001f3f" size={20} />}
          title="My Profile"
          desc="View and edit profile"
          nav={() => navigation.navigate("Employee/QuickAction/MyProfile")}
        />

        <QuickAction
          icon={<Clock color="#001f3f" size={20} />}
          title="Self Attendance"
          desc="Mark attendance with location"
          nav={() => navigation.navigate("Employee/QuickAction/SelfAttendance")}
        />
        <QuickAction
          icon={<CheckSquare color="#001f3f" size={20} />}
          title="Leave Management"
          desc="Apply for leave or view history"
          nav={() => navigation.navigate("Employee/QuickAction/LeaveManage")}
        />
        <QuickAction
          icon={<Briefcase color="#001f3f" size={20} />}
          title="HR Documents"
          desc="Salary, documents & performance"
          nav={() => navigation.navigate("Employee/QuickAction/HrDocument")}
        />
      </View>

      {/* RECENT ACTIVITY */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityContainer}>
        <ActivityCard
          icon={<Plus color="#22c55e" size={18} />}
          title="Serenity Spa successfully onboarded"
          desc="Added 12 services, verified documentation"
          time="2 hours ago"
        />
        <ActivityCard
          icon={<FileText color="#3b82f6" size={18} />}
          title="Bliss Spa details updated"
          desc="Contact information and operating hours modified"
          time="1 day ago"
        />
        <ActivityCard
          icon={<UserCheck color="#a855f7" size={18} />}
          title="New vendor partnership approved"
          desc="Ayurvedic Wellness Center joined the platform"
          time="3 days ago"
        />
      </View>
    </ScrollView>
  );
}

/* ---- Internal Components ---- */

const QuickAction = ({ icon, title, desc, bg, nav }) => (
  <TouchableOpacity
    onPress={nav}
    style={[styles.quickCard, bg && { backgroundColor: bg, borderColor: bg }]}
    activeOpacity={0.85}
  >
    <View style={styles.quickRow}>
      <View style={[styles.quickIcon, bg && { backgroundColor: "transparent" }]}>
        {icon}
      </View>
      <View>
        <Text style={[styles.quickTitle, bg && { color: "#fff" }]}>{title}</Text>
        <Text style={[styles.quickDesc, bg && { color: "#e0f2fe" }]}>{desc}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ActivityCard = ({ icon, title, desc, time }) => (
  <View style={styles.activityCard}>
    <View style={styles.activityRow}>
      {icon}
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityDesc}>{desc}</Text>
      </View>
    </View>
    <Text style={styles.activityTime}>{time}</Text>
  </View>
);

/* ---- Styles (only those used here) ---- */

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginVertical: 12,
    paddingHorizontal: 16,
    color: "#001f3f",
  },
  quickContainer: { paddingHorizontal: 16 },
  quickCard: {
    borderWidth: 2,
    borderColor: "#e0f2fe",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#fff",
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickRow: { flexDirection: "row", alignItems: "center" },
  quickIcon: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: "#e0f2fe",
  },
  quickTitle: { fontWeight: "700", fontSize: 15, color: "#001f3f" },
  quickDesc: { fontSize: 13, color: "#64748b", marginTop: 2 },

  activityContainer: { paddingHorizontal: 16, marginBottom: 20 },
  activityCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  activityRow: { flexDirection: "row", alignItems: "center" },
  activityTitle: { fontWeight: "700", fontSize: 14, color: "#001f3f" },
  activityDesc: { color: "#64748b", fontSize: 13, marginTop: 2 },
  activityTime: { alignSelf: "flex-end", color: "#94a3b8", fontSize: 12, marginTop: 8 },
});
