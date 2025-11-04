// MyServices.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Package,
  Eye,
  LayoutList,
  Settings,
  Star,
  Plus,
  Edit2,
  Trash2,
  MapPin,
} from "lucide-react-native";

const SERVICES = [
  {
    id: 1,
    name: "Swedish Full Body Massage",
    price: "₹2500",
    duration: "90 min",
    bookings: 45,
    status: "Active",
    rating: 4.9,
    address: "MG Road, Bangalore",
    distance: "0.8km",
    reviews: 324,
  },
  {
    id: 2,
    name: "Deep Tissue Massage",
    price: "₹3200",
    duration: "120 min",
    bookings: 38,
    status: "Active",
    rating: 4.8,
    address: "MG Road, Bangalore",
    distance: "0.8km",
    reviews: 324,
  },
  {
    id: 3,
    name: "Aromatherapy Session",
    price: "₹4500",
    duration: "150 min",
    bookings: 22,
    status: "Active",
    rating: 4.7,
    address: "MG Road, Bangalore",
    distance: "0.8km",
    reviews: 324,
  },
  {
    id: 4,
    name: "Hot Stone Therapy",
    price: "₹2800",
    duration: "100 min",
    bookings: 31,
    status: "Paused",
    rating: 4.6,
    address: "MG Road, Bangalore",
    distance: "0.8km",
    reviews: 324,
  },
  {
    id: 5,
    name: "Couples Massage",
    price: "₹6500",
    duration: "120 min",
    bookings: 18,
    status: "Active",
    rating: 4.9,
    address: "MG Road, Bangalore",
    distance: "0.8km",
    reviews: 324,
  },
];

export default function ServicesTab() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Heading + Add Service */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>My Services</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Plus size={16} color="#fff" />
          <Text style={styles.addText}>Add Service</Text>
        </TouchableOpacity>
      </View>

      {/* Service cards */}
      {SERVICES.map((s) => (
        <View key={s.id} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Package size={18} color="#7c3aed" />
            </View>
            <View style={styles.info}>
              <Text style={styles.serviceName}>{s.name}</Text>
              <View style={styles.locationRow}>
                <MapPin size={12} color="#64748b" />
                <Text style={styles.addressText}>{s.address}</Text>
                <Text style={styles.distanceText}>• {s.distance}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.ratingBox}>
              <Star size={14} color="#f59e0b" fill="#f59e0b" />
              <Text style={styles.ratingText}>{s.rating}</Text>
              <Text style={styles.reviewCount}>({s.reviews})</Text>
            </View>

            <Text style={styles.durationText}>{s.duration}</Text>
          </View>

          <View style={styles.serviceDetail}>
            <Text style={styles.priceText}>{s.price}</Text>
          </View>

          <View style={styles.row}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: s.status === "Active" ? "#dcfce7" : "#fef3c7" },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: s.status === "Active" ? "#15803d" : "#854d0e" },
                ]}
              >
                {s.status}
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.btnIcon}>
                <Edit2 size={14} color="#3b82f6" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnIcon, styles.btnIconGray]}>
                <Trash2 size={14} color="#64748b" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

/* ---- Styles ---- */
const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  heading: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0ea5e9",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  addText: { color: "#fff", fontWeight: "700", marginLeft: 6, fontSize: 13 },

  card: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },
  row: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#efe2ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  info: { flex: 1 },
  serviceName: { fontWeight: "800", fontSize: 14.5, color: "#0f172a" },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  addressText: { fontSize: 12, color: "#64748b", marginLeft: 4 },
  distanceText: { fontSize: 12, color: "#64748b", marginLeft: 4 },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingBox: { flexDirection: "row", alignItems: "center", flex: 1 },
  ratingText: { fontSize: 12, color: "#475569", marginLeft: 4 },
  reviewCount: { fontSize: 12, color: "#94a3b8", marginLeft: 4 },
  durationText: { fontSize: 12, color: "#334155", fontWeight: "500" },
  serviceDetail: { marginTop: 8 },
  priceText: { fontSize: 13, fontWeight: "700", color: "#0f172a" },

  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 10,
  },
  statusText: { fontSize: 11, fontWeight: "700" },

  actions: { flexDirection: "row", marginLeft: 8 },
  btnIcon: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#eff6ff",
    marginLeft: 6,
  },
  btnIconGray: { backgroundColor: "#f1f5f9" },
  btnIconYellow: { backgroundColor: "#fef9c3" },
});