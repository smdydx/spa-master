import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Bell, Calendar, Filter, LogOut, MapPin, Search, Star } from 'lucide-react-native';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const COLORS = {
  bg: "#FEF9F3",
  cardBg: "#FFFFFF",
  text: "#1A1A1A",
  textMuted: "#6B7280",
  border: "#F3E8DC",
  grad1: "#a855f7",
  grad2: "#ec4899",
};

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const featuredServices = [
    { id: 1, name: 'Hair Styling', icon: '💇‍♀️', price: 'from ₹500' },
    { id: 2, name: 'Spa & Massage', icon: '💆‍♀️', price: 'from ₹800' },
    { id: 3, name: 'Nail Art', icon: '💅', price: 'from ₹300' },
    { id: 4, name: 'Facial', icon: '🧴', price: 'from ₹600' },
  ];

  const nearbySpas = [
    {
      id: 1,
      name: 'Bliss Spa & Salon',
      rating: 4.8,
      distance: '0.5 km',
      image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg',
      services: 'Hair, Spa, Nails',
      price: '₹500-2000',
    },
    {
      id: 2,
      name: 'Zen Wellness Center',
      rating: 4.9,
      distance: '1.2 km',
      image: 'https://images.pexels.com/photos/3968056/pexels-photo-3968056.jpeg',
      services: 'Massage, Facial, Body Care',
      price: '₹800-3000',
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        <StatusBar backgroundColor="#a855f7" barStyle="dark-content" hidden={false} animated={true} />
        {/* Header */}
        <LinearGradient
          colors={['#a855f7', '#ec4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGrad}
        >
          <View style={styles.headerRow}>
            <View style={styles.locRow}>
              <View style={styles.locIconBox}>
                <MapPin size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.locLabel}>Current Location</Text>
                <Text style={styles.locCity}>Bangalore, Karnataka</Text>
              </View>
            </View>

            <View style={styles.headerBtns}>
              <TouchableOpacity style={styles.headerBtn}>
                <Bell size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerBtn}>
                <LogOut size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.greetingWrap}>
            <Text style={styles.greetingTitle}>Hello Beautiful 👋</Text>
            <Text style={styles.greetingSub}>Ready for your next beauty session?</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Search size={20} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search salons, services..."
              placeholderTextColor="#9ca3af"
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.filterBtn}>
              <Filter size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Popular Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <TouchableOpacity onPress={() => router.push("/booking")}>
              <Text style={styles.viewAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.serviceGrid}>
            {featuredServices.map((s) => (
              <TouchableOpacity
                key={s.id}
                onPress={() => router.push('/booking')}
                activeOpacity={0.9}
                style={styles.serviceCardNew}
              >
                {/* gradient header */}
                <LinearGradient
                  colors={["#a78bfa", "#ec4899"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.serviceTopGrad}
                >
                  <View style={styles.emojiBubble}>
                    <Text style={styles.serviceEmoji}>{s.icon}</Text>
                  </View>
                </LinearGradient>

                {/* body */}
                <View style={styles.serviceBody}>
                  <Text numberOfLines={1} style={styles.serviceNameNew}>
                    {s.name}
                  </Text>

                  <View style={styles.serviceMetaRow}>
                    <View style={styles.pricePill}>
                      <Text style={styles.pricePillText}>{s.price}</Text>
                    </View>
                    <Text style={styles.quickCta}>Book</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        {/* Nearby Spas */}
        <View style={styles.sectionPadBottom}>
          <View style={styles.nearbyHeader}>
            <Text style={styles.sectionTitle}>Near You</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/map')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {nearbySpas.map(spa => (
            <TouchableOpacity
              key={spa.id}
              style={styles.spaCard}
              onPress={() => router.push(`/salon-details/${spa.id}`)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: spa.image }} style={styles.spaImage} resizeMode="cover" />
              <View style={styles.spaBody}>
                <View style={styles.spaTopRow}>
                  <Text style={styles.spaName} numberOfLines={1}>
                    {spa.name}
                  </Text>
                  <View style={styles.ratingRow}>
                    <Star size={16} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{spa.rating}</Text>
                  </View>
                </View>

                <Text style={styles.spaServices} numberOfLines={1}>
                  {spa.services}
                </Text>

                <View style={styles.spaBottomRow}>
                  <Text style={styles.priceRange}>{spa.price}</Text>
                  <View style={styles.distanceRow}>
                    <MapPin size={14} color="#9ca3af" />
                    <Text style={styles.distanceText}>{spa.distance}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <View style={styles.quickRow}>
            <TouchableOpacity
              style={[styles.quickCard, styles.qaLeft]}
              onPress={() => router.push('/(tabs)/bookings')}
              activeOpacity={0.9}
            >
              <View style={styles.qaInner}>
                <Calendar size={24} color="#a855f7" />
                <Text style={[styles.qaText, { color: '#6d28d9' }]}>My Bookings</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickCard, styles.qaRight]}
              onPress={() => router.push('/(tabs)/map')}
              activeOpacity={0.9}
            >
              <View style={styles.qaInner}>
                <MapPin size={24} color="#ec4899" />
                <Text style={[styles.qaText, { color: '#db2777' }]}>Spa Near You</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_SHADOW =
  Platform.OS === 'android'
    ? { elevation: 1 }
    : { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } };

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FEF9F3' },
  scroll: { flex: 1 },

  // Header
  headerGrad: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  locRow: { flexDirection: 'row', alignItems: 'center' },
  locIconBox: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  locLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  locCity: { fontSize: 16, fontWeight: '700', color: '#fff' },
  headerBtns: { flexDirection: 'row' },
  headerBtn: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  greetingWrap: { marginBottom: 16 },
  greetingTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 6 },
  greetingSub: { fontSize: 16, color: 'rgba(255,255,255,0.9)' },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16, color: '#374151' },
  filterBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  // Sections
  section: { paddingHorizontal: 24, paddingVertical: 24 },
  sectionPadBottom: { paddingHorizontal: 24, paddingBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 12 },

  // Services grid (2 per row)
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: (width - 24 * 2 - 12) / 2, // two columns with ~12px gap
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 12,
    ...CARD_SHADOW,
  },
  serviceInner: { padding: 16, alignItems: 'center' },
  serviceName: { fontSize: 15, fontWeight: '700', color: '#111827', textAlign: 'center' },
  servicePrice: { marginTop: 4, fontSize: 13, color: '#7c3aed', fontWeight: '600' },

  // Nearby spa cards
  nearbyHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  viewAll: { color: '#7c3aed', fontWeight: '700' },
  spaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8DC',
    marginBottom: 12,
    overflow: 'hidden',
    ...CARD_SHADOW,
  },
  spaImage: { width: '100%', height: 190 },
  spaBody: { padding: 16 },
  spaTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  spaName: { fontSize: 16, fontWeight: '700', color: '#111827', flexShrink: 1, paddingRight: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 13, color: '#374151', fontWeight: '600', marginLeft: 4 },
  spaServices: { fontSize: 13, color: '#4b5563', marginBottom: 8 },
  spaBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceRange: { fontSize: 13, color: '#7c3aed', fontWeight: '700' },
  distanceRow: { flexDirection: 'row', alignItems: 'center' },
  distanceText: { marginLeft: 4, fontSize: 12, color: '#6b7280' },

  // Quick actions
  quickActions: { paddingHorizontal: 24, paddingBottom: 40 },
  quickRow: { flexDirection: 'row' },
  quickCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qaLeft: { backgroundColor: '#faf5ff', borderColor: '#ede9fe', marginRight: 8 }, // purple-50/100
  qaRight: { backgroundColor: '#fdf2f8', borderColor: '#fce7f3', marginLeft: 8 }, // pink-50/100
  qaInner: { alignItems: 'center' },
  qaText: { marginTop: 8, fontSize: 13, fontWeight: '700' },






  // add to your styles object
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  viewAll: { color: '#7c3aed', fontWeight: '700' },

  serviceCardNew: {
    width: (width - 24 * 2 - 12) / 2,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    marginVertical: 5,
    borderColor: '#F3E8DC',
    overflow: 'hidden',
    ...CARD_SHADOW,
  },

  serviceTopGrad: {
    height: 82,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emojiBubble: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceEmoji: { fontSize: 26 },
  serviceBody: { padding: 12 },
  serviceNameNew: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  serviceMetaRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pricePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#f5f3ff',
    borderWidth: 1,
    borderColor: '#ede9fe',
  },
  pricePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6d28d9',
  },
  quickCta: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0ea5e9',
  },

});
