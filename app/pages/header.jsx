import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import React from 'react';
import Svgs from '../../constants/svgs';
import logo from "../../assets/logo.png";
import { useRouter } from 'expo-router';
import useCartStore from '../../src/store/useCartStore';
// import Svgs from '../../constants/svgs';

const Header = () => {
  const router = useRouter();
  const totalCartItems = useCartStore((state) => state.getTotalItems());

  const handleRequest = () => {
    router.push("/pages/cart");
  };
  const handlehome = () => {
    router.push("/home")
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlehome}>
          <Svgs.clublogo width={128} height={28} />
        </TouchableOpacity>
        
        <View style={styles.headerIcons}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleRequest} style={styles.iconButton}>
              <Svgs.cartIcon width={18} height={18} />
            </TouchableOpacity>
            {totalCartItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalCartItems}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => router.push("/pages/wishlist")}
            style={[styles.iconButton, styles.wishlistIcon]}
          >
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
    backgroundColor: '#000',
    paddingBottom: 7,
    paddingRight: 0,
    paddingTop: 12,
  },
  logo: {
    width: 100,
    height: 20,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistIcon: {
    paddingLeft: 8,
  },
  iconContainer: {
    position: "relative", // To position badge on top of the icon
  },
  badge: {
    position: "absolute",
    top: -3,
    right: -9,
    backgroundColor: "#FF0000", // Badge color
    borderRadius: 10,
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Ensure badge is on top of the cart icon
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default Header;
