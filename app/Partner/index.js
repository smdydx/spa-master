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

    const header = useMemo(
        () => (
            <View style={styles.header}>
                <Pressable
                    hitSlop={12}
                    onPress={()=>router.back()}
                    style={({ pressed }) => [{ opacity: onBack ? (pressed ? 0.6 : 1) : 0.4 }]}
                >
                    <Text style={[styles.back, { fontSize: sw(16) }]}>← Back</Text>
                </Pressable>
                <Text style={[styles.headerTitle, { fontSize: sw(18) }]}>Select Your Business{"\n"}Category</Text>
            </View>
        ),
        [onBack, sw]
    );

    const intro = useMemo(
        () => (
            <View style={{ marginBottom: sw(12) }}>
                <Text style={[styles.sectionTitle, { fontSize: sw(20), marginBottom: sw(6) }]}>
                    What type of business do you operate?
                </Text>
                <Text style={[styles.sectionSub, { fontSize: sw(13) }]}>
                    Choose the category that best describes your services
                </Text>
            </View>
        ),
        [sw]
    );

    const footer = useMemo(
        () => (
            <View style={{ marginTop: sw(12) }}>
                <View style={[styles.noteBox, { borderRadius: sw(12), padding: sw(12) }]}>
                    <Text style={[styles.noteText, { fontSize: sw(12) }]}>
                        <Text style={{ fontWeight: "700" }}>Note:</Text> You can offer services across multiple
                        categories. Select the primary category that best represents your business.
                    </Text>
                </View>

                <Pressable
                    // onPress={() => selected && onContinue && onContinue(selected)}
                    onPress={()=>router.push("Partner/SignupMethod")}
                    disabled={!selected}
                    style={({ pressed }) => [
                        styles.cta,
                        {
                            opacity: selected ? (pressed ? 0.9 : 1) : 0.6,
                            borderRadius: sw(14),
                            paddingVertical: sw(14),
                            marginTop: sw(16),
                        },
                    ]}
                >
                    <Text style={[styles.ctaText, { fontSize: sw(15), fontWeight: "700" }]}>
                        {selected ? "Continue" : "Select a Category to Continue"}
                    </Text>
                </Pressable>
            </View>
        ),
        [onContinue, selected, sw]
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80,paddingTop:40,marginHorizontal:10 }}
                showsVerticalScrollIndicator={false}>
                <View style={[styles.card, { borderRadius: sw(16), padding: sw(16) }, shadowStyle]}>
                    {header}
                    {intro}

                    <FlatList
                        data={CATEGORIES}
                        keyExtractor={keyExtractor}
                        renderItem={({ item }) => (
                            <CategoryItem item={item} selected={selected} onPress={handlePress} sw={sw} />
                        )}
                        ItemSeparatorComponent={() => <View style={{ height: sw(12) }} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: sw(8) }}
                        initialNumToRender={6}
                        windowSize={7}
                        removeClippedSubviews
                        scrollEnabled={false}
                    />

                    {footer}
                </View>
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
    root: { flex: 1 },
    centerWrap: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 12,
    },
    card: {
        flex: 1,
        width: "100%",
        maxWidth: 480,
        backgroundColor: COLORS.cardBg,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.border,
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    back: { color: COLORS.textMuted, fontWeight: "600" },
    headerTitle: { color: COLORS.text, fontWeight: "700", lineHeight: 24, textAlign: "right" },
    sectionTitle: { color: COLORS.text, fontWeight: "800" },
    sectionSub: { color: COLORS.textMuted },
    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 14,
        borderWidth: StyleSheet.hairlineWidth,
        gap: 12,
    },
    iconWrap: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.iconBg,
    },
    rowText: { flex: 1 },
    title: { color: COLORS.text, fontWeight: "700" },
    subtitle: { color: COLORS.textMuted, marginTop: 2 },
    radio: { borderWidth: 2 },
    noteBox: {
        backgroundColor: COLORS.noteBg,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(59, 92, 204, 0.25)",
    },
    noteText: { color: COLORS.noteText },
    cta: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#001f3f",
    },
    ctaText: { color: "#FFFFFF", fontWeight: "800"},
});
