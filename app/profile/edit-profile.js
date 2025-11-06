
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, User, Mail, Phone, MapPin, Save } from 'lucide-react-native';

export default function EditProfile() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  
  const [form, setForm] = useState({
    name: 'Beautiful User',
    email: 'user@example.com',
    phone: '+91 9876543210',
    address: 'Mumbai, Maharashtra',
  });

  const handleSave = () => {
    // Save logic here
    router.back();
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
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <Text style={styles.headerSubtitle}>Update your personal information</Text>
          </View>

          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
                <LinearGradient
                  colors={['#60a5fa', '#3b82f6']}
                  style={styles.cameraBtnGradient}
                >
                  <Camera size={16} color="#fff" strokeWidth={2.5} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Text style={styles.avatarText}>Tap to change photo</Text>
          </View>
        </View>

        {/* White Form Section */}
        <ScrollView 
          style={[
            styles.whiteSection,
            {
              width: isTablet ? '60%' : '100%',
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <View style={styles.formInner}>
              {/* Full Name */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputWrap}>
                  <View style={styles.iconBox}>
                    <User size={18} color="#001f3f" strokeWidth={2.5} />
                  </View>
                  <TextInput
                    style={styles.input}
                    value={form.name}
                    onChangeText={(val) => setForm({ ...form, name: val })}
                    placeholder="Enter your name"
                    placeholderTextColor="#94a3b8"
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputWrap}>
                  <View style={styles.iconBox}>
                    <Mail size={18} color="#001f3f" strokeWidth={2.5} />
                  </View>
                  <TextInput
                    style={styles.input}
                    value={form.email}
                    onChangeText={(val) => setForm({ ...form, email: val })}
                    placeholder="Enter your email"
                    placeholderTextColor="#94a3b8"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              {/* Phone */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.inputWrap}>
                  <View style={styles.iconBox}>
                    <Phone size={18} color="#001f3f" strokeWidth={2.5} />
                  </View>
                  <TextInput
                    style={styles.input}
                    value={form.phone}
                    onChangeText={(val) => setForm({ ...form, phone: val })}
                    placeholder="Enter your phone"
                    placeholderTextColor="#94a3b8"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Address */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Address</Text>
                <View style={[styles.inputWrap, styles.addressInput]}>
                  <View style={styles.iconBox}>
                    <MapPin size={18} color="#001f3f" strokeWidth={2.5} />
                  </View>
                  <TextInput
                    style={[styles.input, styles.addressTextInput]}
                    value={form.address}
                    onChangeText={(val) => setForm({ ...form, address: val })}
                    placeholder="Enter your address"
                    placeholderTextColor="#94a3b8"
                    multiline
                    numberOfLines={2}
                  />
                </View>
              </View>

              {/* Save Button */}
              <TouchableOpacity style={styles.saveBtn} activeOpacity={0.9} onPress={handleSave}>
                <LinearGradient
                  colors={['#001f3f', '#003366']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.saveBtnGradient}
                >
                  <Save size={20} color="#fff" strokeWidth={2.5} />
                  <Text style={styles.saveBtnText}>Save Changes</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const SHADOW = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  android: {
    elevation: 4,
  },
  default: {},
});

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
  avatarSection: {
    alignItems: 'center',
    zIndex: 1,
    marginBottom: 10,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#e5e7eb',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    overflow: 'hidden',
    ...SHADOW,
  },
  cameraBtnGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.3,
  },

  // White Form Section
  whiteSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    padding: 24,
    paddingTop: 32,
  },
  formInner: {
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#001f3f',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14,
    minHeight: 56,
  },
  addressInput: {
    minHeight: 76,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '600',
  },
  addressTextInput: {
    paddingTop: 8,
    textAlignVertical: 'top',
  },
  saveBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 12,
    ...SHADOW,
  },
  saveBtnGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
