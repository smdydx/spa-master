// src/screens/BusinessCategoryScreen.js
import { router } from "expo-router";
import { memo, useCallback, useMemo, useState } from "react";
import {
    FlatList,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

// --- palette (Navy Blue + White Theme) ----------------------------------------------------
const COLORS = {
    bg: "#F8FAFC",                  // light background
    cardBg: "#FFFFFF",
    text: "#001f3f",                // navy blue
    textMuted: "#64748B",
    primary: "#001f3f",             // navy blue
    primaryDark: "#001428",
    border: "#E0F2FE",
    noteBg: "#E0F2FE",
    noteText: "#001f3f",
    ctaText: "#001f3f",
    iconBg: "#DBEAFE",
};

// --- responsive helpers -----------------------------------------
function useScale() {
    const { width } = useWindowDimensions();
    // design base ~ 360-390 width; clamp for tablets
    const base = Math.min(Math.max(width, 320), 480);
    const sw = (n) => Math.round((base / 390) * n);
    return { sw };
}

// --- data --------------------------------------------------------
const CATEGORIES = [
    { id: "spa", title: "Spa & Massage", subtitle: "Full-service spa with massage therapy", icon: "✨" },
    { id: "salon", title: "Beauty Salon", subtitle: "Hair, makeup, and beauty services", icon: "✂️" },
    { id: "wellness", title: "Wellness Center", subtitle: "Holistic wellness and therapy center", icon: "🤍" },
    { id: "home", title: "Home Service", subtitle: "Mobile spa and salon services", icon: "🏠" },
    { id: "hotel", title: "Hotel Spa", subtitle: "Luxury hotel spa facilities", icon: "🏨" },
    { id: "gym", title: "Gym & Fitness", subtitle: "Fitness center with wellness services", icon: "🏋️" },
    { id: "yoga", title: "Yoga & Meditation", subtitle: "Yoga studio and meditation center", icon: "🧘" },
    { id: "ayurveda", title: "Ayurveda Center", subtitle: "Traditional Ayurvedic treatments", icon: "🌿" },
];

// --- item row (memo) --------------------------------------------
const CategoryItem = memo(function CategoryItem({ item, selected, onPress, sw }) {
    const isSelected = selected?.id === item.id;
    return (
        <Pressable
            onPress={() => onPress(item)}
            style={({ pressed }) => [
                styles.row,
                {
                    borderColor: isSelected ? COLORS.primary : COLORS.border,
                    backgroundColor: COLORS.cardBg,
                    transform: [{ scale: pressed ? 0.99 : 1 }],
                },
                shadowStyle,
            ]}
        >
            <View style={[styles.iconWrap, { width: sw(48), height: sw(48), borderRadius: sw(12) }]}>
                <Text style={{ fontSize: sw(22) }}>{item.icon}</Text>
            </View>

            <View style={styles.rowText}>
                <Text numberOfLines={1} style={[styles.title, { fontSize: sw(16) }]}>{item.title}</Text>
                <Text numberOfLines={2} style={[styles.subtitle, { fontSize: sw(13) }]}>{item.subtitle}</Text>
            </View>

            {/* radio indicator */}
            <View
                style={[
                    styles.radio,
                    {
                        width: sw(20),
                        height: sw(20),
                        borderRadius: sw(12),
                        borderColor: isSelected ? COLORS.primary : "rgba(2,6,23,0.25)",
                        backgroundColor: isSelected ? COLORS.primary : "transparent",
                    },
                ]}
            />
        </Pressable>
    );
});

// --- main screen ------------------------------------------------
export default function index({
    onBack,
    onContinue,
    initialSelectedId = null,
}) {
    const { sw } = useScale();
    const [selected, setSelected] = useState(
        initialSelectedId ? CATEGORIES.find((c) => c.id === initialSelectedId) : null
    );

    const handlePress = useCallback((item) => setSelected(item), []);
    const keyExtractor = useCallback((it) => it.id, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
            <StatusBar barStyle="dark-content" />
            <ScrollView 
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        hitSlop={12}
                        onPress={()=>router.back()}
                        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                    >
                        <Text style={[styles.back, { fontSize: sw(16) }]}>← Back</Text>
                    </Pressable>
                    <Text style={[styles.headerTitle, { fontSize: sw(18) }]}>Select Your Business{"\n"}Category</Text>
                </View>

                {/* Intro */}
                <View style={{ marginBottom: sw(16), marginTop: sw(12) }}>
                    <Text style={[styles.sectionTitle, { fontSize: sw(22), marginBottom: sw(8) }]}>
                        What type of business do you operate?
                    </Text>
                    <Text style={[styles.sectionSub, { fontSize: sw(14) }]}>
                        Choose the category that best describes your services
                    </Text>
                </View>

                {/* Categories */}
                {CATEGORIES.map((item, index) => (
                    <View key={item.id}>
                        <CategoryItem item={item} selected={selected} onPress={handlePress} sw={sw} />
                        {index < CATEGORIES.length - 1 && <View style={{ height: sw(12) }} />}
                    </View>
                ))}

                {/* Note */}
                <View style={[styles.noteBox, { borderRadius: sw(12), padding: sw(14), marginTop: sw(20) }]}>
                    <Text style={[styles.noteText, { fontSize: sw(13), lineHeight: sw(20) }]}>
                        <Text style={{ fontWeight: "900" }}>Note:</Text> You can offer services across multiple
                        categories. Select the primary category that best represents your business.
                    </Text>
                </View>

                {/* CTA Button */}
                <Pressable
                    onPress={()=>selected && router.push("Partner/SignupMethod")}
                    disabled={!selected}
                    style={({ pressed }) => [
                        styles.cta,
                        {
                            opacity: selected ? (pressed ? 0.9 : 1) : 0.6,
                            borderRadius: sw(14),
                            paddingVertical: sw(16),
                            marginTop: sw(20),
                        },
                        shadowStyle,
                    ]}
                >
                    <Text style={[styles.ctaText, { fontSize: sw(16), fontWeight: "900" }]}>
                        {selected ? "Continue" : "Select a Category to Continue"}
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- styles -----------------------------------------------------
const shadowStyle =
    Platform.OS === "ios"
        ? { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } }
        : { elevation: 2 };

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    back: { color: COLORS.textMuted, fontWeight: "700" },
    headerTitle: { color: COLORS.text, fontWeight: "900", lineHeight: 24, textAlign: "right" },
    sectionTitle: { color: COLORS.text, fontWeight: "900" },
    sectionSub: { color: COLORS.textMuted, fontWeight: "600" },
    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        borderRadius: 16,
        borderWidth: 2,
        gap: 12,
        backgroundColor: COLORS.cardBg,
    },
    iconWrap: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.iconBg,
    },
    rowText: { flex: 1 },
    title: { color: COLORS.text, fontWeight: "900" },
    subtitle: { color: COLORS.textMuted, marginTop: 4, fontWeight: "600" },
    radio: { borderWidth: 2.5 },
    noteBox: {
        backgroundColor: COLORS.noteBg,
        borderWidth: 2,
        borderColor: "#93C5FD",
    },
    noteText: { color: COLORS.noteText, fontWeight: "600" },
    cta: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#001f3f",
    },
    ctaText: { color: "#FFFFFF", fontWeight: "900" },
});
