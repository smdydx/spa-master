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
    ? { elevation: 1 }
    : {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      };

export default function ProfileScreen() {
  const router = useRouter();

  const profileStats = [
    { label: 'Bookings', value: '12', icon: Calendar },
    { label: 'Reviews', value: '8', icon: Star },
    { label: 'Saved', value: '₹2,400', icon: CreditCard },
  ];

  const menuItems = [
    { title: 'Edit Profile', icon: User, onPress: () => console.log('Edit Profile') },
    { title: 'Favorites', icon: Heart, onPress: () => console.log('Favorites') },
    { title: 'Gift Cards', icon: Gift, onPress: () => console.log('Gift Cards') },
    { title: 'Settings', icon: Settings, onPress: () => console.log('Settings') },
    { title: 'Help & Support', icon: HelpCircle, onPress: () => console.log('Help') },
    { title: 'Terms & Conditions', icon: FileText, onPress: () => router.push('/terms-conditions') },
  ];

  const MenuItem = ({ title, icon: Icon, onPress }) => (
    <TouchableOpacity style={[styles.menuItem, CARD_SHADOW]} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.menuIconWrap}>
        <Icon size={20} color="#6b7280" />
      </View>
      <Text style={styles.menuText}>{title}</Text>
      <ChevronRight size={20} color="#d1d5db" />
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
                    <stat.icon size={18} color="#a855f7" />
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
              <MenuItem key={idx} title={item.title} icon={item.icon} onPress={item.onPress} />
            ))}
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={[styles.logoutItem, CARD_SHADOW]}
            onPress={() => router.replace('/')}
            activeOpacity={0.9}
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
  safe: { flex: 1, backgroundColor: '#FEF9F3' }, // gray-50
  scroll: { flex: 1 },
  container: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24 },
  heading: { fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 16 },

  // Card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6', // gray-100
    marginBottom: 24,
  },
  cardPad: { padding: 16 },

  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 12, backgroundColor: '#e5e7eb' },
  name: { fontSize: 18, fontWeight: '800', color: '#111827' },
  phone: { color: '#4b5563', marginTop: 2 },
  badge: { color: '#7c3aed', fontSize: 12, marginTop: 4 },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  statCol: { alignItems: 'center' },
  statIconBox: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '800', color: '#111827' },
  statLabel: { fontSize: 12, color: '#4b5563' },

  // Menu
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 12,
  },
  menuIconWrap: {
    width: 40,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#111827' },

  // Logout
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff1f2', // red-50
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fee2e2', // red-100
    marginBottom: 40,
  },
  logoutIconWrap: {
    width: 40,
    height: 40,
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoutText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#dc2626' },
});