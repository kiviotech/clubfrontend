import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

const loadingpage = () => {
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const startRotation = () => {
        Animated.loop(
          Animated.timing(rotation, {
            toValue: 1,
            duration: 2000, // 2 seconds for one full rotation
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();
      };
  
      startRotation();
    }, [rotation]);
  
    // Interpolating rotation value
    const rotate = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
  
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.linkedCircles, { transform: [{ rotate }] }]}>
          <View style={[styles.circle, styles.circleFirst]} />
          <View style={[styles.circle, styles.circleSecond]} />
        </Animated.View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#00ff00", // Bright green background
    },
    linkedCircles: {
      width: 100,
      height: 100,
      position: "relative",
    },
    circle: {
      position: "absolute",
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 5,
      borderColor: "#fff", // White border
      backgroundColor: "transparent",
    },
    circleFirst: {
      left: -30, // Offset to the left
    },
    circleSecond: {
      right: -30, // Offset to the right
    },
  });

export default loadingpage