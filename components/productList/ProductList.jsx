import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons

const ProductList = ({ products, onAddToWishlist }) => {
  return (
    <View className="flex flex-wrap flex-row justify-between my-4">
      {products.map((product, index) => (
        <View
          key={index}
          className="w-[48%] mb-4 bg-gray-800 rounded-lg overflow-hidden"
        >
          <View className="relative">
            {/* Ensure image dimensions are explicitly defined */}
            <Image
              source={{ uri: product.image }}
              className="w-full h-52"
              resizeMode="cover" // Makes sure image fits the space properly
            />
            {/* Heart Icon for Wishlist */}
            <TouchableOpacity
              onPress={() => onAddToWishlist(product)}
              className="absolute top-2 right-2 p-2 bg-gray-700 rounded-full"
            >
              <Icon name="heart-outline" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View className="p-4">
            <Text className="text-white text-lg font-bold">{product.name}</Text>
            <Text className="text-gray-400">{product.brand}</Text>
            <Text className="text-white text-lg mt-2">{product.price}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ProductList;
