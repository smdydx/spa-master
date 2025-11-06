
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
import { ArrowLeft, Lock, Shield, Eye, Key, Trash2, ChevronRight } from 'lucide-react-native';

export default function Privacy() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  const MenuItem = ({ title, icon: Icon, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconWrap}>
        <Icon size={20} color="#001f3f" />
      </View>
      <Text style={styles.menuText}>{title}</Text>
      <ChevronRight size={20} color="#cbd5e1" />
    </TouchableOpacity>
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
            <Text style={styles.headerTitle}>Privacy</Text>
            <Text style={styles.headerSubtitle}>Security & privacy settings</Text>
          </View>

          {/* Icon Section */}
          <View style={styles.iconSection}>
            <View style={styles.iconWrapper}>
              <Shield size={56} color="#FFFFFF" strokeWidth={1.5} />
            </View>
            <Text style={styles.iconText}>Your Data is Safe</Text>
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
            <Text style={styles.sectionTitle}>Account Security</Text>
            <MenuItem title="Change Password" icon={Lock} onPress={() => {}} />
            <MenuItem title="Two-Factor Authentication" icon={Shield} onPress={() => {}} />
            <MenuItem title="Biometric Login" icon={Key} onPress={() => {}} />

            <Text style={styles.sectionTitle}>Privacy Settings</Text>
            <MenuItem title="Data & Privacy" icon={Eye} onPress={() => {}} />
            <MenuItem title="Download My Data" icon={Eye} onPress={() => {}} />
            
            <Text style={styles.sectionTitle}>Danger Zone</Text>
            <TouchableOpacity style={styles.dangerItem} activeOpacity={0.7}>
              <View style={styles.dangerIconWrap}>
                <Trash2 size={20} color="#dc2626" />
              </View>
              <Text style={styles.dangerText}>Delete Account</Text>
              <ChevronRight size={20} color="#fca5a5" />
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

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    backgroundColor: '#e0f2fe',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#0f172a' },

  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#fecaca',
    marginBottom: 12,
  },
  dangerIconWrap: {
    width: 40,
    height: 40,
    backgroundColor: '#fee2e2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dangerText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#dc2626' },
});
