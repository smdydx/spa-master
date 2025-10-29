
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

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
