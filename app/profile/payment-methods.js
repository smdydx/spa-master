
import React from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Plus, Trash2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PaymentMethods() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  const cards = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '06/26', isDefault: false },
  ];

  const CardItem = ({ item }) => (
    <View style={styles.cardItem}>
      <View style={styles.cardIcon}>
        <CreditCard size={24} color="#001f3f" />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardType}>{item.type} •••• {item.last4}</Text>
        <Text style={styles.cardExpiry}>Expires {item.expiry}</Text>
        {item.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.deleteBtn}>
        <Trash2 size={20} color="#dc2626" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.mainContainer, { flexDirection: isTablet ? 'row' : 'column' }]}>
        {/* Navy Blue Section */}
        <View style={[
          styles.navySection,
          {
            width: isTablet ? '40%' : '100%',
            height: isTablet ? '100%' : height * 0.35,
          }
        ]}>
          {/* Decorative Circles */}
          <View style={styles.decorativeCircles}>
            <View style={[styles.circle, styles.circle1]} />
            <View style={[styles.circle, styles.circle2]} />
            <View style={[styles.circle, styles.circle3]} />
          </View>

          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Header Content */}
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Payment Methods</Text>
            <Text style={styles.headerSubtitle}>Manage your payment cards</Text>
          </View>

          {/* Icon Section */}
          <View style={styles.iconSection}>
            <View style={styles.iconWrapper}>
              <CreditCard size={56} color="#FFFFFF" strokeWidth={1.5} />
            </View>
            <Text style={styles.iconText}>{cards.length} Saved Cards</Text>
          </View>
        </View>

        {/* White Content Section */}
        <ScrollView 
          style={[
            styles.whiteSection,
            {
              width: isTablet ? '60%' : '100%',
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            {cards.map((item) => (
              <CardItem key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>

        {/* Add Button */}
        <TouchableOpacity style={[styles.addBtn, { bottom: 20, left: isTablet ? '40%' : 20 }]}>
          <LinearGradient
            colors={['#001f3f', '#003366']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addBtnGradient}
          >
            <Plus size={24} color="#fff" />
            <Text style={styles.addBtnText}>Add New Card</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
  },

  // Navy Blue Section
  navySection: {
    backgroundColor: '#001f3f',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeCircles: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  circle1: {
    width: 280,
    height: 280,
    top: -100,
    right: -80,
  },
  circle2: {
    width: 200,
    height: 200,
    bottom: -60,
    left: -50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  circle3: {
    width: 150,
    height: 150,
    top: '40%',
    left: -40,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  backButton: {
    zIndex: 1,
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  headerContent: {
    zIndex: 1,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.3,
    lineHeight: 32,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    lineHeight: 18,
  },
  iconSection: {
    alignItems: 'center',
    zIndex: 1,
    marginBottom: 10,
  },
  iconWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  iconText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.3,
  },

  // White Content Section
  whiteSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 32,
    paddingBottom: 100,
  },

  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 13,
    color: '#64748b',
  },
  defaultBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  defaultText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#16a34a',
  },
  deleteBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addBtn: {
    position: 'absolute',
    right: 20,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  addBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 8,
  },
});
