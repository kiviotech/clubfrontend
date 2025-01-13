// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
// import CustomizeCard from './CustomizeCard';
// import { getCustomDesigns } from '../../src/api/repositories/customDesignRepository';
// import { MEDIA_BASE_URL } from '../../src/api/apiClient';
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation, useRouter } from "expo-router";
// import Loading from './loading';

// const CustomizePage = () => {
//     const [products, setProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isFetchingMore, setIsFetchingMore] = useState(false);
//     const [page, setPage] = useState(1); // To keep track of the current page for API calls

//     const navigation = useNavigation();
//     const router = useRouter();

//     // Fetch the products
//     const fetchCustomDesigns = async (pageNum) => {
//         try {
//             setIsFetchingMore(true);  // Set fetching flag to true when starting a new fetch request
//             const response = await getCustomDesigns(pageNum); // Call API with page number
//             const fetchedProducts = response.data.data.map((item) => ({
//                 id: item.id,
//                 documentId: item.documentId,
//                 title: item.name,
//                 description: item.description,
//                 image: `${MEDIA_BASE_URL}${item.image.url}`,
//             }));

//             setIsLoading(false);  // Stop loading spinner after fetch
//             setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]); // Append new products to existing products
//         } catch (error) {
//             console.error('Failed to fetch products:', error);
//             setIsLoading(false);  // Stop loading in case of error
//         } finally {
//             setIsFetchingMore(false);  // Stop the "fetching" flag once done
//         }
//     };

//     useEffect(() => {
//         fetchCustomDesigns(page); // Fetch products for the current page when component mounts
//     }, [page]);

//     // When user scrolls to the bottom, fetch more products
//     const loadMoreProducts = () => {
//         if (!isFetchingMore) {
//             setPage((prevPage) => prevPage + 1);  // Increment the page number to fetch more products
//         }
//     };

//     const handleHome = () => {
//         router.push("/home");
//     };

//     if (isLoading && page === 1) {
//         return <Loading />; // Show loading spinner only when the initial page is being fetched
//     }

//     return (
//         <ScrollView
//             style={styles.container}
//             onEndReached={loadMoreProducts} // Trigger loading more products on reaching the bottom
//             onEndReachedThreshold={0.1} // Trigger before reaching the bottom
//         >
//             <View style={styles.headerContainer}>
//                 <TouchableOpacity onPress={() => {
//                     if (navigation.canGoBack()) {
//                         navigation.goBack();
//                     } else {
//                         handleHome();
//                     }
//                 }} style={styles.backButton}>
//                     <Ionicons name="arrow-back" color="white" size={20} />
//                 </TouchableOpacity>
//             </View>

//             <Text style={styles.heading}>What Would You Like to Customize?</Text>
//             <Text style={styles.description}>Pick a Product to Start designing.</Text>

//             {products.length > 0 ? (
//                 products.map((product, index) => (
//                     <CustomizeCard
//                         key={index}
//                         id={product.id}
//                         documentId={product.documentId}
//                         title={product.title}
//                         description={product.description}
//                         image={product.image}
//                         onLearnMore={() => console.log(`${product.title} Learn More`)}
//                         onCustomize={() => console.log(`${product.title} Customize`)}
//                     />
//                 ))
//             ) : (
//                 <Text style={styles.noProductsText}>No products available</Text>
//             )}

//             {isFetchingMore && (
//                 <Text style={styles.loadingText}>Loading more products...</Text> // Display when loading more products
//             )}
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#121212',
//     },
//     heading: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginBottom: 5,
//         paddingLeft: 15,
//         paddingTop: 20,
//     },
//     description: {
//         fontSize: 14,
//         color: '#aaa',
//         marginBottom: 10,
//         paddingLeft: 15,
//     },
//     headerContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     backButton: {
//         padding: 10,
//     },
//     loadingText: {
//         color: 'white',
//         textAlign: 'center',
//         padding: 10,
//     },
//     noProductsText: {
//         color: 'white',
//         textAlign: 'center',
//         padding: 10,
//     }
// });

// export default CustomizePage;






// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
// import CustomizeCard from './CustomizeCard';
// import { getCustomDesigns } from '../../src/api/repositories/customDesignRepository';
// import { MEDIA_BASE_URL } from '../../src/api/apiClient';
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation, useRouter } from "expo-router";
// import Loading from './loading';

