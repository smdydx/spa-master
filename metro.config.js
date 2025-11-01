const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  resolveRequest: (context, moduleName, platform) => {
    // Prevent react-native-maps from being resolved on web
    if (platform === 'web' && moduleName === 'react-native-maps') {
      return {
        type: 'empty',
      };
    }

    // Use default resolver for everything else
    return context.resolveRequest(context, moduleName, platform);
  },
};

// Add image extensions to asset extensions
config.resolver.assetExts.push(
  // Image formats
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'bmp',
  'psd',
  'svg',
  'tiff'
);

module.exports = config;