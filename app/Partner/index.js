
import { router } from "expo-router";
import { memo, useCallback, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
    Platform,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// --- Modern Color Palette ----------------------------------------------------
const COLORS = {
    bg: "#F8FAFC",
    gradientStart: "#6366f1",
    gradientEnd: "#8b5cf6",
    cardBg: "#FFFFFF",
    text: "#0f172a",
    textMuted: "#64748B",
    primary: "#6366f1",
    border: "#E2E8F0",
    iconBg: "#F0F9FF",
    selectedBorder: "#6366f1",
    selectedBg: "#EEF2FF",
    noteBg: "#FEF3C7",
    noteText: "#92400E",
    shadow: "#000000",
};

// --- Responsive helpers -----------------------------------------
function useScale() {
    const { width, height } = useWindowDimensions();
    const base = Math.min(Math.max(width, 320), 480);
    const sw = (n) => Math.round((base / 390) * n);
    const sh = (n) => Math.round((height / 844) * n);
    return { sw, sh, width, height };
}

// --- Data --------------------------------------------------------
const CATEGORIES = [
    { 
        id: "spa", 
        title: "Spa & Massage", 
        subtitle: "Full-service spa with massage therapy", 
        icon: "water",
        iconColor: "#6366f1"
    },
    { 
        id: "salon", 
        title: "Beauty Salon", 
        subtitle: "Hair, makeup, and beauty services", 
        icon: "cut",
        iconColor: "#ec4899"
    },
    { 
        id: "wellness", 
        title: "Wellness Center", 
        subtitle: "Holistic wellness and therapy center", 
        icon: "heart",
        iconColor: "#14b8a6"
    },
    { 
        id: "home", 
        title: "Home Service", 
        subtitle: "Mobile spa and salon services", 
        icon: "home",
        iconColor: "#f59e0b"
    },
    { 
        id: "hotel", 
        title: "Hotel Spa", 
        subtitle: "Luxury hotel spa facilities", 
        icon: "business",
        iconColor: "#3b82f6"
    },
    { 
        id: "gym", 
        title: "Gym & Fitness", 
        subtitle: "Fitness center with wellness services", 
        icon: "fitness",
        iconColor: "#ef4444"
    },
    { 
        id: "yoga", 
        title: "Yoga & Meditation", 
        subtitle: "Yoga studio and meditation center", 
        icon: "leaf",
        iconColor: "#8b5cf6"
    },
    { 
        id: "ayurveda", 
        title: "Ayurveda Center", 
        subtitle: "Traditional Ayurvedic treatments", 
        icon: "flower",
        iconColor: "#10b981"
    },
];

// --- Category Card (memo) --------------------------------------------
const CategoryCard = memo(function CategoryCard({ item, selected, onPress, sw }) {
    const isSelected = selected?.id === item.id;
    
    return (
        <Pressable
            onPress={() => onPress(item)}
            style={({ pressed }) => [
                styles.categoryCard,
                {
                    borderWidth: 2,
                    borderColor: isSelected ? COLORS.selectedBorder : COLORS.border,
                    backgroundColor: isSelected ? COLORS.selectedBg : COLORS.cardBg,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                    marginBottom: sw(12),
                },
            ]}
        >
            <View style={styles.cardContent}>
                <View
                    style={[
                        styles.iconContainer, 
                        { 
                            width: sw(56), 
                            height: sw(56), 
                            borderRadius: sw(16),
                            backgroundColor: `${item.iconColor}15`
                        }
                    ]}
                >
                    <Ionicons name={item.icon} size={sw(28)} color={item.iconColor} />
                </View>

                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={[styles.categoryTitle, { fontSize: sw(16) }]}>
                        {item.title}
                    </Text>
                    <Text numberOfLines={2} style={[styles.categorySubtitle, { fontSize: sw(13) }]}>
                        {item.subtitle}
                    </Text>
                </View>

                {/* Selection Indicator */}
                <View
                    style={[
                        styles.radioOuter,
                        {
                            width: sw(24),
                            height: sw(24),
                            borderRadius: sw(12),
                            borderWidth: 2,
                            borderColor: isSelected ? COLORS.primary : "#CBD5E1",
                        },
                    ]}
                >
                    {isSelected && (
                        <View
                            style={[
                                styles.radioInner,
                                {
                                    width: sw(12),
                                    height: sw(12),
                                    borderRadius: sw(6),
                                    backgroundColor: COLORS.primary,
                                },
                            ]}
                        />
                    )}
                </View>
            </View>
        </Pressable>
    );
});

// --- Main Screen ------------------------------------------------
export default function index() {
    const { sw, sh, width } = useScale();
    const [selected, setSelected] = useState(null);

    const handlePress = useCallback((item) => setSelected(item), []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            {/* Modern Header with Gradient */}
            <LinearGradient
                colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.header, { paddingBottom: sh(24) }]}
            >
                <Pressable
                    hitSlop={12}
                    onPress={() => router.back()}
                    style={[styles.backButton, { width: sw(44), height: sw(44), borderRadius: sw(12) }]}
                >
                    <Ionicons name="arrow-back" size={sw(20)} color="#FFFFFF" />
                </Pressable>

                <View style={[styles.headerContent, { marginTop: sh(16) }]}>
                    <Text style={[styles.headerTitle, { fontSize: sw(26) }]}>
                        Select Your Business
                    </Text>
                    <Text style={[styles.headerSubtitle, { fontSize: sw(14), marginTop: sh(8) }]}>
                        Choose the category that best describes your services
                    </Text>
                </View>
            </LinearGradient>

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.scrollContent, { paddingHorizontal: sw(16), paddingTop: sh(20), paddingBottom: sh(120) }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Categories Grid */}
                {CATEGORIES.map((item) => (
                    <CategoryCard
                        key={item.id}
                        item={item}
                        selected={selected}
                        onPress={handlePress}
                        sw={sw}
                    />
                ))}

                {/* Info Note */}
                <View style={[styles.noteContainer, { borderRadius: sw(12), padding: sw(16), marginTop: sh(8) }]}>
                    <View style={styles.noteHeader}>
                        <View style={[styles.infoIcon, { width: sw(20), height: sw(20), borderRadius: sw(10) }]}>
                            <Ionicons name="information" size={sw(14)} color="#FFFFFF" />
                        </View>
                        <Text style={[styles.noteTitle, { fontSize: sw(14) }]}>Good to know</Text>
                    </View>
                    <Text style={[styles.noteText, { fontSize: sw(13), lineHeight: sw(20), marginTop: sh(8) }]}>
                        You can offer services across multiple categories. Select the primary category that best represents your business.
                    </Text>
                </View>
            </ScrollView>

            {/* Fixed Bottom Button */}
            <View style={[styles.bottomBar, { paddingHorizontal: sw(16), paddingVertical: sh(16) }]}>
                <Pressable
                    onPress={() => selected && router.push("Partner/SignupMethod")}
                    disabled={!selected}
                    style={({ pressed }) => [
                        {
                            opacity: pressed ? 0.9 : 1,
                        },
                    ]}
                >
                    <LinearGradient
                        colors={selected ? [COLORS.gradientStart, COLORS.gradientEnd] : ["#94A3B8", "#CBD5E1"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.ctaButton, { borderRadius: sw(14), paddingVertical: sh(16) }]}
                    >
                        <Text style={[styles.ctaText, { fontSize: sw(16) }]}>
                            {selected ? `Continue with ${selected.title}` : "Select a Category"}
                        </Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

