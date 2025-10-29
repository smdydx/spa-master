// ReviewTab.js
import { Star } from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const REVIEWS = [
  {
    id: 1,
    name: "Priya Sharma",
    service: "Swedish Massage",
    rating: 5,
    text:
      "Absolutely amazing experience! Very professional and relaxing.",
    timeAgo: "2 days ago",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    service: "Deep Tissue",
    rating: 4,
    text:
      "Great service, helped with my back pain significantly.",
    timeAgo: "1 week ago",
  },
  {
    id: 3,
    name: "Anita Desai",
    service: "Aromatherapy",
    rating: 5,
    text:
      "Perfect ambiance and very skilled therapist. Highly recommended!",
    timeAgo: "2 weeks ago",
  },
];

export default function ReviewTab() {
  const avg = 4.8;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Customer</Text>
          <Text style={styles.title}>Reviews</Text>
        </View>

        <View style={styles.avgWrap}>
          <Star size={16} color="#f59e0b" fill="#f59e0b" />
          <Text style={styles.avgText}>{avg} Average{"\n"}Rating</Text>
        </View>
      </View>

      {/* Reviews */}
      {REVIEWS.map((r) => (
        <View key={r.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.name}>{r.name}</Text>
            <Stars rating={r.rating} />
          </View>
          <Text style={styles.service}>{r.service}</Text>
          <Text style={styles.body}>{r.text}</Text>
          <Text style={styles.time}>{r.timeAgo}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

/* Small components */
const Stars = ({ rating = 0 }) => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
      {arr.map((i) => (
        <Star
          key={i}
          size={14}
          color="#f59e0b"
          fill={i <= rating ? "#f59e0b" : "transparent"}
        />
      ))}
    </View>
  );
};

/* Styles */
const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 16 },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  title: { fontSize: 20, fontWeight: "800", color: "#0f172a" },
  avgWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  avgText: { fontWeight: "700", color: "#0f172a", textAlign: "right" },

  card: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eef2f7",
    marginTop: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontWeight: "800", color: "#0f172a", fontSize: 15 },
  service: { color: "#6b7280", fontSize: 12, marginTop: 2 },
  body: { color: "#334155", fontSize: 14, lineHeight: 20, marginTop: 10 },
  time: { color: "#94a3b8", fontSize: 12, marginTop: 10 },
});
