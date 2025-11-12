
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

// --- Dark Green Color Palette ----------------------------------------------------
const COLORS = {
    bg: "#F8FAFC",
    gradientColors: ['#00FF87', '#016B3A', '#013B1F', '#012B17'],
    cardBg: "#FFFFFF",
    text: "#0f172a",
    textMuted: "#64748B",
    primary: "#016B3A",
    border: "#E2E8F0",
    iconColor: "#00FF87",
    selectedBorder: "#016B3A",
    selectedBg: "#E8F5E9",
    noteBg: "#E8F5E9",
    noteText: "#013B1F",
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
    },
    { 
        id: "salon", 
        title: "Beauty Salon", 
        subtitle: "Hair, makeup, and beauty services", 
        icon: "cut",
    },
    { 
        id: "wellness", 
        title: "Wellness Center", 
        subtitle: "Holistic wellness and therapy center", 
        icon: "heart",
    },
    { 
        id: "home", 
        title: "Home Service", 
        subtitle: "Mobile spa and salon services", 
        icon: "home",
    },
    { 
        id: "hotel", 
        title: "Hotel Spa", 
        subtitle: "Luxury hotel spa facilities", 
        icon: "business",
    },
    { 
        id: "gym", 
        title: "Gym & Fitness", 
        subtitle: "Fitness center with wellness services", 
        icon: "fitness",
    },
    { 
        id: "yoga", 
        title: "Yoga & Meditation", 
        subtitle: "Yoga studio and meditation center", 
        icon: "leaf",
    },
    { 
        id: "ayurveda", 
        title: "Ayurveda Center", 
        subtitle: "Traditional Ayurvedic treatments", 
        icon: "flower",
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
                            backgroundColor: isSelected ? '#C8E6C9' : '#F1F5F9'
                        }
                    ]}
                >
                    <Ionicons name={item.icon} size={sw(28)} color={COLORS.iconColor} />
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
            
            {/* Modern Header with Dark Green Gradient */}
            <LinearGradient
                colors={COLORS.gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.header, { paddingBottom: sh(24) }]}
            >
                <View style={styles.headerTop}>
                    <Pressable
                        hitSlop={12}
                        onPress={() => router.back()}
                        style={[styles.backButton, { width: sw(44), height: sw(44), borderRadius: sw(12) }]}
                    >
                        <Ionicons name="arrow-back" size={sw(20)} color="#FFFFFF" />
                    </Pressable>

                    <View style={styles.headerBadge}>
                        <Ionicons name="briefcase" size={sw(16)} color="#00FF87" />
                        <Text style={[styles.headerBadgeText, { fontSize: sw(12) }]}>Partner Program</Text>
                    </View>
                </View>

                <View style={[styles.headerContent, { marginTop: sh(20) }]}>
                    <Text style={[styles.headerTitle, { fontSize: sw(28) }]}>
                        Join Our Partner Network
                    </Text>
                    <Text style={[styles.headerSubtitle, { fontSize: sw(14), marginTop: sh(8) }]}>
                        Grow your business with India's leading wellness platform
                    </Text>

                    {/* Stats Row */}
                    <View style={[styles.statsRow, { marginTop: sh(20) }]}>
                        <View style={styles.statItem}>
                            <Text style={[styles.statNumber, { fontSize: sw(20) }]}>50K+</Text>
                            <Text style={[styles.statLabel, { fontSize: sw(11) }]}>Partners</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={[styles.statNumber, { fontSize: sw(20) }]}>2M+</Text>
                            <Text style={[styles.statLabel, { fontSize: sw(11) }]}>Bookings</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={[styles.statNumber, { fontSize: sw(20) }]}>100+</Text>
                            <Text style={[styles.statLabel, { fontSize: sw(11) }]}>Cities</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.scrollContent, { paddingHorizontal: sw(16), paddingTop: sh(20), paddingBottom: sh(140) }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Section Title */}
                <View style={[styles.sectionHeader, { marginBottom: sh(16) }]}>
                    <Text style={[styles.sectionTitle, { fontSize: sw(18) }]}>
                        Select Your Business Type
                    </Text>
                    <Text style={[styles.sectionSubtitle, { fontSize: sw(13) }]}>
                        Choose the category that best describes your services
                    </Text>
                </View>

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

                {/* Benefits Section */}
                <View style={[styles.benefitsContainer, { borderRadius: sw(16), padding: sw(16), marginTop: sh(16) }]}>
                    <View style={styles.benefitsHeader}>
                        <Ionicons name="rocket" size={sw(20)} color={COLORS.primary} />
                        <Text style={[styles.benefitsTitle, { fontSize: sw(16), marginLeft: sw(8) }]}>
                            Why Partner With Us?
                        </Text>
                    </View>
                    
                    <View style={[styles.benefitItem, { marginTop: sh(12) }]}>
                        <Ionicons name="checkmark-circle" size={sw(18)} color={COLORS.iconColor} />
                        <Text style={[styles.benefitText, { fontSize: sw(13), marginLeft: sw(8) }]}>
                            Zero commission on first 30 bookings
                        </Text>
                    </View>
                    
                    <View style={styles.benefitItem}>
                        <Ionicons name="checkmark-circle" size={sw(18)} color={COLORS.iconColor} />
                        <Text style={[styles.benefitText, { fontSize: sw(13), marginLeft: sw(8) }]}>
                            Instant payment settlement
                        </Text>
                    </View>
                    
                    <View style={styles.benefitItem}>
                        <Ionicons name="checkmark-circle" size={sw(18)} color={COLORS.iconColor} />
                        <Text style={[styles.benefitText, { fontSize: sw(13), marginLeft: sw(8) }]}>
                            Free digital marketing support
                        </Text>
                    </View>
                    
                    <View style={styles.benefitItem}>
                        <Ionicons name="checkmark-circle" size={sw(18)} color={COLORS.iconColor} />
                        <Text style={[styles.benefitText, { fontSize: sw(13), marginLeft: sw(8) }]}>
                            24/7 dedicated partner support
                        </Text>
                    </View>
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
                        colors={selected ? COLORS.gradientColors : ["#94A3B8", "#CBD5E1"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[styles.ctaButton, { borderRadius: sw(14), paddingVertical: sh(16) }]}
                    >
                        <Text style={[styles.ctaText, { fontSize: sw(16) }]}>
                            {selected ? `Continue with ${selected.title}` : "Select a Category to Continue"}
                        </Text>
                        {selected && (
                            <Ionicons name="arrow-forward" size={sw(20)} color="#FFFFFF" style={{ marginLeft: sw(8) }} />
                        )}
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
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 10,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        alignItems: "center",
        justifyContent: "center",
    },
    headerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    headerBadgeText: {
        color: '#FFFFFF',
        fontWeight: '700',
        marginLeft: 6,
    },
    headerContent: {
        alignItems: "center",
    },
    headerTitle: {
        color: "#FFFFFF",
        fontWeight: "900",
        textAlign: "center",
        letterSpacing: 0.5,
        lineHeight: 36,
    },
    headerSubtitle: {
        color: "rgba(255, 255, 255, 0.9)",
        textAlign: "center",
        fontWeight: "500",
        paddingHorizontal: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        width: '100%',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        color: '#00FF87',
        fontWeight: '900',
        marginBottom: 4,
    },
    statLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '600',
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    sectionHeader: {
        marginBottom: 12,
    },
    sectionTitle: {
        color: COLORS.text,
        fontWeight: "800",
        marginBottom: 4,
    },
    sectionSubtitle: {
        color: COLORS.textMuted,
        fontWeight: "500",
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
    benefitsContainer: {
        backgroundColor: COLORS.noteBg,
        borderWidth: 1,
        borderColor: '#C8E6C9',
    },
    benefitsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    benefitsTitle: {
        color: COLORS.primary,
        fontWeight: "800",
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    benefitText: {
        color: COLORS.noteText,
        fontWeight: "600",
        flex: 1,
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
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
    },
    ctaButton: {
        flexDirection: 'row',
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
