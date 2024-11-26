import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { getShippingInfoByUserId ,createShippingInfo, deleteShippingInfo,updateShippingInfo } from '../../src/api/repositories/shippingInfoRepository';
import useStore from '../../src/store/useStore';
import useUserDataStore from '../../src/store/userData';

const ChangeAddress = () => {

    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [shippingInfos, setShippingInfos] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { shippingInfo, setShippingInfo, setShippingId } = useStore();
    const [addresses, setAddresses] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const userId = useUserDataStore((state) => state.users[0]?.id);

    const [errors, setErrors] = useState({
        fullName: '',
        address: '',
        state: '',
        pincode: '',
        phoneNo: '',
    });

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

    const handleAddOrUpdateAddress = async () => {
        setErrors({ fullName: '', address: '', state: '', pincode: '', phoneNo: '' });

        let valid = true;
        const errorMessages = {};

        if (!fullName) {
            valid = false;
            errorMessages.fullName = "Name is required";
        }

        if (!address) {
            valid = false;
            errorMessages.address = "Address is required";
        }

        if (!state) {
            valid = false;
            errorMessages.state = "State is required";
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
            if (isEditing) {
                // Update existing address
                await updateShippingInfo(editingAddressId, { data });
                alert("Address updated successfully!");
            } else {
                // Create a new address
                const response = await createShippingInfo({ data });
                const shippingId = response.data.data.id;
                setShippingInfo(data);
                setShippingId(shippingId);
                alert("Address added successfully!");
            }
    
            // Refetch the updated shipping info
            const updatedShippingInfos = await getShippingInfoByUserId(userId);
            setShippingInfos(updatedShippingInfos.data.data);
    
            // Reset form and state
            resetForm();
        } catch (error) {
            console.error("Error submitting shipping info:", error);
            alert("Failed to submit shipping information.");
        }
    };
    

      const handleEditShippingInfo = (info) => {
        setIsEditing(true);
        setEditingAddressId(info.documentId); // Set the ID of the address being edited
        setFullName(info.Fullname);
        setAddress(info.Address);
        setState(info.state);
        setPincode(info.pincode.toString());
        setPhoneNo(info.phone_no);
      };

      const resetForm = () => {
        setFullName("");
        setAddress("");
        setState("");
        setPincode("");
        setPhoneNo("");
        setIsEditing(false);
        setEditingAddressId(null);
      };
    
    const handleDeleteShippingInfo = async (documentId) => {
        try {
            await deleteShippingInfo(documentId);
            setShippingInfos((prevShippingInfos) =>
                prevShippingInfos.filter((info) => info.documentId !== documentId)
            );
            alert("Shipping info deleted successfully!");
        } catch (error) {
            console.error("Error deleting shipping info:", error);
            alert("Failed to delete shipping info.");
        }
    };




    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Change Address</Text>

            {/* Name */}
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#AAAAAA"
                value={fullName}
                onChangeText={setFullName}
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

            {/* Address */}
            <Text style={styles.label}>Address</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your address"
                placeholderTextColor="#AAAAAA"
                value={address}
                onChangeText={setAddress}
            />
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

            {/* State and Pincode */}
            <View style={styles.row}>
                <View style={{ width: '48%' }}>
                    <Text style={styles.label}>State</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Enter state"
                        placeholderTextColor="#AAAAAA"
                        value={state}
                        onChangeText={setState}
                    />
                    {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
                </View>
                <View style={{ width: '48%' }}>
                    <Text style={styles.label}>Pincode</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Enter pincode"
                        placeholderTextColor="#AAAAAA"
                        value={pincode}
                        onChangeText={setPincode}
                        keyboardType="numeric"
                    />
                    {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
                </View>
            </View>

            {/* Phone Number */}
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                placeholderTextColor="#AAAAAA"
                value={phoneNo}
                onChangeText={setPhoneNo}
                keyboardType="phone-pad"
            />
            {errors.phoneNo && <Text style={styles.errorText}>{errors.phoneNo}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleAddOrUpdateAddress}>
                <Text style={styles.buttonText}>{isEditing ? "Update Address" : "Save Address"}</Text>
            </TouchableOpacity>

            <ScrollView style={styles.savedAddress}>
                {shippingInfos.length > 0 ? (
                    shippingInfos.map((info, index) => (
                        <View key={index} style={styles.savedTextContainer}>
                            <View style={styles.savedTextbox}>
                                <View style={styles.TextContainer}>
                                    <Text style={styles.savedText}>Full Name: {info.Fullname}</Text>
                                    <Text style={styles.savedText}>Address: {info.Address}</Text>
                                    <Text style={styles.savedText}>State: {info.state}</Text>
                                    <Text style={styles.savedText}>Pincode: {info.pincode}</Text>
                                    <Text style={styles.savedText}>Phone No.: {info.phone_no}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.selectButton}
                                    onPress={() => {
                                        if (selectedAddress === info) {
                                            setSelectedAddress(null); // Deselect if already selected
                                        } else {
                                            setSelectedAddress(info); // Select address
                                        }
                                    }}
                                >
                                    <Ionicons
                                        name={selectedAddress === info ? "checkmark-circle" : "radio-button-off"}
                                        size={30}
                                        color={selectedAddress === info ? "#8FFA09" : "#fff"} // Green for selected, white for unselected
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.editButton} onPress={() => handleEditShippingInfo(info)}>
                  <Ionicons name="create" size={30} color="#8FFA09" />
                </TouchableOpacity>
                             

                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteShippingInfo(info.documentId)}>
                                    <Ionicons name="trash" size={30} color="#FF3B30" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    ))
                ) : (
                    <Text style={styles.savedText}>No shipping information available</Text>
                )}

            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    backButton: {
        marginTop: 5,
        marginBottom: 10
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#333333',
        color: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#8FFA09',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    savedTextbox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    savedAddress: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        flexDirection: "column"
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
        flexDirection: "column",
        justifyContent: "space-between",
    },
    TextContainer: {
        justifyContent: "space-evenly",
        flexDirection: "column",
    },
    savedText: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 5,
    },
    selectButton: {
        marginLeft: 10,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        alignSelf: "center",
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    editButton: {
        marginRight: 10,
        paddingVertical: 10,
        // paddingHorizontal: 20,
    },
    deleteButton: {
        paddingVertical: 10,
        // paddingHorizontal: 20,
    },
    errorText:{
        color:"red",
        fontSize:10,
    }
});

export default ChangeAddress;
