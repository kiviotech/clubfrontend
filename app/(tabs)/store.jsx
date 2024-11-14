import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/logo.png";
import SearchBar from "../../components/SearchBar";
import CategoryButtons from "../../components/CategoryButtons";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductList from "../../components/productList";
import BrandIcons from "../../components/BrandIcons";
import { useRouter } from "expo-router";
import FilterPanel from "../pages/filter";
import svgs from "../../constants/svgs";
import { useState } from "react";



const categories = ["All", "Men", "Women", "Kids Wear"];



const store = () => {
  const router = useRouter();

  const handleRequest = () => {
    router.push("/pages/cart");
  };
  const handleViewAll = () => {
    // router.push("/pages/ViewProduct"); 
    router.push("/pages/viewProduct")
  };

  
  const [slideAnim] = useState(new Animated.Value(0));
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  

  const handleBrandSelect = (brandName) => {
    setSelectedBrand(brandName); // Update the selected brand when a brand icon is clicked
    // console.log(`Selected Brand: ${brandName}`); // For debugging
  };

  const toggleFilterPanel = () => {
    const toValue = isFilterVisible ? 0 : 1;
    setIsFilterVisible(!isFilterVisible);
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeFilterPanel = () => {
    if (isFilterVisible) {
      setIsFilterVisible(false);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // const limitedProducts = products.slice(0, 4); // Get the first 4 products
  // console.log(limitedProducts);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={closeFilterPanel}>
        {/* Main content of the app, excluding the filter panel */}
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={logo} style={styles.logo} />
            <TouchableOpacity onPress={handleRequest}>
              <Icon name="shopping-cart" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Brands Store</Text>
            <View style={styles.searchContainer}>
              <SearchBar />
              <TouchableOpacity onPress={toggleFilterPanel}>
                <svgs.Group width={20} height={20} />
              </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>Top Categories</Text>
            <CategoryButtons categories={categories} />

            <Text style={styles.subtitle}>Top Brands</Text>
            {/* <BrandIcons brands={brands} onBrandSelect={handleBrandSelect}/> */}
            <BrandIcons/>

            <View style={styles.popularProductsHeader}>
              <Text style={styles.popularProductsTitle}>Popular Products</Text>
              <TouchableOpacity onPress={handleViewAll}>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.products}>
            <ProductList limit={4}/>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>

      {/* Filter panel which stays above the main content */}
      {isFilterVisible && (
        <Animated.View
          style={{
            ...styles.filterPanel,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 4],
                  outputRange: [100, 1000],
                }),
              },
            ],
          }}
        >
          <FilterPanel />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    width: '100%',
    padding: 8,
  },
  logo: {
    width: 100, // Adjust as needed
    height: 40, // Adjust as needed
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 16,
    paddingLeft:10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 8,
    paddingLeft:10,
  },
  popularProductsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularProductsTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 8,
    paddingLeft:10,
  },
  viewAll: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    marginVertical: 12,
  },
  filterPanel: {
    position: "absolute",
    height: 500,
    backgroundColor: "#1D2221",
    zIndex: 10,
   
  },
  products:{
    padding:10,
    paddingBottom:40,
  },
  
  

});

export default store;