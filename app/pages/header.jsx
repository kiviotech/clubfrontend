import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Svgs from '../../constants/svgs';
import logo from "../../assets/logo.png";
import { useRouter } from 'expo-router';

const Header = () => {
  const router = useRouter();

  const handleRequest = () => {
    router.push("/pages/cart"); 
  };
  const handlehome =()=> {
    router.push("/home")
  }

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlehome}>
        <Image source={logo} style={styles.logo} />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={handleRequest} style={styles.iconButton}>
            <Svgs.cartIcon width={18} height={18} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/pages/wishlist")} style={[styles.iconButton, styles.wishlistIcon]}>
            <Svgs.wishlistIcon width={18} height={18} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000', // Adjust color based on your theme
    // padding: 7,
    paddingBottom:7,
    paddingRight:0
  },
  logo: {
    width: 120, // Adjust size to fit your logo
    height: 30,
    resizeMode: 'contain', // Ensure the logo doesn't stretch
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10, // Reduce the gap between icons
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistIcon: {
    paddingLeft: 8, // Add padding to the left of the wishlist icon
  },
});

export default Header;
