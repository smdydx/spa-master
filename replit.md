# OMBARO - Beauty & Wellness Hub

## Overview
OMBARO is a comprehensive React Native/Expo application for managing beauty and wellness services. It's a multi-role platform that connects customers with spa, salon, and wellness service providers.

## Project Type
- **Framework**: Expo (React Native for Web)
- **Language**: JavaScript
- **UI**: React Native with NativeWind (Tailwind CSS)
- **Routing**: Expo Router (file-based routing)

## Purpose
This application serves as a marketplace and management platform for beauty and wellness services, providing:

### For Customers:
- Browse and book spa/salon services
- Find nearby wellness centers
- Track bookings and orders
- View and manage user profiles
- Access service reviews and ratings

### For Service Providers (Vendors):
- Manage spa/salon listings
- Handle service offerings
- Process bookings and appointments
- Manage therapists and staff
- View analytics and performance metrics
- Track revenue and customer insights

### For Staff:
- **Employees**: Attendance tracking, leave management, self-service portal
- **Therapists**: Schedule management, assignment tracking, performance reviews
- **Admins**: Full platform administration and oversight
- **Departments**: Departmental management and workflows

## Recent Changes

**November 1, 2025** - Complete Home Screen Redesign (Web App Reference Implementation):
- Completely redesigned home screen (app/(tabs)/index.js) to match professional web app reference (https://obidua-ombaro-import-t3w0.bolt.host/)
- Changed color scheme from rose gold to navy blue + white gradient theme for professional MNC look
- Implemented hero carousel with 4 service categories (Massage, Bridal Makeup, Hair Salon, Skincare)
- Added statistics section with gradient cards (50,000+ Customers, 500+ Vendors, 1,000+ Services, 25+ Cities)
- Implemented "Why Choose OMBARO?" features section with 4 key features (Find Nearby, Easy Booking, Verified Professionals, Secure Payments)
- Created services grid with 6 service categories, each with professional stock images
- Added customer testimonials section with horizontal scroll
- Implemented CTA (Call-to-Action) banner section
- Downloaded 12 professional stock images from Pexels for services showcase
- Fixed deprecated style property (outline -> outlineStyle) in phone-register.js
- All sections use professional navy blue (#1e3a8a, #3b82f6) + white gradients with proper shadows and elevations

**October 29, 2025** - Initial Replit setup and configuration:
- Installed all npm dependencies
- Configured Expo to run on port 5000 with LAN host
- Created workflow for Expo web server
- Fixed babel configuration issue (kept simple config compatible with Expo)
- Configured deployment settings for static export (autoscale with static files)
- Application successfully running without errors
- Note: Tailwind CSS warnings in console are expected (Metro bundler doesn't natively process @tailwind directives, but styles work via react-native-web)

## Project Structure
```
app/
  ├── (tabs)/          # Main tabbed navigation
  ├── Admin/           # Admin interface and authentication
  ├── auth/            # Customer authentication flows
  ├── Department/      # Department portal
  ├── Employee/        # Employee portal with quick actions
  ├── Partner/         # Partner/vendor signup
  ├── Therapist/       # Therapist portal
  ├── Vendor/          # Vendor management dashboard
  ├── index.js         # Welcome/landing page
  └── globals.css      # Global Tailwind styles

assets/              # Images and static assets
constants/           # Theme and configuration constants
hooks/               # Custom React hooks
```

## Key Features
- Multi-role authentication system
- Service booking and management
- Real-time location tracking
- Payment processing
- Analytics and reporting
- Review and rating system
- Attendance and leave management
- Schedule and assignment tracking

## Technology Stack
- **Core**: Expo ~53.0.23, React 19.0.0, React Native 0.79.5
- **Navigation**: Expo Router ~5.1.7, React Navigation
- **Styling**: NativeWind, Tailwind CSS 3.3.2
- **UI Components**: Lucide React Native icons, Expo Vector Icons
- **Features**: 
  - expo-camera (QR scanning)
  - expo-location (geolocation)
  - expo-image-picker (media upload)
  - react-native-webview (embedded content)
  - react-native-reanimated (animations)

## Development
The application runs in development mode with:
- Hot reloading enabled
- Metro bundler for JavaScript compilation
- Expo Dev Tools for debugging
- Web preview on port 5000

## Deployment
Configured for autoscale deployment:
- Build: `npx expo export --platform web`
- Output: Static files in `dist/` directory
- Server: Served with `npx serve` on port 5000

## User Preferences
None specified yet.

## Project Architecture
- **File-based routing**: Using Expo Router for automatic route generation
- **Component architecture**: Functional components with React Hooks
- **Styling approach**: Utility-first with NativeWind/Tailwind CSS
- **State management**: React hooks (useState, useEffect, useRef)
- **Animation**: React Native Animated API with Linear Gradients
- **Platform**: Cross-platform (iOS, Android, Web) with web as primary target

## Notes
- The app uses TypeScript setup disabled via EXPO_NO_TYPESCRIPT_SETUP environment variable
- Some package versions differ from Expo's recommendations but are compatible
- NativeWind provides Tailwind CSS utilities for React Native styling
- The application includes multi-language support capability through the routing structure
