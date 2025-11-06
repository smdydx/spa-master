
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Smartphone, Wallet, Check, Shield } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function PaymentScreen() {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  const paymentMethods = [
    { id: 'card', title: 'Credit/Debit Card', icon: CreditCard, subtitle: 'Secure payment via cards' },
    { id: 'upi', title: 'UPI Payment', icon: Smartphone, subtitle: 'Pay via Google Pay, PhonePe, etc.' },
    { id: 'wallet', title: 'Digital Wallet', icon: Wallet, subtitle: 'Paytm, Amazon Pay, etc.' },
  ];

  const bookingDetails = {
    service: 'Hair Styling',
    salon: 'Bliss Spa & Salon',
    date: 'Today',
    time: '2:30 PM',
    price: 800,
    discount: 80,
    tax: 144,
  };

  const totalAmount = useMemo(
    () => bookingDetails.price - bookingDetails.discount + bookingDetails.tax,
    [bookingDetails]
  );

  const handlePayment = () => {
    setTimeout(() => {
      router.push('/order-tracking/1');
    }, 1500);
  };

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
            <Text style={styles.headerTitle}>Payment</Text>
            <Text style={styles.headerSubtitle}>Complete your booking</Text>
          </View>

          {/* Icon Section */}
          <View style={styles.iconSection}>
            <View style={styles.iconWrapper}>
              <CreditCard size={56} color="#FFFFFF" strokeWidth={1.5} />
            </View>
            <Text style={styles.iconText}>Secure Payment</Text>
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
            {/* Order Summary */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Order Summary</Text>

              <View style={{ gap: 8 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.muted}>Service</Text>
                  <Text style={styles.semibold}>{bookingDetails.service}</Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text style={styles.muted}>Salon</Text>
                  <Text style={styles.semibold}>{bookingDetails.salon}</Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text style={styles.muted}>Date & Time</Text>
                  <Text style={styles.semibold}>
                    {bookingDetails.date}, {bookingDetails.time}
                  </Text>
                </View>
              </View>

              <View style={styles.dividerBlock}>
                <View style={styles.rowBetween}>
                  <Text style={styles.muted}>Service Price</Text>
                  <Text style={styles.semibold}>₹{bookingDetails.price}</Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text style={{ color: '#16a34a', fontWeight: '600' }}>Discount</Text>
                  <Text style={{ color: '#16a34a', fontWeight: '600' }}>-₹{bookingDetails.discount}</Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text style={styles.muted}>Tax & Fees</Text>
                  <Text style={styles.semibold}>₹{bookingDetails.tax}</Text>
                </View>
                <View style={[styles.rowBetween, styles.totalTop]}>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalValue}>₹{totalAmount}</Text>
                </View>
              </View>
            </View>

            {/* Promo Code */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Promo Code</Text>
              <View style={styles.promoRow}>
                <TextInput
                  style={styles.promoInput}
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChangeText={setPromoCode}
                  placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity style={styles.promoBtn}>
                  <Text style={styles.promoBtnText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Payment Methods */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Payment Method</Text>

              {paymentMethods.map((m) => {
                const active = selectedPayment === m.id;
                return (
                  <TouchableOpacity
                    key={m.id}
                    onPress={() => setSelectedPayment(m.id)}
                    activeOpacity={0.9}
                    style={[styles.methodRow, active ? styles.methodActive : styles.methodIdle]}
                  >
                    <View style={styles.methodIconWrap}>
                      <m.icon size={20} color={active ? '#001f3f' : '#6b7280'} />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.methodTitle}>{m.title}</Text>
                      <Text style={styles.methodSub}>{m.subtitle}</Text>
                    </View>

                    {active && (
                      <View style={styles.checkWrap}>
                        <Check size={14} color="#fff" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Security Info */}
            <View style={styles.secureCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.secureIcon}>
                  <Shield size={16} color="#22c55e" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.secureTitle}>100% Secure Payment</Text>
                  <Text style={styles.secureSub}>Your payment information is encrypted and secure</Text>
                </View>
              </View>
            </View>

            <View style={{ height: 100 }} />
          </View>
        </ScrollView>

        {/* Pay Now Button */}
        <View style={[styles.footer, { width: isTablet ? '60%' : '100%', alignSelf: isTablet ? 'flex-end' : 'stretch' }]}>
          <TouchableOpacity onPress={handlePayment} activeOpacity={0.9} style={styles.payBtn}>
            <Text style={styles.payBtnText}>Pay ₹{totalAmount}</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: Platform.select({ ios: 22, android: 22, default: 24 }),
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.3,
    lineHeight: Platform.select({ ios: 26, android: 26, default: 28 }),
    flexShrink: 1,
  },
  headerSubtitle: {
    fontSize: Platform.select({ ios: 12, android: 12, default: 13 }),
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    lineHeight: Platform.select({ ios: 16, android: 16, default: 18 }),
    flexShrink: 1,
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

  // Card
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  muted: {
    color: '#64748b',
    fontSize: 14,
  },
  semibold: {
    color: '#0f172a',
    fontWeight: '600',
    fontSize: 14,
  },

  dividerBlock: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    marginTop: 12,
    paddingTop: 12,
    gap: 8,
  },
  totalTop: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#001f3f',
  },

  // Promo
  promoRow: {
    flexDirection: 'row',
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 15,
    color: '#0f172a',
  },
  promoBtn: {
    backgroundColor: '#001f3f',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'center',
  },
  promoBtnText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  // Methods
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1.5,
  },
  methodIdle: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
  },
  methodActive: {
    backgroundColor: '#e0f2fe',
    borderColor: '#001f3f',
    borderWidth: 2,
  },
  methodIconWrap: {
    width: 40,
    height: 40,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  methodSub: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  checkWrap: {
    width: 24,
    height: 24,
    backgroundColor: '#001f3f',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Secure info
  secureCard: {
    backgroundColor: '#ecfdf5',
    borderColor: '#d1fae5',
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  secureIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#d1fae5',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  secureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#065f46',
  },
  secureSub: {
    fontSize: 12,
    color: '#059669',
    marginTop: 4,
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  payBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: '#001f3f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
