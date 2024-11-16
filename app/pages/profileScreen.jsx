import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  
    const navigation = useNavigation();
    const { profile = '', name = 'Default Name', username = 'DefaultUsername' } = useLocalSearchParams();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name); // State for edited name
    const [editedUsername, setEditedUsername] = useState(username);

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    // Handle Save
    const handleSave = () => {
        // Here you can handle the save action, e.g., update the profile data
        console.log('Saving...', editedName, editedUsername);
        setIsEditing(false); // Exit edit mode after saving
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
            {/* Profile Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
                <TouchableOpacity onPress={toggleEditMode}>
                    <Text style={styles.editText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
                </TouchableOpacity>
            </View>

            {/* Profile Picture */}
            <View style={styles.profileImageContainer}>
                <View style={styles.profilePlaceholder}>
                    <Icon name="person-outline" size={60} color="#fff" />
                </View>
                <TouchableOpacity style={styles.cameraIcon}>
                    <Icon name="camera-outline" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Name Input or Display */}
            <View style={styles.inputContainer}>
                {isEditing ? (
                    <TextInput
                        style={[styles.input, isEditing && styles.inputEditing]} // Conditionally apply border style
                        value={editedName}
                        onChangeText={setEditedName}
                        placeholder="Enter your name"
                        placeholderTextColor="#fff"
                    />
                ) : (
                    <Text style={styles.input}>{editedName}</Text>
                )}
            </View>

            {/* Username Input or Display */}
            <View style={styles.inputContainer}>
                {isEditing ? (
                    <TextInput
                        style={[styles.input, isEditing && styles.inputEditing]} // Conditionally apply border style
                        value={editedUsername}
                        onChangeText={setEditedUsername}
                        placeholder="Enter your username"
                        placeholderTextColor="#fff"
                    />
                ) : (
                    <Text style={styles.input}>{editedUsername}</Text>
                )}
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    backButton: {
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '600',
    },
    editText: {
        color: '#8FFA09',
        fontSize: 16,
        fontWeight: '500',
    },
    profileImageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profilePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: '30%',
        backgroundColor: '#8FFA09',
        borderRadius: 15,
        padding: 5,
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderRadius: 5,
        padding: 15,
        fontSize: 16,
    },
    inputEditing: {
        borderWidth: 2,
        borderColor: '#8FFA09',
    },
    saveButton: {
        backgroundColor: '#8FFA09',
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