// const CustomizePage = () => {
//     const [products, setProducts] = useState([]);
//     const [loadedProductIds, setLoadedProductIds] = useState(new Set()); // To track unique product IDs
//     const [currentPage, setCurrentPage] = useState(1);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isFetchingMore, setIsFetchingMore] = useState(false);
//     const [hasMoreData, setHasMoreData] = useState(true);
//     const navigation = useNavigation();
//     const router = useRouter();

//     const fetchCustomDesigns = async (page) => {
//         try {
//             const response = await getCustomDesigns(page); // Pass the current page to the API
//             const fetchedProducts = response.data.data.map((item) => ({
//                 id: item.id,
//                 documentId: item.documentId,
//                 title: item.name,
//                 description: item.description,
//                 image: `${MEDIA_BASE_URL}${item.image.url}`,
//             }));

//             // Filter out duplicate products by ID
//             const uniqueProducts = fetchedProducts.filter(product => !loadedProductIds.has(product.id));

//             if (uniqueProducts.length === 0) {
//                 setHasMoreData(false); // No more new data
//             } else {
//                 // Update state
//                 setProducts((prevProducts) => [...prevProducts, ...uniqueProducts]);
//                 setLoadedProductIds((prevIds) => {
//                     const updatedSet = new Set(prevIds);
//                     uniqueProducts.forEach(product => updatedSet.add(product.id));
//                     return updatedSet;
//                 });
//             }
//         } catch (error) {
//             console.error('Failed to fetch products:', error);
//         } finally {
//             setIsLoading(false);
//             setIsFetchingMore(false);
//         }
//     };

//     useEffect(() => {
//         // Fetch initial data
//         fetchCustomDesigns(currentPage);
//     }, []);

//     const handleScroll = (event) => {
//         const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

//         if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 50 && !isFetchingMore && hasMoreData) {
//             setIsFetchingMore(true);
//             setCurrentPage((prevPage) => {
//                 const nextPage = prevPage + 1;
//                 fetchCustomDesigns(nextPage);
//                 return nextPage;
//             });
//         }
//     };

//     const handleHome = () => {
//         router.push("/home");
//     };

//     if (isLoading && currentPage === 1) {
//         return <Loading />;
//     }

//     return (
//         <ScrollView
//             style={styles.container}
//             onScroll={handleScroll}
//             scrollEventThrottle={16}
//         >
//             <View style={styles.headerContainer}>
//                 <TouchableOpacity
//                     onPress={() => {
//                         if (navigation.canGoBack()) {
//                             navigation.goBack();
//                         } else {
//                             handleHome();
//                         }
//                     }}
//                     style={styles.backButton}
//                 >
//                     <Ionicons name="arrow-back" color="white" size={20} />
//                 </TouchableOpacity>
//             </View>

//             <Text style={styles.heading}>What Would You Like to Customize ? </Text>
//             <Text style={styles.description}>Pick a Product to Start designing . </Text>

//             {products.map((product, index) => (
//                 <CustomizeCard
//                     key={product.id} // Ensure unique key using product ID
//                     id={product.id}
//                     documentId={product.documentId}
//                     title={product.title}
//                     description={product.description}
//                     image={product.image}
//                     onLearnMore={() => console.log(`${product.title} Learn More`)}
//                     onCustomize={() => console.log(`${product.title} Customize`)}
//                 />
//             ))}

//             {isFetchingMore && <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />}
//             {!hasMoreData && (
//                 <Text style={styles.noMoreDataText}>You've reached the end of the product list.</Text>
//             )}
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#121212',
//     },
//     heading: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginBottom: 5,
//         paddingLeft: 15,
//         paddingTop: 20,
//     },
//     description: {
//         fontSize: 14,
//         color: '#aaa',
//         marginBottom: 10,
//         paddingLeft: 15,
//     },
//     headerContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     backButton: {
//         padding: 10,
//     },
//     loadingIndicator: {
//         marginVertical: 20,
//     },
//     noMoreDataText: {
//         fontSize: 14,
//         color: '#aaa',
//         textAlign: 'center',
//         marginVertical: 20,
//     },
// });

