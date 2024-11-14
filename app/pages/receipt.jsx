import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CheckoutStep from "./checkoutstep";
import { useRouter } from "expo-router";
import Svgs from "../../constants/svgs";

const Receipt = () => {
  let router = useRouter();
  const handlePress = () => {
    router.back();
  };

  const handleGetReceipt = () => {
    // get the PDF receipt
  };

  const handleDone = () => {
    // Done
  };

  return (
    <>
      <SafeAreaView className="h-full px-3 bg-black">
        <View className="flex flex-row h-12 w-full p-2 items-center">
          <TouchableOpacity onPress={handlePress} className="mt-0.5">
            <Ionicons name="arrow-back" color="white" size={30} />
          </TouchableOpacity>
          <Text style={styles.headertext} className="ml-4">
            Receipt
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, backgroundColor: "#000" }}>
            {/* Stepindicator */}
            <CheckoutStep currentPosition={2} />

            <View style={styles.box} className="m-7">
              <Svgs.success style={{ margin: "auto", width: 30 }} />
              <Text style={styles.text} className="m-auto">
                Payment Success!
              </Text>
              <Text style={styles.text} className="m-auto">
                INR 1,000,000
              </Text>
            </View>

            <View style={[styles.box, { marginHorizontal: 30 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.text} className="m-3">
                  Payment Details
                </Text>
                {/* <Svgs.back style={{ transform: 'rotate(90deg)' }} /> */}
              </View>

              <View style={styles.row}>
                <Text className="text-[#ccc]">Ref Number</Text>
                <Text className="text-[#ccc]">000085752257</Text>
              </View>

              <View style={styles.row}>
                <Text className="text-[#ccc]">Payment Status</Text>
                <Text style={styles.success} className="text-[#ccc]">
                  Success
                </Text>
              </View>

              <View style={styles.row}>
                <Text className="text-[#ccc]">Payment Time</Text>
                <Text className="text-[#ccc]">25-02-2023, 13:22:16</Text>
              </View>

              <View style={styles.dottedBottomBorder}></View>

              <View style={styles.row}>
                <Text className="text-[#ccc]">Total Payment</Text>
                <Text className="text-[#ccc]">INR 1,000.00</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.troubleButton}
              className="bg-secondary"
            >
              <Svgs.help style={styles.icon} />
              <View>
                <Text style={styles.troubleText}>
                  Trouble With Your Payment?
                </Text>
                <Text className="text-[#ccc]">
                  Let us know on help center now!
                </Text>
              </View>
              <Svgs.back style={{ width: 500, transform: "rotate(180deg)" }} />
            </TouchableOpacity>

            <View className="m-7">
              <TouchableOpacity
                style={styles.getReceiptButton}
                onPress={handleGetReceipt}
              >
                <Text style={styles.getReceiptText} className="text-[#8FFA09]">
                  Get PDF Receipt
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.getReceiptButton}
                className="bg-primary"
                onPress={handleDone}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Receipt;

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
  box: {
    backgroundColor: "#919eab29",
    borderRadius: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  success: {
    color: "#8FFA09",
  },
  dottedBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderStyle: "dashed",
  },
  troubleButton: {
    padding: 15,
    borderRadius: 10,
    margin: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  troubleText: {
    fontSize: 18,
    color: "#fff",
  },
  icon: {
    width: "100%",
  },
  getReceiptButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    borderColor: "#8FFA09",
    borderWidth: 1,
  },
  getReceiptText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
