
import React from 'react';
import { useRouter } from 'expo-router';
import {
  Calendar,
  ChevronRight,
  CreditCard,
  FileText,
  Gift,
  Heart,
  CircleHelp as HelpCircle,
  LogOut,
  Settings,
  Star,
  User,
  Bell,
  Shield,
  Wallet,
  MapPin,
} from 'lucide-react-native';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CARD_SHADOW =
  Platform.OS === 'android'
    ? { elevation: 2 }
    : {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      };

export default function ProfileScreen() {
  const router = useRouter();

  const profileStats = [
    { label: 'Bookings', value: '12', icon: Calendar },
    { label: 'Reviews', value: '8', icon: Star },
    { label: 'Saved', value: '₹2,400', icon: Wallet },
  ];

  const menuItems = [
    { title: 'Edit Profile', icon: User, route: '/profile/edit-profile' },
    { title: 'My Addresses', icon: MapPin, route: '/profile/addresses' },
    { title: 'Favorites', icon: Heart, route: '/profile/favorites' },
    { title: 'Payment Methods', icon: CreditCard, route: '/profile/payment-methods' },
    { title: 'Gift Cards', icon: Gift, route: '/profile/gift-cards' },
    { title: 'Notifications', icon: Bell, route: '/profile/notifications' },
    { title: 'Privacy & Security', icon: Shield, route: '/profile/privacy' },
    { title: 'Settings', icon: Settings, route: '/profile/settings' },
    { title: 'Help & Support', icon: HelpCircle, route: '/profile/help' },
    { title: 'Terms & Conditions', icon: FileText, route: '/terms-conditions' },
  ];

  const MenuItem = ({ title, icon: Icon, route }) => (
    <TouchableOpacity 
      style={[styles.menuItem, CARD_SHADOW]} 
      onPress={() => router.push(route)} 
      activeOpacity={0.7}
    >
      <View style={styles.menuIconWrap}>
        <Icon size={20} color="#1e3a8a" />
      </View>
      <Text style={styles.menuText}>{title}</Text>
      <ChevronRight size={20} color="#cbd5e1" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.heading}>Profile</Text>

          {/* Profile Card */}
          <View style={[styles.card, styles.cardPad, CARD_SHADOW]}>
            <View style={styles.profileRow}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }}
                style={styles.avatar}
                resizeMode="cover"
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>Beautiful User</Text>
                <Text style={styles.phone}>+91 98****5678</Text>
                <Text style={styles.badge}>Premium Member ⭐</Text>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              {profileStats.map((stat, idx) => (
                <View key={idx} style={styles.statCol}>
                  <View style={styles.statIconBox}>
                    <stat.icon size={18} color="#1e3a8a" />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Menu Items */}
          <View style={{ marginBottom: 24 }}>
            {menuItems.map((item, idx) => (
              <MenuItem key={idx} title={item.title} icon={item.icon} route={item.route} />
            ))}
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={[styles.logoutItem, CARD_SHADOW]}
            onPress={() => router.replace('/')}
            activeOpacity={0.7}
          >
            <View style={styles.logoutIconWrap}>
              <LogOut size={20} color="#dc2626" />
            </View>
            <Text style={styles.logoutText}>Logout</Text>
            <ChevronRight size={20} color="#fca5a5" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  scroll: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 },
  heading: { fontSize: 28, fontWeight: '800', color: '#0f172a', marginBottom: 20 },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 24,
  },
  cardPad: { padding: 20 },

  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 72, height: 72, borderRadius: 36, marginRight: 16, backgroundColor: '#e5e7eb' },
  name: { fontSize: 20, fontWeight: '800', color: '#0f172a', marginBottom: 4 },
  phone: { color: '#64748b', fontSize: 14, marginBottom: 4 },
  badge: { color: '#1e3a8a', fontSize: 13, fontWeight: '600' },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  statCol: { alignItems: 'center' },
  statIconBox: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  statValue: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  statLabel: { fontSize: 12, color: '#64748b', marginTop: 2 },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  menuIconWrap: {
    width: 44,
    height: 44,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#0f172a' },

  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    marginBottom: 40,
  },
  logoutIconWrap: {
    width: 44,
    height: 44,
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  logoutText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#dc2626' },
});
