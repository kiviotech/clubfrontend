import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

export default function ImageTest() {
  console.log('[DEBUG] ImageTest component rendering');
  
  // Test different image loading approaches
  const approaches = [
    {
      name: 'Direct require',
      source: require('../../assets/Picture2.png'),
    },
    {
      name: 'Web URI',
      source: { uri: '/assets/Picture2.png' },
    },
    {
      name: 'Platform-specific',
      source: Platform.OS === 'web' 
        ? { uri: '/assets/Picture2.png' }
        : require('../../assets/Picture2.png'),
    },
  ];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Loading Test</Text>
      <Text style={styles.subtitle}>Platform: {Platform.OS}</Text>
      
      {approaches.map((approach, index) => {
        console.log(`[DEBUG] Testing approach: ${approach.name}`);
        
        return (
          <View key={index} style={styles.testCase}>
            <Text style={styles.approachName}>{approach.name}</Text>
            <View style={styles.imageContainer}>
              <Image
                source={approach.source}
                style={styles.image}
                onLoad={() => console.log(`[DEBUG] Image loaded: ${approach.name}`)}
                onError={(e) => console.error(`[DEBUG] Image error (${approach.name}):`, e.nativeEvent.error)}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#222',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#8FFA09',
    marginBottom: 20,
  },
  testCase: {
    marginBottom: 20,
  },
  approachName: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  imageContainer: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
}); 