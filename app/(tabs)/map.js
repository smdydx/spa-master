
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, X, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Lazy load MapView only on native platforms
let MapView = null;
let Marker = null;
let PROVIDER_GOOGLE = null;

if (Platform.OS !== 'web') {
  try {
    const maps = require('react-native-maps');
    MapView = maps.default;
    Marker = maps.Marker;
    PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
  } catch (error) {
    console.warn('react-native-maps not available:', error);
  }
}

export default function MapViewScreen() {
  const [selectedSpa, setSelectedSpa] = useState(null);
  const router = useRouter();

  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const nearbySpas = [
    {
      id: 1,
      name: 'Bliss Spa & Salon',
      rating: 4.8,
      distance: '0.5 km',
      address: 'Koramangala 5th Block, Bangalore',
      image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg',
      services: ['Hair Styling', 'Facial', 'Manicure'],
      priceRange: '₹500-2000',
      isOpen: true,
      coordinate: { latitude: 12.9352, longitude: 77.6245 },
    },
    {
      id: 2,
      name: 'Zen Wellness Center',
      rating: 4.9,
      distance: '1.2 km',
      address: 'Indiranagar 100 Feet Road, Bangalore',
      image: 'https://images.pexels.com/photos/3968056/pexels-photo-3968056.jpeg',
      services: ['Full Body Massage', 'Aromatherapy'],
      priceRange: '₹800-3000',
      isOpen: true,
      coordinate: { latitude: 12.9716, longitude: 77.6412 },
    },
    {
      id: 3,
      name: 'Glamour Studio',
      rating: 4.7,
      distance: '2.1 km',
      address: 'MG Road, Bangalore',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
      services: ['Nail Art', 'Pedicure', 'Eyebrow'],
      priceRange: '₹300-1500',
      isOpen: false,
      coordinate: { latitude: 12.9716, longitude: 77.5946 },
    },
    {
      id: 4,
      name: 'Serenity Day Spa',
      rating: 4.6,
      distance: '3.8 km',
      address: 'Brigade Road, Bangalore',
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg',
      services: ['Deep Tissue', 'Hot Stone'],
      priceRange: '₹1000-4000',
      isOpen: true,
      coordinate: { latitude: 12.9698, longitude: 77.6025 },
    },
  ];

  const renderMapView = () => {
    // Show static map on web with interactive salon list
    if (Platform.OS === 'web') {
      return (
        <View style={styles.webMapPlaceholder}>
          <MapPin size={64} color="#1e3a8a" strokeWidth={1.5} />
          <Text style={styles.webMapText}>Interactive Map</Text>
          <Text style={styles.webMapSubtext}>Browse nearby salons below and select to view details</Text>
        </View>
      );
    }

    if (!MapView) {
      return (
        <View style={styles.webMapPlaceholder}>
          <MapPin size={64} color="#1e3a8a" strokeWidth={1.5} />
          <Text style={styles.webMapText}>Map not available</Text>
          <Text style={styles.webMapSubtext}>Browse nearby salons below</Text>
        </View>
      );
    }

    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
        showsMyLocationButton
      >
        {nearbySpas.map((spa) => (
          <Marker
            key={spa.id}
            coordinate={spa.coordinate}
            onPress={() => setSelectedSpa(spa)}
          >
            <View style={[styles.marker, { backgroundColor: spa.isOpen ? '#22c55e' : '#9ca3af' }]}>
              <Text style={styles.markerText}>₹</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.mapContainer}>
        {renderMapView()}

        {selectedSpa && (
          <View style={styles.selectedCard}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setSelectedSpa(null)}
              activeOpacity={0.7}
            >
              <X size={20} color="#6b7280" strokeWidth={2.5} />
            </TouchableOpacity>

            <View style={styles.cardContent}>
              <Image source={{ uri: selectedSpa.image }} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{selectedSpa.name}</Text>
                <View style={styles.ratingRow}>
                  <Star size={14} color="#fbbf24" fill="#fbbf24" strokeWidth={0} />
                  <Text style={styles.ratingText}>{selectedSpa.rating}</Text>
                  <View style={[styles.statusDot, { backgroundColor: selectedSpa.isOpen ? '#22c55e' : '#ef4444' }]} />
                  <Text style={styles.statusText}>{selectedSpa.isOpen ? 'Open' : 'Closed'}</Text>
                </View>
                <Text style={styles.cardAddress} numberOfLines={1}>{selectedSpa.address}</Text>
                <Text style={styles.cardPrice}>{selectedSpa.priceRange} • {selectedSpa.distance}</Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.directionBtn]}
                activeOpacity={0.8}
              >
                <Text style={styles.directionBtnText}>Get Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.bookBtn]}
                activeOpacity={0.8}
                onPress={() => router.push(`/salon-details/${selectedSpa.id}`)}
              >
                <Text style={styles.bookBtnText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Nearby Salons ({nearbySpas.length})</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {nearbySpas.map((spa) => (
            <TouchableOpacity
              key={spa.id}
              style={styles.listCard}
              activeOpacity={0.9}
              onPress={() => {
                setSelectedSpa(spa);
                if (Platform.OS !== 'web' && MapView) {
                  setRegion({
                    ...spa.coordinate,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  });
                }
              }}
            >
              <Image source={{ uri: spa.image }} style={styles.listImage} />
              <View style={styles.listContent}>
                <Text style={styles.listName} numberOfLines={1}>{spa.name}</Text>
                <View style={styles.listRating}>
                  <Star size={12} color="#fbbf24" fill="#fbbf24" strokeWidth={0} />
                  <Text style={styles.listRatingText}>{spa.rating}</Text>
                </View>
                <Text style={styles.listDistance}>{spa.distance} away</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const CARD_SHADOW =
  Platform.OS === 'android'
    ? { elevation: 4 }
    : { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  webMapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    padding: 20,
  },
  webMapText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e3a8a',
    marginTop: 16,
    textAlign: 'center',
  },
  webMapSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...CARD_SHADOW,
  },
  markerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  selectedCard: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    ...CARD_SHADOW,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#e5e7eb',
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
    marginRight: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  cardAddress: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  directionBtn: {
    backgroundColor: '#eff6ff',
  },
  directionBtnText: {
    color: '#1e3a8a',
    fontWeight: '700',
    fontSize: 14,
  },
  bookBtn: {
    backgroundColor: '#1e3a8a',
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  listContainer: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 16,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    ...CARD_SHADOW,
  },
  horizontalList: {
    paddingLeft: 16,
  },
  listCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    ...CARD_SHADOW,
  },
  listImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#e5e7eb',
  },
  listContent: {
    padding: 12,
  },
  listName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  listRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  listRatingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  listDistance: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
  },
});
