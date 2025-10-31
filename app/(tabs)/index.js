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
import { OmbaroTheme } from '../../constants/theme';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768;

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
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={OmbaroTheme.colors.roseGold} barStyle="light-content" />
        
        <LinearGradient
          colors={[OmbaroTheme.colors.roseGold, OmbaroTheme.colors.roseGoldDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGrad}
        >
          <View style={styles.headerRow}>
            <View style={styles.locRow}>
              <View style={styles.locIconBox}>
                <MapPin size={20} color="#fff" strokeWidth={2.5} />
              </View>
              <View>
                <Text style={styles.locLabel}>Current Location</Text>
                <Text style={styles.locCity}>Bangalore, Karnataka</Text>
              </View>
            </View>

            <View style={styles.headerBtns}>
              <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
                <Bell size={20} color="#fff" strokeWidth={2.5} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerBtn} 
                activeOpacity={0.7}
                onPress={() => router.replace('/')}
              >
                <LogOut size={20} color="#fff" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.greetingWrap}>
            <Text style={styles.greetingTitle}>Hello Beautiful 👋</Text>
            <Text style={styles.greetingSub}>Ready for your next beauty session?</Text>
          </View>

          <View style={styles.searchBar}>
            <Search size={20} color={OmbaroTheme.colors.textGray} strokeWidth={2.5} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search salons, services..."
              placeholderTextColor={OmbaroTheme.colors.textGray}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
              <Filter size={18} color="#fff" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <TouchableOpacity onPress={() => router.push("/booking")} activeOpacity={0.7}>
              <Text style={styles.viewAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.serviceGrid}>
            {featuredServices.map((s) => (
              <TouchableOpacity
                key={s.id}
                onPress={() => router.push('/booking')}
                activeOpacity={0.9}
                style={styles.serviceCard}
              >
                <LinearGradient
                  colors={[OmbaroTheme.colors.roseGold, OmbaroTheme.colors.roseGoldDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.serviceTopGrad}
                >
                  <View style={styles.emojiBubble}>
                    <Text style={styles.serviceEmoji}>{s.icon}</Text>
                  </View>
                </LinearGradient>

                <View style={styles.serviceBody}>
                  <Text numberOfLines={1} style={styles.serviceName}>
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

        <View style={styles.sectionPadBottom}>
          <View style={styles.nearbyHeader}>
            <Text style={styles.sectionTitle}>Near You</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/map')} activeOpacity={0.7}>
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
              <Image 
                source={{ uri: spa.image }} 
                style={styles.spaImage} 
                resizeMode="cover" 
              />
              <View style={styles.spaBody}>
                <View style={styles.spaTopRow}>
                  <Text style={styles.spaName} numberOfLines={1}>
                    {spa.name}
                  </Text>
                  <View style={styles.ratingRow}>
                    <Star size={16} color={OmbaroTheme.colors.roseGold} fill={OmbaroTheme.colors.roseGold} strokeWidth={0} />
                    <Text style={styles.ratingText}>{spa.rating}</Text>
                  </View>
                </View>

                <Text style={styles.spaServices} numberOfLines={1}>
                  {spa.services}
                </Text>

                <View style={styles.spaBottomRow}>
                  <Text style={styles.priceRange}>{spa.price}</Text>
                  <View style={styles.distanceRow}>
                    <MapPin size={14} color={OmbaroTheme.colors.textGray} strokeWidth={2.5} />
                    <Text style={styles.distanceText}>{spa.distance}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <View style={styles.quickRow}>
            <TouchableOpacity
              style={[styles.quickCard, styles.qaLeft]}
              onPress={() => router.push('/(tabs)/bookings')}
              activeOpacity={0.9}
            >
              <View style={styles.qaInner}>
                <View style={styles.qaIconBox}>
                  <Calendar size={24} color={OmbaroTheme.colors.roseGold} strokeWidth={2.5} />
                </View>
                <Text style={styles.qaText}>My Bookings</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickCard, styles.qaRight]}
              onPress={() => router.push('/(tabs)/map')}
              activeOpacity={0.9}
            >
              <View style={styles.qaInner}>
                <View style={styles.qaIconBox}>
                  <MapPin size={24} color={OmbaroTheme.colors.roseGoldDark} strokeWidth={2.5} />
                </View>
                <Text style={styles.qaText}>Spa Near You</Text>
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
    ? { elevation: 2 }
    : { 
        shadowColor: OmbaroTheme.colors.darkBg, 
        shadowOpacity: 0.08, 
        shadowRadius: 12, 
        shadowOffset: { width: 0, height: 4 } 
      };

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: OmbaroTheme.colors.beigeLight 
  },
  scroll: { 
    flex: 1 
  },

  headerGrad: { 
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 32, 
    paddingTop: isSmallDevice ? 12 : 16, 
    paddingBottom: isSmallDevice ? 20 : 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: isSmallDevice ? 12 : 16 
  },
  locRow: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flex: 1,
    marginRight: OmbaroTheme.spacing.md,
  },
  locIconBox: {
    width: isSmallDevice ? 44 : 48,
    height: isSmallDevice ? 44 : 48,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: OmbaroTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: OmbaroTheme.spacing.sm,
  },
  locLabel: { 
    fontSize: isSmallDevice ? 11 : OmbaroTheme.fontSize.xs, 
    color: 'rgba(255,255,255,0.85)',
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
  locCity: { 
    fontSize: isSmallDevice ? 14 : OmbaroTheme.fontSize.md, 
    fontWeight: OmbaroTheme.fontWeight.bold, 
    color: '#fff' 
  },
  headerBtns: { 
    flexDirection: 'row',
    gap: OmbaroTheme.spacing.sm,
  },
  headerBtn: {
    width: isSmallDevice ? 44 : 48,
    height: isSmallDevice ? 44 : 48,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: OmbaroTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingWrap: { 
    marginBottom: isSmallDevice ? 14 : 16 
  },
  greetingTitle: { 
    fontSize: isSmallDevice ? OmbaroTheme.fontSize.xl : OmbaroTheme.fontSize.xxl, 
    fontWeight: OmbaroTheme.fontWeight.bold, 
    color: '#fff', 
    marginBottom: OmbaroTheme.spacing.xs 
  },
  greetingSub: { 
    fontSize: isSmallDevice ? OmbaroTheme.fontSize.sm : OmbaroTheme.fontSize.md, 
    color: 'rgba(255,255,255,0.95)',
    fontWeight: OmbaroTheme.fontWeight.medium,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: OmbaroTheme.borderRadius.lg,
    paddingHorizontal: OmbaroTheme.spacing.md,
    paddingVertical: isSmallDevice ? 10 : 12,
    ...CARD_SHADOW,
  },
  searchInput: { 
    flex: 1, 
    marginLeft: OmbaroTheme.spacing.sm, 
    fontSize: isSmallDevice ? OmbaroTheme.fontSize.sm : OmbaroTheme.fontSize.md, 
    color: OmbaroTheme.colors.textDark,
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
  filterBtn: {
    width: 40,
    height: 40,
    backgroundColor: OmbaroTheme.colors.roseGold,
    borderRadius: OmbaroTheme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: OmbaroTheme.spacing.sm,
  },

  section: { 
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 32, 
    paddingVertical: isSmallDevice ? 20 : 24 
  },
  sectionPadBottom: { 
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 32, 
    paddingBottom: isSmallDevice ? 20 : 24 
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: OmbaroTheme.spacing.md,
  },
  sectionTitle: { 
    fontSize: isSmallDevice ? OmbaroTheme.fontSize.lg : OmbaroTheme.fontSize.xl, 
    fontWeight: OmbaroTheme.fontWeight.bold, 
    color: OmbaroTheme.colors.textDark,
  },
  viewAll: { 
    color: OmbaroTheme.colors.roseGold, 
    fontWeight: OmbaroTheme.fontWeight.bold,
    fontSize: isSmallDevice ? OmbaroTheme.fontSize.sm : OmbaroTheme.fontSize.md,
  },

  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: isSmallDevice ? 10 : 12,
  },
  serviceCard: {
    width: isLargeDevice ? (width - 64 - 24) / 3 : (width - (isSmallDevice ? 32 : 40) - 12) / 2,
    borderRadius: OmbaroTheme.borderRadius.lg,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: OmbaroTheme.colors.border,
    overflow: 'hidden',
    ...CARD_SHADOW,
  },

  serviceTopGrad: {
    height: isSmallDevice ? 70 : 82,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emojiBubble: {
    width: isSmallDevice ? 44 : 48,
    height: isSmallDevice ? 44 : 48,
    borderRadius: OmbaroTheme.borderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceEmoji: { 
    fontSize: isSmallDevice ? 22 : 26 
  },
  serviceBody: { 
    padding: isSmallDevice ? 10 : 12 
  },
  serviceName: {
    fontSize: isSmallDevice ? OmbaroTheme.fontSize.sm : OmbaroTheme.fontSize.md,
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
  },
  serviceMetaRow: {
    marginTop: OmbaroTheme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pricePill: {
    paddingHorizontal: isSmallDevice ? 8 : 10,
    paddingVertical: isSmallDevice ? 4 : 6,
    borderRadius: 999,
    backgroundColor: OmbaroTheme.colors.beige,
    borderWidth: 1,
    borderColor: OmbaroTheme.colors.border,
  },
  pricePillText: {
    fontSize: isSmallDevice ? 10 : OmbaroTheme.fontSize.xs,
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.roseGoldDark,
  },
  quickCta: {
    fontSize: isSmallDevice ? 11 : OmbaroTheme.fontSize.xs,
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.roseGold,
  },

  nearbyHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: OmbaroTheme.spacing.md,
  },
  spaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: OmbaroTheme.borderRadius.lg,
    borderWidth: 1,
    borderColor: OmbaroTheme.colors.border,
    marginBottom: OmbaroTheme.spacing.md,
    overflow: 'hidden',
    ...CARD_SHADOW,
  },
  spaImage: { 
    width: '100%', 
    height: isSmallDevice ? 160 : isMediumDevice ? 190 : 220,
  },
  spaBody: { 
    padding: isSmallDevice ? 12 : OmbaroTheme.spacing.md 
  },
  spaTopRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: OmbaroTheme.spacing.xs 
  },
  spaName: { 
    fontSize: isSmallDevice ? OmbaroTheme.fontSize.md : OmbaroTheme.fontSize.lg, 
    fontWeight: OmbaroTheme.fontWeight.bold, 
    color: OmbaroTheme.colors.textDark, 
    flexShrink: 1, 
    paddingRight: OmbaroTheme.spacing.sm 
  },
  ratingRow: { 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 4,
  },
  ratingText: { 
    fontSize: isSmallDevice ? 12 : OmbaroTheme.fontSize.sm, 
    color: OmbaroTheme.colors.textDark, 
    fontWeight: OmbaroTheme.fontWeight.semibold,
  },
  spaServices: { 
    fontSize: isSmallDevice ? 12 : OmbaroTheme.fontSize.sm, 
    color: OmbaroTheme.colors.textGray, 
    marginBottom: OmbaroTheme.spacing.sm,
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
  spaBottomRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  priceRange: { 
    fontSize: isSmallDevice ? 12 : OmbaroTheme.fontSize.sm, 
    color: OmbaroTheme.colors.roseGold, 
    fontWeight: OmbaroTheme.fontWeight.bold 
  },
  distanceRow: { 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 4,
  },
  distanceText: { 
    fontSize: isSmallDevice ? 11 : OmbaroTheme.fontSize.xs, 
    color: OmbaroTheme.colors.textGray,
    fontWeight: OmbaroTheme.fontWeight.medium,
  },

  quickActions: { 
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 32, 
    paddingBottom: isSmallDevice ? 24 : 32 
  },
  quickRow: { 
    flexDirection: 'row',
    gap: OmbaroTheme.spacing.md,
  },
  quickCard: {
    flex: 1,
    padding: isSmallDevice ? 16 : 20,
    borderRadius: OmbaroTheme.borderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...CARD_SHADOW,
  },
  qaLeft: { 
    backgroundColor: OmbaroTheme.colors.beige, 
    borderColor: OmbaroTheme.colors.border,
  },
  qaRight: { 
    backgroundColor: OmbaroTheme.colors.beige, 
    borderColor: OmbaroTheme.colors.border,
  },
  qaInner: { 
    alignItems: 'center' 
  },
  qaIconBox: {
    width: 56,
    height: 56,
    borderRadius: OmbaroTheme.borderRadius.md,
    backgroundColor: 'rgba(212, 165, 154, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: OmbaroTheme.spacing.sm,
  },
  qaText: { 
    fontSize: isSmallDevice ? 12 : OmbaroTheme.fontSize.sm, 
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
  },
});
