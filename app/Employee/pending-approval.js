import { AlertCircle } from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const pendingItems = [
  {
    id: 1,
    title: "Spa Registration",
    subtitle: "Luxury Spa & Wellness • Vendor",
    priority: "High Priority",
    time: "1 day ago",
  },
  {
    id: 2,
    title: "Vendor KYC Verification",
    subtitle: "Lotus Wellness • Vendor",
    priority: "Medium Priority",
    time: "2 days ago",
  },
  {
    id: 3,
    title: "New Spa Request",
    subtitle: "Oceanic Retreat • Vendor",
    priority: "Low Priority",
    time: "3 days ago",
  },
];

export default function PendingApproval() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Pending Approvals</Text>

      {pendingItems.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <AlertCircle color="#f59e0b" size={20} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>

              <View style={styles.bottomRow}>
                <View
                  style={[
                    styles.priorityBadge,
                    item.priority === "High Priority"
                      ? styles.high
                      : item.priority === "Medium Priority"
                      ? styles.medium
                      : styles.low,
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      item.priority === "High Priority"
                        ? styles.highText
                        : item.priority === "Medium Priority"
                        ? styles.mediumText
                        : styles.lowText,
                    ]}
                  >
                    {item.priority}
                  </Text>
                </View>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.reviewBtn}>
              <Text style={styles.reviewText}>Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

/* ---- Styles ---- */
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  heading: {
    fontSize: 22,
    fontWeight: "900",
    color: "#001f3f",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "#e0f2fe",
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 44,
    height: 44,
    backgroundColor: "#dbeafe",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  title: {
    fontWeight: "900",
    fontSize: 16,
    color: "#001f3f",
  },
  subtitle: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 8,
    fontWeight: "600",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  priorityBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  high: {
    backgroundColor: "#fee2e2",
  },
  medium: {
    backgroundColor: "#fef9c3",
  },
  low: {
    backgroundColor: "#dcfce7",
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "900",
  },
  highText: {
    color: "#b91c1c",
  },
  mediumText: {
    color: "#854d0e",
  },
  lowText: {
    color: "#166534",
  },
  timeText: {
    fontSize: 12,
    color: "#94a3b8",
    marginLeft: 10,
    fontWeight: "600",
  },
  reviewBtn: {
    borderWidth: 2,
    borderColor: "#001f3f",
    backgroundColor: "#001f3f",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 10,
  },
  reviewText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 13,
  },
});
