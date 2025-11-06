
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Mail, MessageSquare, Gift } from 'lucide-react-native';

export default function Notifications() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  const [settings, setSettings] = useState({
    pushBooking: true,
    pushOffers: true,
    pushReminders: false,
    emailBooking: true,
    emailOffers: false,
    smsReminders: true,
  });

  const NotificationItem = ({ title, description, icon: Icon, value, onChange }) => (
    <View style={styles.notifItem}>
      <View style={styles.iconWrap}>
        <Icon size={20} color="#001f3f" />
      </View>
      <View style={styles.notifContent}>
        <Text style={styles.notifTitle}>{title}</Text>
        <Text style={styles.notifDesc}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
        thumbColor={value ? '#001f3f' : '#f1f5f9'}
      />
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
            <Text style={styles.headerTitle}>Notifications</Text>
            <Text style={styles.headerSubtitle}>Manage your preferences</Text>
          </View>

          {/* Icon Section */}
          <View style={styles.iconSection}>
            <View style={styles.iconWrapper}>
              <Bell size={56} color="#FFFFFF" strokeWidth={1.5} />
            </View>
            <Text style={styles.iconText}>Stay Updated</Text>
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
            <Text style={styles.sectionTitle}>Push Notifications</Text>
            <NotificationItem
              title="Booking Updates"
              description="Get notified about booking confirmations and updates"
              icon={Bell}
              value={settings.pushBooking}
              onChange={(val) => setSettings({ ...settings, pushBooking: val })}
            />
            <NotificationItem
              title="Offers & Promotions"
              description="Receive exclusive deals and promotions"
              icon={Gift}
              value={settings.pushOffers}
              onChange={(val) => setSettings({ ...settings, pushOffers: val })}
            />
            <NotificationItem
              title="Appointment Reminders"
              description="Get reminded before your appointments"
              icon={Bell}
              value={settings.pushReminders}
              onChange={(val) => setSettings({ ...settings, pushReminders: val })}
            />

            <Text style={styles.sectionTitle}>Email Notifications</Text>
            <NotificationItem
              title="Booking Confirmations"
              description="Receive booking details via email"
              icon={Mail}
              value={settings.emailBooking}
              onChange={(val) => setSettings({ ...settings, emailBooking: val })}
            />
            <NotificationItem
              title="Promotional Emails"
              description="Get updates about new services and offers"
              icon={Mail}
              value={settings.emailOffers}
              onChange={(val) => setSettings({ ...settings, emailOffers: val })}
            />

            <Text style={styles.sectionTitle}>SMS Notifications</Text>
            <NotificationItem
              title="SMS Reminders"
              description="Get text reminders for your bookings"
              icon={MessageSquare}
              value={settings.smsReminders}
              onChange={(val) => setSettings({ ...settings, smsReminders: val })}
            />
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 8,
    marginBottom: 16,
  },

  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  notifDesc: {
    fontSize: 13,
    color: '#64748b',
  },
});
