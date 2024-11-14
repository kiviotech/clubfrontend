import React from "react";
import { View, Text, Image, TouchableOpacity,StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import fonts from "../../constants/fonts";

const DesignerCard = ({ designer }) => {
  const { image, name, rating } = designer;
  const router = useRouter();

  const handlePress = () => {
    // Navigate to the view-profile page with designer data as params
    router.push({
      pathname: "/pages/view-profile",
      params: designer, // Passing the entire designer object
    });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.rating}>{rating}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160, // Equivalent to w-40
    marginRight: 16, // Equivalent to mr-4
    backgroundColor: '#181818',
    borderRadius: 16, // Equivalent to rounded-2xl
    alignItems: 'center',
  },
  image: {
    width: '100%', // Equivalent to w-full
    height: 144, // Equivalent to h-36
    borderRadius: 16, // Equivalent to rounded-2xl
    marginBottom: 16, // Equivalent to mb-4
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Equivalent to w-full
    paddingLeft: 8, // Equivalent to pl-2
    paddingRight: 8, // Equivalent to pr-2
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontSize: 16, // Equivalent to text-base
    fontFamily: fonts["Poppins-SemiBold"], // Replace with your font
  },
  rating: {
    color: '#8FFA09', // Replace with your primary color
    fontFamily: fonts["Poppins-Regular"], // Replace with your font
    fontSize: 16, // Equivalent to text-base
  },
  button: {
    backgroundColor: '#243647',
    borderRadius: 50, // Equivalent to rounded-full
    width: 144, // Equivalent to w-36
    padding: 12, // Equivalent to p-3
    margin: 16, // Equivalent to m-4
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: fonts["Poppins-Medium"], // Replace with your font
    fontSize: 16, // Equivalent to text-base
  },
});

export default DesignerCard;
