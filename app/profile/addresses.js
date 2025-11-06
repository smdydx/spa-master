
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
import { ArrowLeft, MapPin, Plus, Edit2, Trash2, Home, Briefcase } from 'lucide-react-native';

export default function Addresses() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  const addresses = [
    {
      id: 1,
      type: 'Home',
      icon: Home,
      address: '123, MG Road, Bangalore',
      landmark: 'Near Metro Station',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Work',
      icon: Briefcase,
      address: '456, Cyber City, Gurgaon',
      landmark: 'DLF Phase 2',
      isDefault: false,
    },
  ];

  const AddressCard = ({ item }) => (
    <View style={styles.addressCard}>
      <View style={styles.addressHeader}>
        <View style={styles.typeTag}>
          <item.icon size={14} color="#001f3f" />
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
        {item.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
      </View>
      <Text style={styles.addressText}>{item.address}</Text>
      <Text style={styles.landmarkText}>Landmark: {item.landmark}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Edit2 size={16} color="#001f3f" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]}>
          <Trash2 size={16} color="#dc2626" />
          <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
        </TouchableOpacity>
      </View>
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
            <Text style={styles.headerTitle}>My Addresses</Text>
            <Text style={styles.headerSubtitle}>Manage your saved locations</Text>
          </View>

          {/* Icon Section */}
          <View style={styles.iconSection}>
            <View style={styles.iconWrapper}>
              <MapPin size={56} color="#FFFFFF" strokeWidth={1.5} />
            </View>
            <Text style={styles.iconText}>{addresses.length} Saved Addresses</Text>
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
            {addresses.map((item) => (
              <AddressCard key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>

        {/* Add Button */}
        <TouchableOpacity style={[styles.addBtn, { bottom: isTablet ? 20 : 20, left: isTablet ? '40%' : 20 }]}>
          <Plus size={24} color="#fff" />
          <Text style={styles.addBtnText}>Add New Address</Text>
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

  addressCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#001f3f',
    marginLeft: 6,
  },
  defaultBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  defaultText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#16a34a',
  },
  addressText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 6,
  },
  landmarkText: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#e0f2fe',
  },
  deleteBtn: {
    backgroundColor: '#fef2f2',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#001f3f',
    marginLeft: 6,
  },
  deleteText: {
    color: '#dc2626',
  },

  addBtn: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#001f3f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
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
  addBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 8,
  },
});
