import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import useLogoutStateStore from '../../src/store/useLogoutStateStore';

const LoggedOutScreen = () => {
  const router = useRouter();
  const [opacity] = useState(new Animated.Value(0));
  const [scale] = useState(new Animated.Value(0.8));
  const { setLoggedOut } = useLogoutStateStore();

  // UseEffect
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

    // Go to sign-in after 3 seconds
    const timer = setTimeout(() => {
      // Set isLoggedOut to false before navigating to the sign-in page
      setLoggedOut(false);

      console.log('Navigating to Sign-In');
      router.push('/sign-in'); // Ensure the path is correct
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, setLoggedOut]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          opacity,
          transform: [{ scale }],
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <AntDesign name="logout" size={30} color="#8FFA09" />
        <Text style={styles.message}>Successfully Logged Out!</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  message: {
    fontSize: 22,
    color: '#8FFA09',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default LoggedOutScreen;
