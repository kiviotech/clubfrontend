import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import CustomizeCard from './CustomizeCard';
import { getCustomDesigns } from '../../src/api/repositories/customDesignRepository';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import Loading from './loading';

const CustomizePage = () => {
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();
    const router = useRouter();
    // const [isLoading, setIsLoading] = useState(true);

    
    

    useEffect(() => {
        // Fetch data from the API
        const fetchCustomDesigns = async () => {
            try {
                const response = await getCustomDesigns();
                // console.log(response.data.data[0].documentId)
                // console.log(response.data.data[0].id)
                const fetchedProducts = response.data.data.map((item) => ({
                    id: item.id,
                    documentId: item.documentId,
                    title: item.name, // Replace with `name` from API response
                    description: item.description, // Replace with `description` from API response
                    image: `${MEDIA_BASE_URL}${item.image.url}`, // Replace with `image.url` from API response
                }));
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchCustomDesigns();
    }, []);

    const handleHome = () => {
        router.push("/home");
    };

    // useEffect(() => {
    //     // Simulate delay and set loading to false when done
    //     setTimeout(() => {
    //       setIsLoading(false);
    //     }, 2000); // Adjust the delay as needed
    //   }, []);
    
    //   if (isLoading) {
    //     return <Loading />; // Show Loading component while loading
    //   }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    } else {
                        handleHome();
                    }
                }} style={styles.backButton}>
                    <Ionicons name="arrow-back" color="white" size={20} />
                </TouchableOpacity>
            </View>

            <Text style={styles.heading}>What Would You Like to Customize ? </Text>
            <Text style={styles.description}>Pick a Product to Start designing . </Text>
            {products.map((product, index) => (
                <CustomizeCard
                    key={index}
                    id={product.id} // Passing `id` to the CustomizeCard
                    documentId={product.documentId}
                    title={product.title} // Passing `title` to the CustomizeCard
                    description={product.description} // Passing `description`
                    image={product.image} // Passing `image`
                    onLearnMore={() => console.log(`${product.title} Learn More`)}
                    onCustomize={() => console.log(`${product.title} Customize`)}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        // padding: 10,
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
        paddingLeft: 15,
        paddingTop: 20
    },
    description: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 10,
        paddingLeft: 15
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 20,
    },
    backButton: {
        padding: 10,
    },
});

export default CustomizePage