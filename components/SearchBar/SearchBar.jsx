import React from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={20} color="#6B7280" />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#9CA3AF"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
        underlineColorAndroid="transparent" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#919eab29",
    borderRadius: 20,           
    padding: 10,                 
    marginVertical: 10,         
    width: Dimensions.get("window").width - 20, 
    alignSelf: "center",         
    shadowColor: "#000",        
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,                
  },
  input: {
    flex: 1,
    marginLeft: 10,              
    color: "#F9FAFB",            
    fontSize: 16,
  },
});

export default SearchBar;
