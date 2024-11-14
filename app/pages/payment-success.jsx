import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CheckoutStep from "./checkoutstep";
import Svgs from "../../constants/svgs";

export default function PaymentSuccess() {
  let router = useRouter();
  const handlePress = () => {
    router.back();
  };

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timeout = setTimeout(() => {
      router.push("/pages/receipt");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [opacity, scale]);
  return (
    <SafeAreaView className="h-full px-3 bg-black">
      <View className="flex flex-row h-12 w-full p-2 items-center">
        <TouchableOpacity onPress={handlePress} className="mt-0.5">
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
        <Text style={styles.headertext} className="ml-4">
          Payment
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          <CheckoutStep currentPosition={1} />

          <View style={styles.centerContent}>
            <Animated.View
              style={[
                styles.iconContainer,
                { opacity, transform: [{ scale }] },
              ]}
            >
              <Svgs.success style={{ margin: "auto" }} />
            </Animated.View>
            <Animated.Text style={[styles.success, { opacity: opacity }]}>
              Payment Successful
            </Animated.Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headertext: {
    color: "#fff",
    fontSize: 25,
  },
  text: {
    color: "#fff",
    fontSize: 25,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  success: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 150,
    height: 150,
  },
});
