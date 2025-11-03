import { Edit, Eye, MapPin, Plus, Star, Trash2 } from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const spas = [
  {
    id: 1,
    name: "Serenity Wellness Spa",
    location: "Koramangala",
    onboardedBy: "You",
    status: "Active",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Bliss Beauty Center",
    location: "Indiranagar",
    onboardedBy: "Rahul K.",
    status: "Pending",
  },
  {
    id: 3,
    name: "Ayurvedic Healing",
    location: "Whitefield",
    onboardedBy: "You",
    status: "Active",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Urban Spa Lounge",
    location: "MG Road",
    onboardedBy: "Priya S.",
    status: "Review",
  },
];

export default function SpaManagement() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Spa Management</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Plus color="#fff" size={18} />
          <Text style={styles.addText}>Add New Spa</Text>
        </TouchableOpacity>
      </View>

      {/* Spa List */}
      {spas.map((spa) => (
        <View key={spa.id} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <MapPin color="#a855f7" size={22} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.spaName}>{spa.name}</Text>
              <Text style={styles.location}>
                {spa.location} • Onboarded by {spa.onboardedBy}
              </Text>

              {/* Status & Rating */}
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusBadge,
                    spa.status === "Active"
                      ? styles.active
                      : spa.status === "Pending"
                      ? styles.pending
                      : styles.review,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      spa.status === "Active"
                        ? styles.activeText
                        : spa.status === "Pending"
                        ? styles.pendingText
                        : styles.reviewText,
                    ]}
                  >
                    {spa.status}
                  </Text>
                </View>

                {spa.rating && (
                  <View style={styles.ratingRow}>
                    <Star color="#fbbf24" size={14} fill="#fbbf24" />
                    <Text style={styles.ratingText}>{spa.rating}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionBtns}>
              <TouchableOpacity style={styles.eyeBtn}>
                <Eye color="#3b82f6" size={16} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.editBtn}>
                <Edit color="#64748b" size={16} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn}>
                <Trash2 color="#ef4444" size={16} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "900",
    color: "#001f3f",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#001f3f",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "900",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "#e0f2fe",
    shadowColor: "#001f3f",
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
  spaName: {
    fontWeight: "900",
    fontSize: 16,
    color: "#001f3f",
  },
  location: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
    marginTop: 2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  active: {
    backgroundColor: "#dcfce7",
  },
  pending: {
    backgroundColor: "#fef9c3",
  },
  review: {
    backgroundColor: "#e0f2fe",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "900",
  },
  activeText: {
    color: "#166534",
  },
  pendingText: {
    color: "#854d0e",
  },
  reviewText: {
    color: "#0369a1",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  ratingText: {
    fontSize: 13,
    color: "#001f3f",
    marginLeft: 4,
    fontWeight: "700",
  },
  actionBtns: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  eyeBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#dbeafe",
    marginHorizontal: 3,
  },
  editBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#e0f2fe",
    marginHorizontal: 3,
  },
  deleteBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#fee2e2",
    marginHorizontal: 3,
  },
});