// export default CustomizePage;

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import CustomizeCard from './CustomizeCard';
import { getCustomDesigns } from '../../src/api/repositories/customDesignRepository';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import Loading from './loading';

const CustomizePage = () => {
    const [products, setProducts] = useState([]);
    const [loadedProductIds, setLoadedProductIds] = useState(new Set()); // To track unique product IDs
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const navigation = useNavigation();
    const router = useRouter();

    // Function to fetch custom designs (used to load 3 products at a time)
    const fetchCustomDesigns = async (page) => {
        try {
            const response = await getCustomDesigns(page); // Pass the current page to the API
            const fetchedProducts = response.data.data.map((item) => ({
                id: item.id,
                documentId: item.documentId,
                title: item.name,
                description: item.description,
                image: `${MEDIA_BASE_URL}${item.image.url}`,
            }));

            // Filter out duplicate products by ID
            const uniqueProducts = fetchedProducts.filter(product => !loadedProductIds.has(product.id));

            if (uniqueProducts.length === 0) {
                setHasMoreData(false); // No more new data
            } else {
                // Update state with newly fetched products
                setProducts((prevProducts) => [...prevProducts, ...uniqueProducts]);
                setLoadedProductIds((prevIds) => {
                    const updatedSet = new Set(prevIds);
                    uniqueProducts.forEach(product => updatedSet.add(product.id));
                    return updatedSet;
                });
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setIsLoading(false);
            setIsFetchingMore(false);
        }
    };

    // Effect hook to fetch initial data
    useEffect(() => {
        fetchCustomDesigns(currentPage);
    }, []);  // initial page load

    // This function handles scroll to detect if the user has scrolled to the bottom or after 3 items
    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

        // Condition for fetching when close to the bottom of the page
        const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 100; // A buffer of 100px
        
        // Fetch data when:
        // 1. User is close to the bottom or 3 more products need to be loaded
        if ((isAtBottom && !isFetchingMore && hasMoreData) || products.length >= 3 * currentPage) {
            console.log("Triggering fetch...");
            setIsFetchingMore(true);
            setCurrentPage((prevPage) => {
                const nextPage = prevPage + 1;
                fetchCustomDesigns(nextPage);  // Fetch data for the next page
                return nextPage;
            });
        }
    };

    const handleHome = () => {
        router.push("/home");
    };

    if (isLoading && currentPage === 1) {
        return <Loading />;
    }

    return (
        <ScrollView
            style={styles.container}
            onScroll={handleScroll}
            scrollEventThrottle={16}
        >
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        } else {
                            handleHome();
                        }
                    }}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" color="white" size={20} />
                </TouchableOpacity>
            </View>

            <Text style={styles.heading}>What Would You Like to Customize ? </Text>
            <Text style={styles.description}>Pick a Product to Start designing . </Text>

            {products.map((product) => (
                <CustomizeCard
                    key={product.id} // Ensure unique key using product ID
                    id={product.id}
                    documentId={product.documentId}
                    title={product.title}
                    description={product.description}
                    image={product.image}
                    onLearnMore={() => console.log(`${product.title} Learn More`)}
                    onCustomize={() => console.log(`${product.title} Customize`)}
                />
            ))}

            {isFetchingMore && <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />}
            {!hasMoreData && (
                <Text style={styles.noMoreDataText}>You've reached the end of the product list.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
        paddingLeft: 15,
        paddingTop: 20,
    },
    description: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 10,
        paddingLeft: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        padding: 10,
    },
    loadingIndicator: {
        marginVertical: 20,
    },
    noMoreDataText: {
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default CustomizePage;

// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
// import CustomizeCard from './CustomizeCard';
// import { getCustomDesigns } from '../../src/api/repositories/customDesignRepository';
// import { MEDIA_BASE_URL } from '../../src/api/apiClient';
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation, useRouter } from "expo-router";
// import Loading from './loading';

// const CustomizePage = () => {
//     const [products, setProducts] = useState([]);
//     const [loadedProductIds, setLoadedProductIds] = useState(new Set()); // To track unique product IDs
//     const [currentPage, setCurrentPage] = useState(1);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isFetchingMore, setIsFetchingMore] = useState(false);
//     const [hasMoreData, setHasMoreData] = useState(true);
//     const navigation = useNavigation();
//     const router = useRouter();

