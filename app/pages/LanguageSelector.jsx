import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    "English",
    "ಕನ್ನಡ",
    "தமிழ்",
    "മലയാളം",
    "हिन्दी",
    "français",
    "中文",
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.languageButton,
        item === selectedLanguage && styles.selectedLanguageButton,
      ]}
      onPress={() => handleLanguageSelect(item)}
    >
      <Text
        style={[
          styles.languageText,
          item === selectedLanguage && styles.selectedLanguageText,
        ]}
      >
        {item}
      </Text>
      {item === selectedLanguage && (
        <FontAwesome name="check" size={20} color="#3CE13D" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Language</Text>
      <Text style={styles.subHeader}>Select Language</Text>
      <FlatList
        data={languages}
        renderItem={renderLanguageItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    color: "#bbb",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  languageButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  selectedLanguageButton: {
    borderColor: "#3CE13D",
  },
  languageText: {
    fontSize: 16,
    color: "#fff",
  },
  selectedLanguageText: {
    color: "#3CE13D",
    fontWeight: "bold",
  },
});

export default LanguageSelector;
