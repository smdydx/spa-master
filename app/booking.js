
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function BookingScreen() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const services = [
    { id: 1, name: 'Hair Styling', duration: '1 hour', price: 800, image: '💇‍♀️' },
    { id: 2, name: 'Facial Treatment', duration: '45 mins', price: 1200, image: '🧴' },
    { id: 3, name: 'Full Body Massage', duration: '90 mins', price: 2000, image: '💆‍♀️' },
    { id: 4, name: 'Manicure + Pedicure', duration: '1.5 hours', price: 600, image: '💅' },
  ];

  const dates = [
    { id: 1, date: 'Today',    day: '15', available: true  },
    { id: 2, date: 'Tomorrow', day: '16', available: true  },
    { id: 3, date: 'Wed',      day: '17', available: true  },
    { id: 4, date: 'Thu',      day: '18', available: false },
    { id: 5, date: 'Fri',      day: '19', available: true  },
  ];

  const times = [
    '9:00 AM','10:30 AM','12:00 PM','1:30 PM',
    '3:00 PM','4:30 PM','6:00 PM','7:30 PM',
  ];

  const canBook = !!(selectedService && selectedDate && selectedTime);

  const handleBookNow = () => {
    if (canBook) router.push('/payment');
  };

  const NavySection = () => (
    <LinearGradient
      colors={['#1e3a8a', '#3b82f6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.navySection, isTablet && styles.navySectionTablet]}
    >
      <SafeAreaView style={styles.navyContent}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.navyHeader}>
          <Text style={styles.navyTitle}>Book Your{'\n'}Perfect Session</Text>
          <Text style={styles.navySubtitle}>Choose your service, date & time</Text>
        </View>

        <View style={styles.salonCard}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg' }}
            style={styles.salonImage}
            resizeMode="cover"
          />
          <View style={styles.salonInfo}>
            <Text style={styles.salonName}>Bliss Spa & Salon</Text>
            <View style={styles.salonMeta}>
              <View style={styles.ratingRow}>
                <Star size={14} color="#fbbf24" fill="#fbbf24" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
              <View style={styles.locationRow}>
                <MapPin size={12} color="rgba(255,255,255,0.7)" />
                <Text style={styles.locationText}>0.5 km away</Text>
              </View>
            </View>
            <Text style={styles.salonAddress}>Koramangala 5th Block, Bangalore</Text>
          </View>
        </View>

        {selectedService && selectedDate && selectedTime && (
          <View style={styles.quickSummary}>
            <Text style={styles.quickSummaryTitle}>Selected</Text>
            <Text style={styles.quickSummaryText}>{selectedService.name}</Text>
            <Text style={styles.quickSummaryText}>{selectedDate.date} {selectedDate.day} • {selectedTime}</Text>
            <Text style={styles.quickSummaryPrice}>₹{selectedService.price}</Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );

  const FormSection = () => (
    <View style={[styles.formSection, isTablet && styles.formSectionTablet]}>
      <ScrollView 
        style={styles.formScroll} 
        contentContainerStyle={styles.formScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Service</Text>
          {services.map((service) => {
            const active = selectedService?.id === service.id;
            return (
              <TouchableOpacity
                key={service.id}
                onPress={() => setSelectedService(service)}
                activeOpacity={0.9}
                style={[
                  styles.serviceRow,
                  active ? styles.serviceRowActive : styles.serviceRowIdle,
                ]}
              >
                <Text style={styles.serviceEmoji}>{service.image}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceMeta}>{service.duration}</Text>
                </View>
                <Text style={styles.servicePrice}>₹{service.price}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row' }}>
              {dates.map((d, idx) => {
                const active = selectedDate?.id === d.id;
                const disabled = !d.available;
                return (
                  <TouchableOpacity
                    key={d.id}
                    disabled={disabled}
                    onPress={() => d.available && setSelectedDate(d)}
                    activeOpacity={0.9}
                    style={[
                      styles.dateChip,
                      idx !== dates.length - 1 && { marginRight: 12 },
                      disabled && styles.dateChipDisabled,
                      active && styles.dateChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dateChipTextTop,
                        disabled && styles.textMuted,
                        active && styles.textOnPrimary,
                      ]}
                    >
                      {d.date}
                    </Text>
                    <Text
                      style={[
                        styles.dateChipTextBottom,
                        disabled && styles.textMuted,
                        active && styles.textOnPrimary,
                      ]}
                    >
                      {d.day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {times.map((t) => {
              const active = selectedTime === t;
              return (
                <TouchableOpacity
                  key={t}
                  onPress={() => setSelectedTime(t)}
                  activeOpacity={0.9}
                  style={[
                    styles.timeChip,
                    active ? styles.timeChipActive : styles.timeChipIdle,
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      active ? styles.textOnPrimary : styles.timeTextIdle,
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Booking Summary */}
        {selectedService && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            <View style={{ gap: 8 }}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>Service</Text>
                <Text style={styles.summaryVal}>{selectedService.name}</Text>
              </View>
              {selectedDate && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryKey}>Date</Text>
                  <Text style={styles.summaryVal}>
                    {selectedDate.date} {selectedDate.day}
                  </Text>
                </View>
              )}
              {selectedTime && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryKey}>Time</Text>
                  <Text style={styles.summaryVal}>{selectedTime}</Text>
                </View>
              )}
              <View style={styles.summaryTotalRow}>
                <Text style={styles.summaryTotalLabel}>Total</Text>
                <Text style={styles.summaryTotalValue}>₹{selectedService.price}</Text>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Book Now Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleBookNow}
          disabled={!canBook}
          activeOpacity={0.9}
          style={[styles.bookBtn, !canBook ? styles.bookBtnDisabled : styles.bookBtnActive]}
        >
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isTablet ? (
        <View style={styles.tabletLayout}>
          <NavySection />
          <FormSection />
        </View>
      ) : (
        <>
          <NavySection />
          <FormSection />
        </>
      )}
    </View>
  );
}

const CARD_SHADOW =
  Platform.OS === 'android'
    ? { elevation: 1 }
    : { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  tabletLayout: { flex: 1, flexDirection: 'row' },

  // Navy Section
  navySection: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 24,
    paddingTop: 0,
    minHeight: '35%',
  },
  navySectionTablet: {
    width: '40%',
    minHeight: '100%',
  },
  navyContent: {
    flex: 1,
  },
  backBtn: {
    marginTop: 8,
    marginBottom: 16,
    padding: 8,
    alignSelf: 'flex-start',
  },
  navyHeader: {
    marginBottom: 24,
  },
  navyTitle: {
    fontSize: Platform.select({ ios: 26, android: 26, default: 28 }),
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: Platform.select({ ios: 32, android: 32, default: 34 }),
  },
  navySubtitle: {
    fontSize: Platform.select({ ios: 13, android: 13, default: 14 }),
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
  },

  // Salon Card
  salonCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 16,
  },
  salonImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  salonInfo: {
    gap: 6,
  },
  salonName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  salonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  salonAddress: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  // Quick Summary
  quickSummary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  quickSummaryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  quickSummaryText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 2,
  },
  quickSummaryPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fbbf24',
    marginTop: 6,
  },

  // Form Section
  formSection: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formSectionTablet: {
    width: '60%',
  },
  formScroll: {
    flex: 1,
  },
  formScrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },

  // Sections
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },

  // Service rows
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...CARD_SHADOW,
  },
  serviceRowIdle: { borderWidth: 1, borderColor: '#f3f4f6' },
  serviceRowActive: { borderWidth: 2, borderColor: '#1e3a8a' },
  serviceEmoji: { fontSize: 28, marginRight: 12 },
  serviceName: { fontSize: 15, fontWeight: '700', color: '#111827' },
  serviceMeta: { fontSize: 13, color: '#6b7280' },
  servicePrice: { fontSize: 16, fontWeight: '800', color: '#1e3a8a' },

  // Date chips
  dateChip: {
    width: 80,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    backgroundColor: '#ffffff',
  },
  dateChipActive: { backgroundColor: '#1e3a8a', borderColor: '#1e3a8a' },
  dateChipDisabled: { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' },
  dateChipTextTop: { fontSize: 13, fontWeight: '600', color: '#111827' },
  dateChipTextBottom: { marginTop: 4, fontSize: 16, fontWeight: '800', color: '#111827' },
  textOnPrimary: { color: '#ffffff' },
  textMuted: { color: '#9ca3af' },

  // Time chips
  timeChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  timeChipIdle: { backgroundColor: '#ffffff', borderColor: '#e5e7eb' },
  timeChipActive: { backgroundColor: '#1e3a8a', borderColor: '#1e3a8a' },
  timeText: { fontSize: 13, fontWeight: '700' },
  timeTextIdle: { color: '#374151' },

  // Summary
  summaryCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  summaryTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryKey: { color: '#6b7280' },
  summaryVal: { color: '#111827', fontWeight: '600' },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 4,
  },
  summaryTotalLabel: { fontSize: 16, fontWeight: '700', color: '#111827' },
  summaryTotalValue: { fontSize: 16, fontWeight: '800', color: '#1e3a8a' },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  bookBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookBtnActive: { backgroundColor: '#1e3a8a' },
  bookBtnDisabled: { backgroundColor: '#d1d5db' },
  bookBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});
