import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { BarChart2, TrendingUp, Download } from "lucide-react-native";

export default function Report() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Reports & Analytics</Text>
        <TouchableOpacity style={styles.downloadBtn}>
          <Download color="#fff" size={16} />
          <Text style={styles.downloadText}>Export</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Cards */}
      <View style={styles.cardRow}>
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <BarChart2 color="#3b82f6" size={20} />
          </View>
          <View>
            <Text style={styles.value}>₹2.4L</Text>
            <Text style={styles.label}>Monthly Revenue</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <TrendingUp color="#22c55e" size={20} />
          </View>
          <View>
            <Text style={styles.value}>+12%</Text>
            <Text style={styles.label}>Growth Rate</Text>
          </View>
        </View>
      </View>

      {/* Section */}
      <Text style={styles.subheading}>Insights Summary</Text>
      <View style={styles.reportBox}>
        <Text style={styles.reportText}>
          • Spas onboarded this month increased by <Text style={styles.bold}>5</Text>.
        </Text>
        <Text style={styles.reportText}>
          • Active vendors grew by <Text style={styles.bold}>9%</Text>.
        </Text>
        <Text style={styles.reportText}>
          • Average customer satisfaction: <Text style={styles.bold}>4.7★</Text>.
        </Text>
        <Text style={styles.reportText}>
          • Pending approvals reduced from 12 to 8 this week.
        </Text>
      </View>

      {/* Placeholder for future chart */}
      <View style={styles.chartBox}>
        <Text style={styles.chartPlaceholder}>[Charts & Graphs Placeholder]</Text>
      </View>
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
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#001f3f",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  downloadText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
    marginLeft: 6,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    borderRadius: 16,
    padding: 16,
    flex: 0.48,
    borderWidth: 2,
    borderColor: "#93c5fd",
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
  },
  value: {
    fontWeight: "900",
    fontSize: 20,
    color: "#001f3f",
  },
  label: {
    color: "#003366",
    fontSize: 13,
    fontWeight: "700",
  },
  subheading: {
    fontWeight: "900",
    fontSize: 18,
    marginBottom: 12,
    color: "#001f3f",
  },
  reportBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: "#e0f2fe",
    shadowColor: "#001f3f",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportText: {
    fontSize: 14,
    color: "#001f3f",
    marginBottom: 6,
    fontWeight: "600",
  },
  bold: {
    fontWeight: "900",
    color: "#003366",
  },
  chartBox: {
    borderWidth: 2,
    borderColor: "#e0f2fe",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  chartPlaceholder: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "700",
  },
});
