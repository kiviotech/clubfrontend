import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import useRequestDetailsStore from '../../src/store/useRequestDetailsStore';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

const DetailRequest = () => {
    const requestDetails = useRequestDetailsStore((state) => state.requestDetails); // Access stored details
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0); // To track the current image in the carousel

    const handleImageScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / (width * 0.8));
        setCurrentIndex(index);
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity 
                onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    }
                }} 
                style={styles.backButton}
            >
                <Ionicons name="arrow-back" color="white" size={20} />
            </TouchableOpacity>

            {/* Carousel Section */}
            <View style={styles.carouselContainer}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleImageScroll}
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    snapToInterval={width * 0.8}
                    contentContainerStyle={{ paddingHorizontal: (width * 0.1) / 2 }}
                >
                    {requestDetails.image.map((imgUrl, index) => (
                        <Image
                            key={index}
                            source={{ uri: imgUrl }}
                            style={styles.carouselImage}
                        />
                    ))}
                </ScrollView>
                <Text style={styles.carouselIndex}>
                    {currentIndex + 1} / {requestDetails.image.length}
                </Text>
            </View>

            {/* Details Section */}
            <View style={styles.details}>
                <Text style={styles.heading}>Design Details :</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Title :</Text> {requestDetails.title}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Description : </Text> {requestDetails.description}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Select Type : </Text>{requestDetails.selectType}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Color : </Text> {requestDetails.colorPreferences}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Deadline : </Text> {requestDetails.deadline}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Budget : </Text> {requestDetails.budget}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Contact Number : </Text>{requestDetails.contactNumber}</Text>

                <Text style={styles.heading}>Measurement Details :</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Size:</Text> {requestDetails.size}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Chest Measurement : </Text>{requestDetails.chest}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Waist Measurement : </Text> {requestDetails.waist}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Special Instruction : </Text>{requestDetails.special_instructions}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212', // Dark background
    },
    backButton: {
        padding: 10,
    },
    carouselContainer: {
        height: 200,
        marginBottom: 20,
    },
    carouselImage: {
        width: width * 0.8,
        height: '100%',
        borderRadius: 10,
        marginHorizontal: 10,
        resizeMode: 'cover',
    },
    carouselIndex: {
        textAlign: 'center',
        color: '#FFFFFF',
        marginTop: 10,
        fontSize: 16,
    },
    details: {
        marginBottom: 20,
    },
    heading: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
    label: {
        fontWeight: 'bold',
        color: '#8FFA09',
    },
    detailText: {
        color: '#FFF',
        fontSize: 14,
        marginBottom: 6,
    },
});

export default DetailRequest;
