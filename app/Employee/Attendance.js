// Attendance.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Coffee,
  User,
  RotateCcw,
} from "lucide-react-native";

const summary = [
  { key: "Present", value: 1, bg: "#dcfce7", color: "#166534", Icon: CheckCircle },
  { key: "Absent", value: 0, bg: "#fee2e2", color: "#991b1b", Icon: XCircle },
  { key: "Late", value: 1, bg: "#fef9c3", color: "#854d0e", Icon: Clock },
  { key: "Half Day", value: 0, bg: "#e0f2fe", color: "#0369a1", Icon: Coffee },
];

const employees = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Senior Therapist",
    time: "9:00 AM - 6:00 PM",
    status: "PRESENT",
    meta: "Check-in: 8:55 AM",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    role: "Massage Therapist",
    time: "10:00 AM - 7:00 PM",
    status: "LATE",
    meta: "Check-in: 10:15 AM\nNote: Traffic delay",
  },
  { id: 3, name: "Anita Desai", role: "Receptionist", time: "8:00 AM - 5:00 PM" },
  { id: 4, name: "Vikram Singh", role: "Spa Manager", time: "9:00 AM - 6:00 PM" },
  { id: 5, name: "Meera Patel", role: "Ayurvedic Specialist", time: "11:00 AM - 8:00 PM" },
];

export default function Attendance() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Tabs are outside; this component renders only content */}

      {/* Section Header */}
      <Text style={styles.heading}>Attendance Tracker</Text>
      <View style={styles.headerSubRow}>
        <Text style={styles.subText}>Mark and track employee attendance</Text>
        <TouchableOpacity style={styles.dateInput}>
          <Text style={styles.dateText}>10/04/2025</Text>
          <Calendar size={16} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.summaryGrid}>
        {summary.map(({ key, value, bg, color, Icon }) => (
          <View key={key} style={[styles.summaryCard, { backgroundColor: "#fff" }]}>
            <View style={[styles.summaryIconWrap, { backgroundColor: bg }]}>
              <Icon size={18} color={color} />
            </View>
            <View>
              <Text style={styles.summaryValue}>{value}</Text>
              <Text style={styles.summaryLabel}>{key}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Employee Attendance List */}
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Employee Attendance</Text>

        {employees.map((emp) => (
          <View key={emp.id} style={styles.empCard}>
            <View style={styles.empRow}>
              <View style={styles.avatar}>
                <User size={18} color="#7c3aed" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.empName}>{emp.name}</Text>
                <Text style={styles.empRole}>{emp.role}</Text>
                <Text style={styles.empTime}>{emp.time}</Text>

                {emp.status && (
                  <View style={styles.statusRow}>
                    <StatusChip status={emp.status} />
                    {emp.meta ? <Text style={styles.metaText}>{emp.meta}</Text> : null}
                  </View>
                )}
              </View>

              <TouchableOpacity style={styles.resetBtn}>
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
            </View>

            {/* Inline quick status actions */}
            {!emp.status && (
              <View style={styles.quickRow}>
                <RoundBtn bg="#dcfce7">
                  <CheckCircle size={16} color="#166534" />
                </RoundBtn>
                <RoundBtn bg="#fef9c3">
                  <Clock size={16} color="#854d0e" />
                </RoundBtn>
                <RoundBtn bg="#fee2e2">
                  <XCircle size={16} color="#991b1b" />
                </RoundBtn>
                <RoundBtn bg="#e0f2fe">
                  <Coffee size={16} color="#0369a1" />
                </RoundBtn>
                <RoundBtn bg="#e5e7eb">
                  <RotateCcw size={16} color="#374151" />
                </RoundBtn>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Notes */}
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Add Notes (Optional)</Text>
        <TextInput
          style={styles.notes}
          placeholder="Add any notes about attendance (e.g., reason for lateness, early departure, etc.)"
          placeholderTextColor="#9ca3af"
          multiline
        />
      </View>
    </ScrollView>
  );
}

/* Helpers */
const StatusChip = ({ status }) => {
  const map = {
    PRESENT: { bg: "#dcfce7", color: "#166534", Icon: CheckCircle },
    LATE: { bg: "#fef9c3", color: "#854d0e", Icon: Clock },
    ABSENT: { bg: "#fee2e2", color: "#991b1b", Icon: XCircle },
    "HALF DAY": { bg: "#e0f2fe", color: "#0369a1", Icon: Coffee },
  };
  const meta = map[status] || map.PRESENT;
  const Ico = meta.Icon;
  return (
    <View style={[styles.chip, { backgroundColor: meta.bg }]}>
      <Ico size={14} color={meta.color} />
      <Text style={[styles.chipText, { color: meta.color }]}>{status}</Text>
    </View>
  );
};

const RoundBtn = ({ children, bg }) => (
  <TouchableOpacity style={[styles.roundBtn, { backgroundColor: bg }]}>
    {children}
  </TouchableOpacity>
);

/* Styles */
const styles = StyleSheet.create({
  container: { backgroundColor: "#f8fafc", padding: 16 },
  heading: { fontSize: 22, fontWeight: "900", color: "#001f3f" },
  headerSubRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  subText: { color: "#64748b", fontSize: 13, flex: 1, paddingRight: 10, fontWeight: "600" },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e0f2fe",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: { fontSize: 14, color: "#001f3f", marginRight: 8, fontWeight: "700" },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  summaryCard: {
    width: "48%",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#e0f2fe",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  summaryValue: { fontSize: 20, fontWeight: "900", color: "#001f3f" },
  summaryLabel: { fontSize: 13, color: "#64748b", fontWeight: "700" },

  block: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginTop: 14,
    borderWidth: 2,
    borderColor: "#e0f2fe",
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blockTitle: { fontSize: 18, fontWeight: "900", color: "#001f3f", marginBottom: 12 },

  empCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  empRow: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#dbeafe",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  empName: { fontWeight: "900", color: "#001f3f", fontSize: 15 },
  empRole: { fontSize: 13, color: "#64748b", fontWeight: "600" },
  empTime: { fontSize: 12, color: "#94a3b8", marginTop: 2 },

  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  chipText: { marginLeft: 4, fontSize: 12, fontWeight: "900" },
  metaText: { fontSize: 12, color: "#64748b", fontWeight: "600" },

  resetBtn: {
    borderWidth: 2,
    borderColor: "#001f3f",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 8,
    alignSelf: "flex-start",
  },
  resetText: { color: "#001f3f", fontWeight: "900", fontSize: 13 },

  quickRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  roundBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  notes: {
    minHeight: 120,
    borderWidth: 2,
    borderColor: "#e0f2fe",
    borderRadius: 14,
    padding: 14,
    textAlignVertical: "top",
    color: "#001f3f",
    fontSize: 14,
    fontWeight: "600",
  },
});
