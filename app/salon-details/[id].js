import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Phone, Star } from 'lucide-react-native';
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { OmbaroTheme } from '../../constants/theme';

export default function SalonDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const salonData = {
    1: {
      name: 'Bliss Spa & Salon',
      rating: 4.8,
      distance: '0.5 km',
      image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg',
      services: 'Hair, Spa, Nails',
      price: '₹500-2000',
      description: 'Experience luxury and relaxation at Bliss Spa & Salon. Our expert therapists provide premium beauty and wellness services.',
      phone: '+91 98765 43210',
      address: 'MG Road, Bangalore',
    },
    2: {
      name: 'Zen Wellness Center',
      rating: 4.9,
      distance: '1.2 km',
      image: 'https://images.pexels.com/photos/3968056/pexels-photo-3968056.jpeg',
      services: 'Massage, Facial, Body Care',
      price: '₹800-3000',
      description: 'Transform your mind and body at Zen Wellness Center. We offer authentic spa treatments in a peaceful environment.',
      phone: '+91 98765 43211',
      address: 'Indiranagar, Bangalore',
    },
  };

  const salon = salonData[id] || salonData[1];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar backgroundColor={OmbaroTheme.colors.roseGold} barStyle="light-content" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: salon.image }} style={styles.heroImage} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(44,44,44,0.3)', 'rgba(44,44,44,0.7)']}
            style={styles.imageOverlay}
          />
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <ArrowLeft size={24} color="#fff" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={styles.salonName}>{salon.name}</Text>
              <View style={styles.ratingBadge}>
                <Star size={18} color={OmbaroTheme.colors.roseGold} fill={OmbaroTheme.colors.roseGold} strokeWidth={0} />
                <Text style={styles.ratingText}>{salon.rating}</Text>
              </View>
            </View>
            <Text style={styles.services}>{salon.services}</Text>
          </View>

          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <MapPin size={20} color={OmbaroTheme.colors.roseGold} strokeWidth={2.5} />
              <View style={styles.infoCardText}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{salon.address}</Text>
                <Text style={styles.infoDistance}>{salon.distance} away</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Phone size={20} color={OmbaroTheme.colors.roseGold} strokeWidth={2.5} />
              <View style={styles.infoCardText}>
                <Text style={styles.infoLabel}>Contact</Text>
                <Text style={styles.infoValue}>{salon.phone}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{salon.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <Text style={styles.priceRange}>{salon.price}</Text>
          </View>

          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => router.push('/booking')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[OmbaroTheme.colors.roseGold, OmbaroTheme.colors.roseGoldDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.bookButtonGradient}
            >
              <Text style={styles.bookButtonText}>Book Appointment</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 48,
    height: 48,
    borderRadius: OmbaroTheme.borderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: OmbaroTheme.spacing.lg,
  },
  header: {
    marginBottom: OmbaroTheme.spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: OmbaroTheme.spacing.xs,
  },
  salonName: {
    flex: 1,
    fontSize: OmbaroTheme.fontSize.xxl,
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
    marginRight: OmbaroTheme.spacing.md,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: OmbaroTheme.colors.beige,
    paddingHorizontal: OmbaroTheme.spacing.sm,
    paddingVertical: OmbaroTheme.spacing.xs,
    borderRadius: OmbaroTheme.borderRadius.md,
  },
  ratingText: {
    fontSize: OmbaroTheme.fontSize.md,
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
  },
  services: {
    fontSize: OmbaroTheme.fontSize.md,
    color: OmbaroTheme.colors.textGray,
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
  infoCards: {
    gap: OmbaroTheme.spacing.md,
    marginBottom: OmbaroTheme.spacing.lg,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: OmbaroTheme.spacing.md,
    borderRadius: OmbaroTheme.borderRadius.lg,
    borderWidth: 1,
    borderColor: OmbaroTheme.colors.border,
    ...CARD_SHADOW,
  },
  infoCardText: {
    marginLeft: OmbaroTheme.spacing.md,
    flex: 1,
  },
  infoLabel: {
    fontSize: OmbaroTheme.fontSize.xs,
    color: OmbaroTheme.colors.textGray,
    fontWeight: OmbaroTheme.fontWeight.medium,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: OmbaroTheme.fontSize.md,
    color: OmbaroTheme.colors.textDark,
    fontWeight: OmbaroTheme.fontWeight.semibold,
  },
  infoDistance: {
    fontSize: OmbaroTheme.fontSize.xs,
    color: OmbaroTheme.colors.textGray,
    marginTop: 2,
  },
  section: {
    marginBottom: OmbaroTheme.spacing.lg,
  },
  sectionTitle: {
    fontSize: OmbaroTheme.fontSize.lg,
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
    marginBottom: OmbaroTheme.spacing.sm,
  },
  description: {
    fontSize: OmbaroTheme.fontSize.md,
    color: OmbaroTheme.colors.textGray,
    lineHeight: 24,
    fontWeight: OmbaroTheme.fontWeight.medium,
  },
  priceRange: {
    fontSize: OmbaroTheme.fontSize.xl,
    color: OmbaroTheme.colors.roseGold,
    fontWeight: OmbaroTheme.fontWeight.bold,
  },
  bookButton: {
    marginTop: OmbaroTheme.spacing.md,
    marginBottom: OmbaroTheme.spacing.xl,
  },
  bookButtonGradient: {
    paddingVertical: OmbaroTheme.spacing.md,
    borderRadius: OmbaroTheme.borderRadius.lg,
    alignItems: 'center',
    ...CARD_SHADOW,
  },
  bookButtonText: {
    fontSize: OmbaroTheme.fontSize.md,
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: '#fff',
    letterSpacing: 0.5,
  },
});
