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
import useOrderStore from "../../src/store/useOrderItemStore";
import useUserDataStore from "../../src/store/userData";

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
  const [shippingInfos, setShippingInfos] = useState([]);
  const cartItems = useCartStore((state) => state.items);
  
  const { addOrderItem } = useOrderStore();
  const userId = useUserDataStore((state) => state.users[0]?.id);

  useEffect(() => {
    if (!userId) {
      router.push("/sign-in");
    }
  }, [userId]);

  const handlePress = () => {
    router.back();
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  
  useEffect(() => {
    if (!userId) return; // Ensure userId is available before proceeding

    const fetchShippingInfos = async () => {
      try {
        const response = await getShippingInfoByUserId(userId);
        setShippingInfos(response.data.data);
      } catch (error) {
        // console.error("Error fetching shipping info", error);
      }
    };

    fetchShippingInfos();
  }, [userId]); // Re-fetch if userId changes


  const handlePayment = async () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
      return;
    }
  
    if (selectedAddress) {
      try {
        // Create a new promise to handle the payment flow
        const paymentPromise = new Promise(async (resolve, reject) => {
          const createdItems = [];
          const documentIds = []; // Array to store documentIds
  
          try {
            // Map over cart items to process each asynchronously
            const promises = cartItems.map(async (item) => {
              const orderItemData = {
                data: {
                  quantity: item.quantity || 1,
                  price: item.price || 1,
                  subtotal: (item.quantity || 1) * (item.price || 1),
                  product: item.id,
                  locale: "en",
                  size: item.size,
                },
              };
  
              // Await the creation of the order and store the result
              const response = await createOrder(orderItemData);
              createdItems.push(response.data.id);
              documentIds.push(response.data.documentId); // Push the documentId to array
  
              addOrderItem(response.data.id); // Store the order item ID
            });
  
            await Promise.all(promises); // Ensure all async operations complete
  
            resolve({ createdItems, documentIds }); // Resolve with the required data
          } catch (error) {
            reject(error); // Reject the promise if any errors occur
          }
        });
  
        const result = await paymentPromise; // Await the resolution of the promise
        const { createdItems, documentIds } = result;
  
        // Encode data for navigation
        const encodedOrderItems = encodeURIComponent(
          JSON.stringify(createdItems)
        );
        const encodedDocumentIds = encodeURIComponent(
          JSON.stringify(documentIds)
        );
  
        // Navigate to the payment page with parameters
        router.push({
          pathname: "/pages/payment",
          params: {
            orderItemCreated: encodedOrderItems,
            selectedAddress: JSON.stringify(selectedAddress),
            documentIds: encodedDocumentIds,
          },
        });
      } catch (error) {
        alert("Failed to create order items."); // Handle errors from promise
      }
    } else {
      alert("Please select an address!"); // Handle case of missing address
    }
  };
  

  // const documentIdOrderItem = response.data.documentId;
  // console.log("hello",docu)
  const [errors, setErrors] = useState({
    fullName: '',
    address: '',
    state: '',
    pincode: '',
    phoneNo: '',
  });


  const handleAddAddress = async () => {
    setErrors({ fullName: '', address: '', state: '', pincode: '', phoneNo: '' });
    let valid = true;
    const errorMessages = {};

    // Regular expressions for validation
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    const stateRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces

    // Validate fullName
    if (!fullName) {
      valid = false;
      errorMessages.fullName = "Name is required";
    } else if (!nameRegex.test(fullName)) {
      valid = false;
      errorMessages.fullName = "Name should only contain letters";
    }

    // Validate state
    if (!state) {
      valid = false;
      errorMessages.state = "State is required";
    } else if (!stateRegex.test(state)) {
      valid = false;
      errorMessages.state = "State should only contain letters";
    }

    if (!address) {
      valid = false;
      errorMessages.address = "Address is required";
    }

    if (!pincode || pincode.length !== 6) {
      valid = false;
      errorMessages.pincode = "Pincode should be 6 digits";
    }

    if (!phoneNo || phoneNo.length !== 10) {
      valid = false;
      errorMessages.phoneNo = "Phone number should be 10 digits";
    }

    if (!valid) {
      setErrors(errorMessages);
      return;
    }

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
      // console.error("Error submitting shipping info:", error);
      alert("Failed to submit shipping information.");
    }
  };


  const handleContinueToPayment = () => {
    handlePayment();
  };

  const handleSelectAddress = (info) => {
    setSelectedAddress(info);
    // console.log("Selected Address ID:", info.id);
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
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Ionicons name="close-circle" size={30} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.modalHeader}>Shipping Information</Text>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                />
                {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  style={[styles.input, styles.addressInput]}
                  value={address}
                  onChangeText={setAddress}
                  multiline={true} // Allows the text to wrap
                />
                {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

                <View style={styles.row}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>State</Text>
                    <TextInput
                      style={styles.input}
                      value={state}
                      onChangeText={setState}
                    />
                    {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Pincode</Text>
                    <TextInput
                      style={styles.input}
                      value={pincode}
                      onChangeText={setPincode}
                      keyboardType="numeric"
                    />
                    {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
                  </View>
                </View>
                <Text style={styles.inputLabel}>Phone No.</Text>
                <TextInput
                  style={styles.input}
                  value={phoneNo}
                  onChangeText={setPhoneNo}
                  keyboardType="phone-pad"
                />
                {errors.phoneNo && <Text style={styles.errorText}>{errors.phoneNo}</Text>}
                <TouchableOpacity style={styles.button} onPress={handleAddAddress}>
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
    position: "relative",
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
    textAlignVertical: "top", // Ensures proper alignment for multiline input
  },
  addressInput: {
    maxHeight: 100, // Restricts height to prevent overflow
    flexWrap: "wrap",
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
  savedTextbox: {
    flex: 1, // Ensures the text content takes the available space
    marginRight: 10, // Adds some spacing before the select button
  },
  savedText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
    flexWrap: "wrap",
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
    zIndex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 10,
    // marginBottom:10,
    // margin:0
  },
});

export default Checkout;
