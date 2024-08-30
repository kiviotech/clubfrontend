import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // using react-native-vector-icons

const measurements = {
  XS: "76-81 cm",
  S: "82-87 cm",
  M: "88-93 cm",
  L: "94-99 cm",
};

const MeasurementField = ({ label }) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setIsModalVisible(false);
  };
  //mb-4 bg-gray-700 text-white p-3 rounded-md
  return (
    <View className="flex flex-row items-center justify-between p-4 mb-2 bg-[#919EAB29] rounded-lg">
      <Text className="text-white text-sm">{label}</Text>
      <TouchableOpacity
        className="flex flex-row items-center"
        onPress={() => setIsModalVisible(true)}
      >
        <Text className="text-white text-sm mr-1">{selectedSize}</Text>
        <Icon name="chevron-down" size={16} color="white" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-4 rounded-lg max-w-xs w-full">
            <FlatList
              data={Object.keys(measurements)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-2"
                  onPress={() => handleSizeSelect(item)}
                >
                  <Text className="text-lg text-black">
                    {`${item} - ${measurements[item]}`}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MeasurementField;
