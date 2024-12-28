import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated,SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Ensure this matches correctly

const LoggedOutScreen = () => {
  // Animated values for opacity and scale
  const [opacity] = useState(new Animated.Value(0));
  const [scale] = useState(new Animated.Value(0.8));

  // Animation effect on component mount
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(scale, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          opacity,
          transform: [{ scale }],
          flexDirection: 'row', // Align icon and text horizontally
          alignItems: 'center', // Vertically center content
        }}
      >
        <AntDesign name="logout" size={30} color="#8FFA09" /> {/* Green Icon */}
        <Text style={styles.message}>Successfully Logged Out!</Text> {/* Green Text */}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: 'black', // Black background
  },
  message: {
    fontSize: 22,
    color: '#8FFA09', // Green text
    fontWeight: 'bold', // Bold text
    marginLeft: 10, // Space between icon and text
  },
});

export default LoggedOutScreen;
