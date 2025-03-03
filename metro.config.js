const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts
      .filter((ext) => ext !== 'svg')
      .filter((ext) => ext !== 'db'),  // Remove 'db' from asset extensions
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  return config;
})();