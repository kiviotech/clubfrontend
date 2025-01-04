import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window'); // Get the screen width for responsive text size

const OrderSuccessScreen = () => {

    const router = useRouter();
    const [opacity] = useState(new Animated.Value(0));
    const [scale] = useState(new Animated.Value(0.8));
    const [bounce] = useState(new Animated.Value(0));

    // UseEffect
    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        Animated.timing(scale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        Animated.sequence([
            Animated.timing(bounce, {
                toValue: 1.5, // Increased bounce value for bigger effect
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(bounce, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        // Go to order page after 5 seconds
        const timer = setTimeout(() => {
            router.push('/pages/orderPage'); // Ensure the path is correct
        }, 4000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Animated.View
                    style={[ 
                        styles.iconContainer, 
                        {
                            opacity,
                            transform: [{ scale: bounce }],
                        }
                    ]}
                >
                    {/* Check icon with enhanced bounce effect */}
                    <AntDesign name="checkcircle" size={90} color="#8FFA09" />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.messageContainer,
                        {
                            opacity,
                            transform: [{ scale }],
                        },
                    ]}
                >
                    {/* Responsive text size with dynamic screen width */}
                    <Text style={[styles.message, { width: width - 40 }]}>
                        Your order has been placed successfully!
                    </Text>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    innerContainer: {
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 20,
    },
    messageContainer: {
        alignItems: 'center',
    },
    message: {
        fontSize: 18, // Base font size
        color: '#8FFA09',
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center', // Center-align text
    },
});

export default OrderSuccessScreen;
