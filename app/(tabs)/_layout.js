import { Tabs } from 'expo-router';
import { Calendar, Home, MapPin, User } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 70 : 60,
          paddingBottom: Platform.OS === 'ios' ? 8 : 6,
          paddingTop: 6,
          elevation: 10,
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarActiveTintColor: '#1e3a8a',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
          marginBottom: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 0,
          gap: 2,
        },
        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={22} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'My Bookings',
          tabBarIcon: ({ size, color }) => (
            <Calendar size={22} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Spa Near You',
          tabBarIcon: ({ size, color }) => (
            <MapPin size={22} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={22} color={color} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}