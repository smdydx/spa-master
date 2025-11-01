import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { 
  Bell, Calendar, Filter, LogOut, MapPin, Search, Star, 
  Sparkles, Zap, Shield, CreditCard, ChevronRight,
  User
} from 'lucide-react-native';
import { useRef, useState } from 'react';
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
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768;

const COLORS = {
  primary: '#1e3a8a',
  primaryDark: '#1e40af',
  secondary: '#3b82f6',
  white: '#FFFFFF',
  textDark: '#1F2937',
  textGray: '#6B7280',
  border: '#E5E7EB',
};

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const heroScrollRef = useRef(null);
  const router = useRouter();

  const heroServices = [
    {
      id: 1,
      title: 'Premium Massage Therapy',
      subtitle: 'Relaxing Body Massage',
      description: 'Deep tissue, Swedish, Thai, and aromatherapy massages by expert therapists',
      image: require('../../attached_assets/stock_images/professional_spa_mas_69a11d37.jpg'),
      cta: 'Book Massage'
    },
    {
      id: 2,
      title: 'Your Dream Wedding Look',
      subtitle: 'Bridal Makeup & Styling',
      description: 'Expert bridal makeup artists to make your special day unforgettable',
      image: require('../../attached_assets/stock_images/bridal_makeup_weddin_fbbb51ea.jpg'),
      cta: 'Book Bridal Package'
    },
    {
      id: 3,
      title: 'Hair, Skin & Nails',
      subtitle: 'Premium Beauty Salon',
      description: 'Complete beauty services including haircuts, styling, facials, and manicures',
      image: require('../../attached_assets/stock_images/hair_salon_styling_h_b33d6257.jpg'),
      cta: 'Explore Services'
    },
    {
      id: 4,
      title: 'Radiant Skin Solutions',
      subtitle: 'Wellness & Skincare',
      description: 'Professional skincare treatments and wellness programs tailored for you',
      image: require('../../attached_assets/stock_images/skincare_facial_trea_6426d351.jpg'),
      cta: 'Start Your Journey'
    },
  ];

  const statistics = [
    { value: '50,000+', label: 'Happy Customers' },
    { value: '500+', label: 'Partner Vendors' },
    { value: '1,000+', label: 'Services Available' },
    { value: '25+', label: 'Cities Covered' },
  ];

  const whyChooseFeatures = [
    {
      id: 1,
      icon: MapPin,
      title: 'Find Nearby Services',
      description: 'Discover premium salons, spas, and wellness centers in your area',
    },
    {
      id: 2,
      icon: Zap,
      title: 'Easy Booking',
      description: 'Book appointments in seconds with our intuitive booking system',
    },
    {
      id: 3,
      icon: Shield,
      title: 'Verified Professionals',
      description: 'All our partner professionals are verified, certified, and highly rated',
    },
    {
      id: 4,
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Safe and secure payment options with multiple payment methods',
    },
  ];

  const services = [
    {
      id: 1,
      name: 'Spa & Massage Therapy',
      icon: '💆‍♀️',
      description: 'Relaxing spa treatments, deep tissue massage, aromatherapy',
      image: require('../../attached_assets/stock_images/professional_spa_mas_338753fe.jpg'),
      price: 'from ₹800'
    },
    {
      id: 2,
      name: 'Bridal Makeup & Styling',
      icon: '👰',
      description: 'Complete bridal makeup, hair styling, pre-wedding packages',
      image: require('../../attached_assets/stock_images/bridal_makeup_weddin_12cc5e76.jpg'),
      price: 'from ₹5000'
    },
    {
      id: 3,
      name: 'Hair Salon Services',
      icon: '💇‍♀️',
      description: 'Professional haircuts, styling, coloring, keratin treatments',
      image: require('../../attached_assets/stock_images/hair_salon_styling_h_0bb02c12.jpg'),
      price: 'from ₹500'
    },
    {
      id: 4,
      name: 'Skincare & Facials',
      icon: '✨',
      description: 'Advanced facial treatments, skin analysis, anti-aging solutions',
      image: require('../../attached_assets/stock_images/skincare_facial_trea_613d6f55.jpg'),
      price: 'from ₹600'
    },
    {
      id: 5,
      name: 'Nail Art & Manicure',
      icon: '💅',
      description: 'Professional manicure, pedicure, nail extensions, nail art',
      image: require('../../attached_assets/stock_images/nail_art_manicure_pe_994f18e3.jpg'),
      price: 'from ₹300'
    },
    {
      id: 6,
      name: 'Wellness Programs',
      icon: '🧘‍♀️',
      description: 'Holistic wellness, yoga, meditation, lifestyle improvement',
      image: require('../../attached_assets/stock_images/wellness_yoga_medita_db974ec2.jpg'),
      price: 'from ₹1000'
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Regular Customer',
      feedback: 'OMBARO has made booking spa appointments so easy! The therapists are professional and the service is always top-notch.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
    },
    {
      id: 2,
      name: 'Rahul Verma',
      role: 'Business Professional',
      feedback: 'As a busy professional, I love how convenient it is to book wellness services on the go. Highly recommended!',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
    },
    {
      id: 3,
      name: 'Anjali Reddy',
      role: 'Wellness Enthusiast',
      feedback: 'The quality of service providers on OMBARO is exceptional. I have found my go-to spa and salon through this platform.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
    },
  ];

  const onHeroScroll = (event) => {
    const slideSize = width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveHeroIndex(index);
  };

  const renderHeroItem = ({ item }) => (
    <View style={styles.heroSlide}>
      <Image source={item.image} style={styles.heroImage} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(30, 58, 138, 0.7)', 'rgba(30, 58, 138, 0.5)', 'rgba(30, 58, 138, 0.75)']}
        style={styles.heroOverlay}
      />
      <View style={styles.heroContent}>
        <Text style={styles.heroSubtitle}>{item.subtitle}</Text>
        <Text style={styles.heroTitle}>{item.title}</Text>
        <Text style={styles.heroDescription}>{item.description}</Text>
        <TouchableOpacity
          style={styles.heroCta}
          activeOpacity={0.9}
          onPress={() => router.push('/booking')}
        >
          <LinearGradient
            colors={['#FFFFFF', '#f3f4f6']}
            style={styles.heroCtaGradient}
          >
            <Text style={styles.heroCtaText}>{item.cta}</Text>
            <ChevronRight size={18} color={COLORS.primary} strokeWidth={3} />
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.heroCustomerCount}>50,000+ Happy Customers</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary, COLORS.primaryDark]}
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
            <Search size={20} color={COLORS.textGray} strokeWidth={2.5} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search salons, services..."
              placeholderTextColor={COLORS.textGray}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
              <Filter size={18} color="#fff" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.heroSection}>
          <FlatList
            ref={heroScrollRef}
            data={heroServices}
            renderItem={renderHeroItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onHeroScroll}
            scrollEventThrottle={16}
          />
          <View style={styles.heroPagination}>
            {heroServices.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.heroDot,
                  activeHeroIndex === index && styles.heroDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {statistics.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <LinearGradient
                  colors={['#1e3a8a', '#3b82f6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.statGradient}
                >
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.whySection}>
          <View style={styles.sectionHeader}>
            <Sparkles size={24} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={styles.sectionTitle}>Why Choose OMBARO?</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            We make beauty and wellness services accessible, convenient, and reliable.
          </Text>
          <View style={styles.featuresGrid}>
            {whyChooseFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <View key={feature.id} style={styles.featureCard}>
                  <View style={styles.featureIconBox}>
                    <IconComponent size={28} color={COLORS.primary} strokeWidth={2.5} />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.description}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.servicesSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Our Services</Text>
            <TouchableOpacity onPress={() => router.push('/booking')} activeOpacity={0.7}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>
            Explore our wide range of beauty and wellness services
          </Text>
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                activeOpacity={0.9}
                onPress={() => router.push('/booking')}
              >
                <Image source={service.image} style={styles.serviceImage} resizeMode="cover" />
                <LinearGradient
                  colors={['rgba(30, 58, 138, 0.1)', 'rgba(30, 58, 138, 0.05)']}
                  style={styles.serviceOverlay}
                />
                <View style={styles.serviceIconBadge}>
                  <Text style={styles.serviceEmoji}>{service.icon}</Text>
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDesc} numberOfLines={2}>{service.description}</Text>
                  <Text style={styles.servicePrice}>{service.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.testimonialsSection}>
          <View style={styles.sectionHeaderCenter}>
            <Text style={styles.sectionTitle}>What Our Customers Say</Text>
            <Text style={styles.sectionSubtitle}>
              Join thousands of satisfied customers who trust OMBARO
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {testimonials.map((testimonial) => (
              <View key={testimonial.id} style={styles.testimonialCard}>
                <View style={styles.testimonialRating}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} color="#FBBF24" fill="#FBBF24" strokeWidth={0} />
                  ))}
                </View>
                <Text style={styles.testimonialText}>{testimonial.feedback}</Text>
                <View style={styles.testimonialAuthor}>
                  <Image source={{ uri: testimonial.avatar }} style={styles.testimonialAvatar} />
                  <View>
                    <Text style={styles.testimonialName}>{testimonial.name}</Text>
                    <Text style={styles.testimonialRole}>{testimonial.role}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.ctaSection}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaBanner}
          >
            <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands of customers who have transformed their beauty routine
            </Text>
            <TouchableOpacity
              style={styles.ctaButton}
              activeOpacity={0.9}
              onPress={() => router.push('/booking')}
            >
              <Text style={styles.ctaButtonText}>Book Now</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_SHADOW =
  Platform.OS === 'android'
    ? { elevation: 3 }
    : { 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 12, 
        shadowOffset: { width: 0, height: 4 } 
      };

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: '#F9FAFB'
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
    marginRight: 16,
  },
  locIconBox: {
    width: isSmallDevice ? 44 : 48,
    height: isSmallDevice ? 44 : 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  locLabel: { 
    fontSize: isSmallDevice ? 11 : 12, 
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  locCity: { 
    fontSize: isSmallDevice ? 14 : 15, 
    fontWeight: '700', 
    color: '#fff' 
  },
  headerBtns: { 
    flexDirection: 'row',
    gap: 12,
  },
  headerBtn: {
    width: isSmallDevice ? 44 : 48,
    height: isSmallDevice ? 44 : 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingWrap: { 
    marginBottom: isSmallDevice ? 14 : 16 
  },
  greetingTitle: { 
    fontSize: isSmallDevice ? 22 : 26, 
    fontWeight: '800', 
    color: '#fff', 
    marginBottom: 4 
  },
  greetingSub: { 
    fontSize: isSmallDevice ? 14 : 15, 
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '500',
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: isSmallDevice ? 10 : 12,
    ...CARD_SHADOW,
  },
  searchInput: { 
    flex: 1, 
    marginLeft: 12, 
    fontSize: isSmallDevice ? 14 : 15, 
    color: COLORS.textDark,
    fontWeight: '500',
  },
  filterBtn: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  heroSection: {
    marginTop: 20,
  },
  heroSlide: {
    width: width,
    height: isSmallDevice ? 280 : 320,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: isSmallDevice ? 20 : 24,
  },
  heroSubtitle: {
    fontSize: isSmallDevice ? 12 : 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: isSmallDevice ? 24 : 28,
    color: '#FFFFFF',
    fontWeight: '800',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: isSmallDevice ? 13 : 14,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '500',
    marginBottom: 16,
    lineHeight: 20,
  },
  heroCta: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  heroCtaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  heroCtaText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  heroCustomerCount: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  heroPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  heroDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(30, 58, 138, 0.3)',
  },
  heroDotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  },

  statsSection: {
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 32,
    paddingVertical: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - (isSmallDevice ? 44 : 52)) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    ...CARD_SHADOW,
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: isSmallDevice ? 22 : 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: isSmallDevice ? 11 : 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },

  whySection: {
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 32,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 20 : 24,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  sectionSubtitle: {
    fontSize: isSmallDevice ? 13 : 14,
    color: COLORS.textGray,
    fontWeight: '500',
    marginBottom: 20,
    lineHeight: 20,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureIconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureTitle: {
    fontSize: isSmallDevice ? 15 : 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
    flex: 1,
  },
  featureDesc: {
    fontSize: isSmallDevice ? 12 : 13,
    color: COLORS.textGray,
    fontWeight: '500',
    lineHeight: 18,
    flex: 1,
  },

  servicesSection: {
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 32,
    paddingVertical: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  servicesGrid: {
    gap: 16,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    ...CARD_SHADOW,
  },
  serviceImage: {
    width: '100%',
    height: isSmallDevice ? 180 : 200,
  },
  serviceOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  serviceIconBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...CARD_SHADOW,
  },
  serviceEmoji: {
    fontSize: 24,
  },
  serviceInfo: {
    padding: 16,
  },
  serviceName: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  serviceDesc: {
    fontSize: 13,
    color: COLORS.textGray,
    fontWeight: '500',
    marginBottom: 8,
    lineHeight: 18,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },

  testimonialsSection: {
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
  },
  sectionHeaderCenter: {
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 32,
    marginBottom: 20,
  },
  testimonialCard: {
    width: isSmallDevice ? width - 80 : 320,
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 16,
    marginLeft: isSmallDevice ? 16 : 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  testimonialRating: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 12,
  },
  testimonialText: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 16,
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  testimonialAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  testimonialName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  testimonialRole: {
    fontSize: 12,
    color: COLORS.textGray,
    fontWeight: '500',
  },

  ctaSection: {
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 32,
    paddingVertical: 24,
  },
  ctaBanner: {
    padding: isSmallDevice ? 24 : 32,
    borderRadius: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: isSmallDevice ? 22 : 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
