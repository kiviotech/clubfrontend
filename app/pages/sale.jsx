
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import useProductStore from "../../src/store/useProductStore";
import { getProducts } from "../../src/api/repositories/productRepository";
import { MEDIA_BASE_URL } from "../../src/api/apiClient";
import { useRouter } from "expo-router";

const FlashSaleComponent = () => {
  const router = useRouter();
  const { productDetails, setProductDetails } = useProductStore();

  const handleSale = () => {
    router.push("/pages/flash_sale"); // Update the path if necessary
  };

  useEffect(() => {
    if (productDetails.length === 0) {
      const fetchProducts = async () => {
        try {
          const response = await getProducts();
          const products = response.data.data.map((product) => {
            const imageUrl = `${MEDIA_BASE_URL}${product.product_image.url}`;
            // console.log("Image URL:", imageUrl); // Log URL to verify correctness
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              image: imageUrl,
              backgroundColor: getRandomColor(),
            };
          });
          setProductDetails(products);
        } catch (error) {
          // console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, []);

  const handleItemPress = (item) => {
    // console.log("Product Details:", item);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        { backgroundColor: item.backgroundColor || getRandomColor() },
      ]}
      onPress={() => handleItemPress(item)}
    >
      <Image
        source={{ uri: item.mainImage  ||'https://example.com/fallback.png'}}
        style={styles.image}
        // onError={() => console.log("Error loading image:", item.image)}
      />
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>-30%</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Flash Sale</Text>
        <Text
          style={styles.seeAll}
          onPress={handleSale}
        >
          See all
        </Text>
      </View>
      <FlatList
        data={productDetails}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const getRandomColor = () => {
  const colors = [
    "#4143A7",
    "#7F7749",
    "#2CDEE7",
    "#8CB237",
    "#9B9B9B",
    "#DEDEDE",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#999",
    fontSize: 16,
  },
  row: {
    justifyContent: "space-between",
  },
  itemContainer: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#39FF14",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  discountText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default FlashSaleComponent;