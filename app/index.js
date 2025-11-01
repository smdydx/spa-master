
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Sparkles, MapPin, Calendar, Award } from 'lucide-react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OmbaroTheme } from '../constants/theme';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const quickAccessItems = [
    {
      icon: MapPin,
      title: 'Find Nearby',
      subtitle: 'Discover salons & spas around you',
      route: '/(tabs)/map',
    },
    {
      icon: Calendar,
      title: 'Easy Booking',
      subtitle: 'Book appointments in seconds',
      route: '/booking',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      subtitle: 'Verified professionals',
      route: '/(tabs)',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      
      {/* Top Section - Navy Blue */}
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <Sparkles size={32} color="#ffffff" strokeWidth={2} />
        </View>
        
        <Text style={styles.brandName}>OMBARO</Text>
        <Text style={styles.tagline}>Beauty & Wellness Hub</Text>
        
        <Text style={styles.welcomeTitle}>Welcome to Your Beauty Journey</Text>
        <Text style={styles.welcomeSubtitle}>Premium spa & wellness services</Text>
      </View>

      {/* Bottom Section - White */}
      <View style={styles.bottomSection}>
        <Text style={styles.quickAccessTitle}>Quick Access</Text>
        
        <View style={styles.cardsContainer}>
          {quickAccessItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => router.push(item.route)}
              activeOpacity={0.8}
            >
              <View style={styles.cardIconContainer}>
                <item.icon size={24} color="#1e3a8a" strokeWidth={2.5} />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => router.push('/auth/phone-register')}
          activeOpacity={0.9}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/phone-register')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topSection: {
    backgroundColor: '#1e3a8a',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    fontWeight: '500',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  quickAccessTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 20,
  },
  cardsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#1e3a8a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(30, 58, 138, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 4,
    flex: 1,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
    flex: 1,
  },
  getStartedButton: {
    backgroundColor: '#1e3a8a',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#1e3a8a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  loginLink: {
    fontSize: 14,
    color: '#1e3a8a',
    fontWeight: '700',
  },
});
