
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
import { ArrowLeft, Gift, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GiftCards() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  const giftCards = [
    { id: 1, code: 'OMBARO500', balance: 500, expiry: '31 Dec 2025' },
    { id: 2, code: 'WELCOME100', balance: 100, expiry: '15 Mar 2025' },
  ];

  const GiftCardItem = ({ item }) => (
    <LinearGradient
      colors={['#1e3a8a', '#3b82f6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.giftCard}
    >
      <View style={styles.giftCardHeader}>
        <Gift size={28} color="#fff" />
        <Text style={styles.giftCardBalance}>₹{item.balance}</Text>
      </View>
      <Text style={styles.giftCardCode}>{item.code}</Text>
      <Text style={styles.giftCardExpiry}>Valid till {item.expiry}</Text>
    </LinearGradient>
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
            <Text style={styles.headerTitle}>Gift Cards</Text>
            <Text style={styles.headerSubtitle}>Your vouchers & rewards</Text>
          </View>

          {/* Icon Section */}
          <View style={styles.iconSection}>
            <View style={styles.iconWrapper}>
              <Gift size={56} color="#FFFFFF" strokeWidth={1.5} />
            </View>
            <Text style={styles.iconText}>{giftCards.length} Gift Cards</Text>
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
            {giftCards.map((item) => (
              <GiftCardItem key={item.id} item={item} />
            ))}

            <TouchableOpacity style={styles.redeemBtn}>
              <Plus size={20} color="#1e3a8a" />
              <Text style={styles.redeemText}>Redeem Gift Card</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  },

  giftCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  giftCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  giftCardBalance: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },
  giftCardCode: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 8,
  },
  giftCardExpiry: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },

  redeemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#1e3a8a',
    borderStyle: 'dashed',
  },
  redeemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e3a8a',
    marginLeft: 8,
  },
});