// --- Styles -----------------------------------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 20,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    backButton: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    headerContent: {
        alignItems: "center",
    },
    headerTitle: {
        color: "#FFFFFF",
        fontWeight: "900",
        textAlign: "center",
        letterSpacing: 0.5,
    },
    headerSubtitle: {
        color: "rgba(255, 255, 255, 0.9)",
        textAlign: "center",
        fontWeight: "500",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    categoryCard: {
        borderRadius: 16,
        padding: 16,
        backgroundColor: COLORS.cardBg,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
        marginRight: 12,
    },
    categoryTitle: {
        color: COLORS.text,
        fontWeight: "800",
        marginBottom: 4,
    },
    categorySubtitle: {
        color: COLORS.textMuted,
        fontWeight: "500",
        lineHeight: 18,
    },
    radioOuter: {
        alignItems: "center",
        justifyContent: "center",
    },
    radioInner: {},
    noteContainer: {
        backgroundColor: COLORS.noteBg,
        borderWidth: 1,
        borderColor: "#FDE68A",
    },
    noteHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    infoIcon: {
        backgroundColor: COLORS.noteText,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    noteTitle: {
        color: COLORS.noteText,
        fontWeight: "700",
    },
    noteText: {
        color: COLORS.noteText,
        fontWeight: "500",
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.bg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },
    ctaButton: {
        alignItems: "center",
        justifyContent: "center",
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    ctaText: {
        color: "#FFFFFF",
        fontWeight: "900",
        letterSpacing: 0.5,
    },
});
