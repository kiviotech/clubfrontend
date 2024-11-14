import React, { useState } from "react";
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

const Checkout = () => {
  const router = useRouter();
  const { shippingInfo, setShippingInfo, setShippingId } = useStore();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null); // Store selected address
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const params = useLocalSearchParams();
  const [orderItemCreated, setOrderItemCreated] = useState(0);

  const { id } = params;
  let Order_item_created = [];

  const cartItems = useCartStore((state) => state.items);

  const handlePress = () => {
    router.back();
  };

  const handlePayment = async () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
      return;
    }

    try {
      const orderId = 1;
      // Using Promise.all to wait for all the createOrder calls to complete
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
        //setOrderItemCreated(prevState => [...prevState, response.data.id]);

        setOrderItemCreated(response.data.id);
        // console.log('abc', orderItemCreated);
      });

      // Wait for all promises to resolve
      await Promise.all(promises);
      // alert("All items have been successfully added to the order.");
    } catch (error) {
      console.error("Error creating order items:", error);
      alert("Failed to create order items.");
    }
  };

  // console.log("object", orderItemCreated);

  // const handlepay = () => {
  //   if (selectedAddress) {
  //     // Pass selected address to the Payment page
  //     const encodedOrderItem = encodeURIComponent(
  //       JSON.stringify(orderItemCreated)
  //     );
  //     router.push(`/pages/payment?orderItemCreated=${encodedOrderItem}`);
  //     // router.push({
  //     //   pathname: "/pages/payment",
  //     // });
  //     console.log("huu", orderItemCreated);
  //   } else {
  //     alert("Please select an address!");
  //   }
  // };

  const handlepay = () => {
    if (selectedAddress) {
      console.log("Order page id:", orderItemCreated);

      if (orderItemCreated) {
        const encodedOrderItem = encodeURIComponent(
          JSON.stringify(orderItemCreated)
        );
        router.push(`/pages/payment?orderItemCreated=${encodedOrderItem}`);
        console.log("Navigating with Order Item:", orderItemCreated);
      } else {
        // console.error("Order item is not defined.");
      }
    } else {
      alert("Please select an address!");
    }
  };

  // const handleAddAddress = async () => {
  //   const data = {

  //     Fullname: fullName,
  //     Address: address,
  //     state: state,
  //     pincode: parseInt(pincode),
  //     phone_no: phoneNo,
  //   };

  //   try {
  //     await createShippingInfo({ data });
  //     setShippingInfo(data);
  //     setAddresses([...addresses, data]);
  //     setModalVisible(false);
  //   } catch (error) {
  //     console.error("Error submitting shipping info:", error);
  //     alert("Failed to submit shipping information.");
  //   }
  // };

  const handleAddAddress = async () => {
    const data = {
      Fullname: fullName,
      Address: address,
      state: state,
      pincode: parseInt(pincode),
      phone_no: phoneNo,
    };

    try {
      // Assuming createShippingInfo returns the created shipping information including the ID
      const response = await createShippingInfo({ data });

      // Extracting the shipping ID from the response and storing it
      const shippingId = response.data.data.id; // Adjust according to your actual response format
      // console.log(shippingId)
      // Store the full shipping info and shipping ID in Zustand
      setShippingInfo(data);
      setShippingId(shippingId);

      setAddresses([...addresses, data]);
      setModalVisible(false);
    } catch (error) {
      console.error("Error submitting shipping info:", error);
      alert("Failed to submit shipping information.");
    }
  };

  const handleContinueToPayment = () => {
    handlepay();
    handlePayment();
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

          {addresses.length > 0 && (
            <View style={styles.savedAddress}>
              {addresses.map((address, index) => (
                <View key={index} style={styles.savedTextContainer}>
                  <View key={index} style={styles.savedContainer}>
                    <Text style={styles.savedText}>
                      Full Name: {address.Fullname}
                    </Text>
                    <Text style={styles.savedText}>
                      Address: {address.Address}
                    </Text>
                    <Text style={styles.savedText}>State: {address.state}</Text>
                    <Text style={styles.savedText}>
                      Pincode: {address.pincode}
                    </Text>
                    <Text style={styles.savedText}>
                      Phone No.: {address.phone_no}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => {
                      // Toggle the selection of the address
                      if (selectedAddress === address) {
                        setSelectedAddress(null); // Deselect if it's already selected
                      } else {
                        setSelectedAddress(address); // Select the clicked address
                      }
                      if (address.id) {
                        console.log("Selected Address ID:", address.id);
                      }
                    }}
                  >
                    <Ionicons
                      name={
                        selectedAddress === address
                          ? "checkmark-circle"
                          : "radio-button-off"
                      }
                      size={30}
                      color={selectedAddress === address ? "#8FFA09" : "#fff"} // Green for selected, white for unselected
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add Address</Text>
          </TouchableOpacity>

          {addresses.length > 0 && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleContinueToPayment}
            >
              <Text style={styles.buttonText}>Continue to Payment</Text>
            </TouchableOpacity>
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)} // Ensure this works on Android back button
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    console.log("Close button pressed"); // Check if this fires
                    setModalVisible(false); // Close the modal
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
    // backgroundColor: "#8FFA09",
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
    marginVertical: 10,
    // backgroundColor: "#8FFA09",
    borderRadius: 10,
    marginHorizontal: 20,
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
    // backgroundColor: "#FF4500",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: "center",
    // borderWidth: 2,
    // borderColor: "#fff",
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
