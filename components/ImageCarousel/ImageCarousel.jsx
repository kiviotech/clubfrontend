import React from "react";
import { ScrollView, Image, View } from "react-native";
import { tw } from "nativewind"; 

const ImageCarousel = ({ images }) => {
  return (
    <ScrollView
      horizontal
          showsHorizontalScrollIndicator={false}
          
    >
      {images.map((uri, index) => (
        <Image
          key={index}
          source={{ uri }}
          className="w-72 h-40 rounded-lg mr-4"
        />
      ))}
    </ScrollView>
  );
};

export default ImageCarousel;
