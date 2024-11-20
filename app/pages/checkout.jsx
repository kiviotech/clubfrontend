import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import CheckoutStep from "./checkoutstep";
import Totalamount from "./totalamount";
import { createShippingInfo } from "../../src/api/repositories/shippingInfoRepository";
import useStore from "../../src/store/useStore";
import useCheckoutStore from "../../src/store/useCheckoutStore";
import {
  createOrder,
  createOrderItem,
} from "../../src/api/services/orderItemService";
import useCartStore from "../../src/store/useCartStore";
import { getShippingInfoByUserId } from "../../src/api/repositories/shippingInfoRepository";

const Checkout = () => {
  const router = useRouter();
  const { shippingInfo, setShippingInfo, setShippingId } = useStore();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const params = useLocalSearchParams();
  const [createdOrderItems, setCreatedOrderItems] = useState([]);
  const [shippingInfos, setShippingInfos] = useState([]);
  const cartItems = useCartStore((state) => state.items);

  const handlePress = () => {
    router.back();
  };

  const userId = 23;
  useEffect(() => {
    const fetchShippingInfos = async () => {
      try {
        const response = await getShippingInfoByUserId(userId);
        setShippingInfos(response.data.data);
      } catch (error) {
        console.error("Error fetching shipping info", error);
      }
    };

    fetchShippingInfos();
  }, [userId]);

  const handlePayment = async () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
      return;
    }

    try {
      const orderId = 1;
      const createdItems = [];

      const promises = cartItems.map(async (item) => {
        const orderItemData = {
          data: {
            quantity: item.quantity || 1,
            price: item.price || 1,
            subtotal: (item.quantity || 1) * (item.price || 1),
            product: item.id,
            order: orderId,
            locale: "en",
          },
        };

        const response = await createOrder(orderItemData);
        createdItems.push(response.data.id);
      });

      await Promise.all(promises);
      setCreatedOrderItems(createdItems);
    } catch (error) {
      console.error("Error creating order items:", error);
      alert("Failed to create order items.");
    }
  };

  const handlepay = () => {
    if (selectedAddress) {
      console.log("Selected Address:", selectedAddress);
      console.log("Created Order Items:", createdOrderItems);

      if (createdOrderItems.length > 0) {
        const encodedOrderItems = encodeURIComponent(
          JSON.stringify(createdOrderItems)
        );
        router.push({
          pathname: "/pages/payment",
          params: {
            orderItemCreated: encodedOrderItems,
            selectedAddress: JSON.stringify(selectedAddress),
          },
        });
        console.log("Navigating with Order Items:", createdOrderItems);
      }
    } else {
      alert("Please select an address!");
    }
  };

  const handleAddAddress = async () => {
    const data = {
      Fullname: fullName,
      Address: address,
      state: state,
      pincode: parseInt(pincode),
      phone_no: phoneNo,
      user: userId,
    };

    try {
      const response = await createShippingInfo({ data });
      const shippingId = response.data.data.id;
      setShippingInfo(data);
      setShippingId(shippingId);

      // Update shippingInfos instead of addresses
      setShippingInfos([...shippingInfos, { ...data, id: shippingId }]);
      setModalVisible(false);

      // Clear form fields
      setFullName("");
      setAddress("");
      setState("");
      setPincode("");
      setPhoneNo("");
    } catch (error) {
      console.error("Error submitting shipping info:", error);
      alert("Failed to submit shipping information.");
    }
  };

  const handleContinueToPayment = () => {
    handlepay();
    handlePayment();
  };

  const handleSelectAddress = (info) => {
    setSelectedAddress(info);
    console.log("Selected Address ID:", info.id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePress} style={styles.icon}>
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Checkout</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <CheckoutStep currentPosition={0} />
          <View style={styles.box}>
            <Totalamount subtotal={200} delivery={50} />
          </View>

          <Text style={styles.sectionText}>Shipping Information</Text>

          <ScrollView style={styles.savedAddress}>
            {shippingInfos.length > 0 ? (
              shippingInfos.map((info, index) => (
                <View key={index} style={styles.savedTextContainer}>
                  <View style={styles.savedTextbox}>
                    <View style={styles.TextContainer}>
                      <Text style={styles.savedText}>
                        Full Name: {info.Fullname}
                      </Text>
                      <Text style={styles.savedText}>
                        Address: {info.Address}
                      </Text>
                      <Text style={styles.savedText}>State: {info.state}</Text>
                      <Text style={styles.savedText}>
                        Pincode: {info.pincode}
                      </Text>
                      <Text style={styles.savedText}>
                        Phone No.: {info.phone_no}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => handleSelectAddress(info)}
                  >
                    <Ionicons
                      name={
                        selectedAddress === info
                          ? "checkmark-circle"
                          : "radio-button-off"
                      }
                      size={30}
                      color={selectedAddress === info ? "#8FFA09" : "#fff"}
                    />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.savedText}>
                No shipping information available
              </Text>
            )}
          </ScrollView>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add Address</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleContinueToPayment}
          >
            <Text style={styles.buttonText}>Continue to Payment</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    console.log("Close button pressed");
                    setModalVisible(false);
                  }}
                >
                  <Ionicons name="close-circle" size={30} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.modalHeader}>Shipping Information</Text>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                />
                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                />
                <View style={styles.row}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>State</Text>
                    <TextInput
                      style={styles.input}
                      value={state}
                      onChangeText={setState}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Pincode</Text>
                    <TextInput
                      style={styles.input}
                      value={pincode}
                      onChangeText={setPincode}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <Text style={styles.inputLabel}>Phone No.</Text>
                <TextInput
                  style={styles.input}
                  value={phoneNo}
                  onChangeText={setPhoneNo}
                  keyboardType="phone-pad"
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleAddAddress}
                >
                  <Text style={styles.buttonText}>Save and Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 10,
  },
  icon: {
    marginTop: 4,
  },
  headerText: {
    color: "#fff",
    fontSize: 25,
    marginLeft: 15,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  box: {
    backgroundColor: "#919eab29",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionText: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  addButton: {
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    marginVertical: 10,
    width: 150,
  },
  addButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#8FFA09",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#333",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    color: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#555",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#8FFA09",
    borderRadius: 10,
    padding: 15,
    alignSelf: "center",
    width: 250,
    marginVertical: 30,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
  },
  savedAddress: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: -45,
  },
  savedTextContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#555",
    borderWidth: 2,
    borderColor: "#8FFA09",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  savedText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
  },
  selectButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: "center",
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
});

export default Checkout;
