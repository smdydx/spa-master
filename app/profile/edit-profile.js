
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
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, User, Mail, Phone, MapPin, Save, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function EditProfile() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: 'Beautiful User',
    email: 'user@example.com',
    phone: '+91 9876543210',
    address: 'Mumbai, Maharashtra',
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        {/* Backdrop */}
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={handleClose}
        />
        
        {/* Modal Content */}
        <View style={styles.modalContent}>
          <LinearGradient
            colors={['#1e3a8a', '#3b82f6', '#60a5fa']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          
          <SafeAreaView style={styles.safeContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleClose} style={styles.backBtn}>
                <X size={24} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Edit Profile</Text>
              <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
              <View style={styles.container}>
                <View style={styles.avatarSection}>
                  <View style={styles.avatarWrapper}>
                    <Image
                      source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }}
                      style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
                      <LinearGradient
                        colors={['#3b82f6', '#1e3a8a']}
                        style={styles.cameraBtnGradient}
                      >
                        <Camera size={18} color="#fff" strokeWidth={2.5} />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.avatarText}>Tap to change photo</Text>
                </View>

                <View style={styles.formCard}>
                  <View style={styles.form}>
                    <View style={styles.fieldGroup}>
                      <Text style={styles.label}>Full Name</Text>
                      <View style={styles.inputWrap}>
                        <View style={styles.iconBox}>
                          <User size={18} color="#3b82f6" strokeWidth={2.5} />
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

                    <View style={styles.fieldGroup}>
                      <Text style={styles.label}>Email Address</Text>
                      <View style={styles.inputWrap}>
                        <View style={styles.iconBox}>
                          <Mail size={18} color="#3b82f6" strokeWidth={2.5} />
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

                    <View style={styles.fieldGroup}>
                      <Text style={styles.label}>Phone Number</Text>
                      <View style={styles.inputWrap}>
                        <View style={styles.iconBox}>
                          <Phone size={18} color="#3b82f6" strokeWidth={2.5} />
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

                    <View style={styles.fieldGroup}>
                      <Text style={styles.label}>Address</Text>
                      <View style={[styles.inputWrap, styles.addressInput]}>
                        <View style={styles.iconBox}>
                          <MapPin size={18} color="#3b82f6" strokeWidth={2.5} />
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
                  </View>

                  <TouchableOpacity style={styles.saveBtn} activeOpacity={0.9} onPress={handleClose}>
                    <LinearGradient
                      colors={['#3b82f6', '#1e3a8a']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.saveBtnGradient}
                    >
                      <View style={styles.saveBtnIcon}>
                        <Save size={20} color="#fff" strokeWidth={2.5} />
                      </View>
                      <Text style={styles.saveBtnText}>Save Changes</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const SHADOW = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  android: {
    elevation: 6,
  },
  default: {},
});

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.85,
    maxWidth: 400,
    backgroundColor: '#fff',
    ...SHADOW,
  },
  safeContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingTop: 8,
  },

  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#e5e7eb',
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...SHADOW,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 22,
    overflow: 'hidden',
    ...SHADOW,
  },
  cameraBtnGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
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

  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    ...SHADOW,
  },
  form: {
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14,
    minHeight: 58,
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
    backgroundColor: '#eff6ff',
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
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOW,
  },
  saveBtnGradient: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnIcon: {
    marginRight: 8,
  },
  saveBtnText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