//     // Function to fetch custom designs (used to load 3 products at a time)
//     const fetchCustomDesigns = async (page) => {
//         try {
//             const response = await getCustomDesigns(page); // Pass the current page to the API
//             const fetchedProducts = response.data.data.map((item) => ({
//                 id: item.id,
//                 documentId: item.documentId,
//                 title: item.name,
//                 description: item.description,
//                 image: `${MEDIA_BASE_URL}${item.image.url}`,
//             }));

//             // Filter out duplicate products by ID
//             const uniqueProducts = fetchedProducts.filter(product => !loadedProductIds.has(product.id));

//             if (uniqueProducts.length === 0) {
//                 setHasMoreData(false); // No more new data
//             } else {
//                 // Update state with newly fetched products
//                 setProducts((prevProducts) => [...prevProducts, ...uniqueProducts]);
//                 setLoadedProductIds((prevIds) => {
//                     const updatedSet = new Set(prevIds);
//                     uniqueProducts.forEach(product => updatedSet.add(product.id));
//                     return updatedSet;
//                 });
//             }
//         } catch (error) {
//             console.error('Failed to fetch products:', error);
//         } finally {
//             setIsLoading(false);
//             setIsFetchingMore(false);
//         }
//     };

//     // Effect hook to fetch initial data
//     useEffect(() => {
//         fetchCustomDesigns(currentPage);
//     }, []);

//     // This function handles scroll to detect if the user has scrolled to the bottom or after 3 items
//     const handleScroll = (event) => {
//         const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

//         // Trigger fetching when:
//         // 1. The user is near the bottom of the screen.
//         // 2. Or after every 3 products (i.e., 1 screen of items)
//         if ((contentOffset.y + layoutMeasurement.height >= contentSize.height - 50 || products.length >= 3 * currentPage) && !isFetchingMore && hasMoreData) {
//             setIsFetchingMore(true);
//             setCurrentPage((prevPage) => {
//                 const nextPage = prevPage + 1;
//                 fetchCustomDesigns(nextPage); // Fetch data for the next page
//                 return nextPage;
//             });
//         }
//     };

//     const handleHome = () => {
//         router.push("/home");
//     };

//     if (isLoading && currentPage === 1) {
//         return <Loading />;
//     }

//     return (
//         <ScrollView
//             style={styles.container}
//             onScroll={handleScroll}
//             scrollEventThrottle={16}
//         >
//             <View style={styles.headerContainer}>
//                 <TouchableOpacity
//                     onPress={() => {
//                         if (navigation.canGoBack()) {
//                             navigation.goBack();
//                         } else {
//                             handleHome();
//                         }
//                     }}
//                     style={styles.backButton}
//                 >
//                     <Ionicons name="arrow-back" color="white" size={20} />
//                 </TouchableOpacity>
//             </View>

//             <Text style={styles.heading}>What Would You Like to Customize ? </Text>
//             <Text style={styles.description}>Pick a Product to Start designing . </Text>

//             {products.map((product) => (
//                 <CustomizeCard
//                     key={product.id} // Ensure unique key using product ID
//                     id={product.id}
//                     documentId={product.documentId}
//                     title={product.title}
//                     description={product.description}
//                     image={product.image}
//                     onLearnMore={() => console.log(`${product.title} Learn More`)}
//                     onCustomize={() => console.log(`${product.title} Customize`)}
//                 />
//             ))}

//             {isFetchingMore && <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />}
//             {!hasMoreData && (
//                 <Text style={styles.noMoreDataText}>You've reached the end of the product list.</Text>
//             )}
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#121212',
//     },
//     heading: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginBottom: 5,
//         paddingLeft: 15,
//         paddingTop: 20,
//     },
//     description: {
//         fontSize: 14,
//         color: '#aaa',
//         marginBottom: 10,
//         paddingLeft: 15,
//     },
//     headerContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     backButton: {
//         padding: 10,
//     },
//     loadingIndicator: {
//         marginVertical: 20,
//     },
//     noMoreDataText: {
//         fontSize: 14,
//         color: '#aaa',
//         textAlign: 'center',
//         marginVertical: 20,
//     },
// });

// export default CustomizePage;
