import React,{useEffect,useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,ScrollView,Alert,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from "../../assets/logo.png";
import Svgs from '../../constants/svgs';
import { useRouter } from 'expo-router';
import { getProfiles } from '../../src/api/repositories/profileRepository';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';
import { getProfileByUserId } from '../../src/api/repositories/profileRepository';
import useUserDataStore from '../../src/store/userData';
import { getUserById } from '../../src/api/repositories/userRepository';
import { logout } from '../../src/utils/auth';
import { getUserProfile } from '../../src/api/repositories/userRepository';
import useProfileStore from '../../src/store/useProfileStore';
import useCartStore from '../../src/store/useCartStore';
import useStore from '../../src/store/useStore';
import { useFocusEffect } from '@react-navigation/native';

const Profile = () => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const ProfileSvg = Svgs.profile;
  const router = useRouter();
  const userId = useUserDataStore((state) => state.users[0]?.id);
  const [profile, setProfile] = useState(null);
  const { name, username, image } = useProfileStore((state) => state.profile);
  // console.log('Profile from Zustand:', { name, username, image });
  const removeItem = useCartStore((state)=> state.removeItem)
  const removeUser = useUserDataStore((state)=> state.removeUser)
  const clearShippingInfo = useStore((state) => state.clearShippingInfo);
  const clearCart = useCartStore((state) => state.clearCart);
  const [modalVisible, setModalVisible] = useState(false); 
  // Watch for changes in the profile state

  // Replace the navigation effect with useFocusEffect
  useFocusEffect(
    React.useCallback(() => {
      fetchProfile();
    }, [])
  );

  // Move fetchProfile function outside the first useEffect for reusability
  const fetchProfile = async () => {
    try {
      if (userId) {
        const response = await getUserProfile(userId);
        const { data } = response;
        if (data && data.profile) {
          setProfile({
            name: data.profile.name || '',
            username: data.profile.username || '',
            profileImage: data.profile.image?.url ? `${MEDIA_BASE_URL}${data.profile.image.url}` : 'https://example.com/fallback.png'
          });
        }
      }
    } catch (error) {
      // console.error('Error fetching profile:', error);
      Alert.alert('Error', 'Failed to fetch profile.');
    } finally {
      setLoading(false);
    }
  };

  // Keep the original useEffect that calls fetchProfile on mount
  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const ProfileRequest = () => {
    if (!user) return;
    router.push({
      pathname: "/pages/profileScreen", // Path to your profile screen
      params: {
        username: user.username,
        // username: user.username,
        // profile_img: `${MEDIA_BASE_URL}${user.profile_img.url}`,
      },
      
    });
  };
  
  

  // const profile = {
  //   name: "Jess Bailey",
  //   userName: "@jessbailey"
  // };

  // const handlePassword = () => {
  //   router.push("/pages/changePasswordScreen"); 
  // };
  const handleSignOut = () => {
    setModalVisible(false);
    try {
      if (userId) {
        removeUser(userId);
      }
      removeItem();
      clearCart();
      clearWishlist();
      clearShippingInfo();
      logout();
      router.push("sign-in");
    } catch (error) {
      // console.error("Error during logout:", error);
    }
  };


  const Profile = () => {
    router.push("/pages/profileScreen"); 
  };

  const handlePassword = () => {
    router.push("/pages/ResetPasswordScreen"); 
  };
  const handleAddress = () => {
    router.push("/pages/changeAddress"); 
  };
  const handleCart = () => {
    router.push("/pages/orderPage"); 
  };
  const handleLanguage = () => {
    router.push("pages/designRequestCart"); 
  };

  return (
    <ScrollView style={styles.container}>

<Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleSignOut}
              >
                <Text style={styles.buttonText1}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
     
      {/* Header with Logo and Logout */}
      <View style={styles.headerRow}>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.logoutText}>Logout</Text>
          <Icon name="log-out-outline" size={20} color="#8FFA09" style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.header}>
        {/* Display Profile Image */}
        <Image source={{ uri: profile?.profileImage }} style={styles.profileImage} />
        <View style={styles.profileText}>
          <Text style={styles.profileName}>{profile?.name}</Text>
          <Text style={styles.profileUsername}>{profile?.username}</Text>
        </View>
      </View>
     

      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.section}>
      <TouchableOpacity onPress={Profile} style={styles.menuItem}>
          <Icon name="person" size={20} color="#8FFA09" style={styles.icon} />
          <Text style={styles.menuText}>Profile</Text>
          <Icon name="chevron-forward" size={20} color="#8FFA09" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handlePassword}>
          <Icon name="lock-closed" size={20} color="#8FFA09" style={styles.icon} />
          <Text style={styles.menuText}>Change password</Text>
          <Icon name="chevron-forward" size={20} color="#8FFA09" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}  onPress={handleAddress}>
          <Icon name="location" size={20} color="#8FFA09" style={styles.icon}/>
          <Text style={styles.menuText}>Change address</Text>
          <Icon name="chevron-forward" size={20} color="#8FFA09" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleCart}>
          <Icon name="bag" size={20} color="#8FFA09" style={styles.icon} />
          <Text style={styles.menuText}>Orders</Text>
          <Icon name="chevron-forward" size={20} color="#8FFA09" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLanguage }>
          <Icon name="language" size={20} color="#8FFA09" style={styles.icon} />
          <Text style={styles.menuText}>Design Request</Text>
          <Icon name="chevron-forward" size={20} color="#8FFA09" />
        </TouchableOpacity>
      </View>

      {/* Feedback & Information Section */}
      <Text style={styles.sectionTitle}>Feedback & Information</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="help-circle" size={20} color="#8FFA09" style={styles.icon} />
          <Text style={styles.menuText}>FAQ's</Text>
          <Icon name="chevron-forward" size={20} color="#8FFA09" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="document-text" size={20} color="#8FFA09" style={styles.icon} />
          <Text style={styles.menuText}>Term of Service</Text>
          <Icon name="chevron-forward" size={20} color="#8FFA09" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="shield-checkmark" size={20} color="#8FFA09" style={styles.icon} />
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Icon name="chevron-forward" size={20} color="#8FFA09" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background color
    paddingHorizontal: 20,
    paddingTop: 40,
    
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures space between logo and logout button
    marginBottom: 20,
    marginTop:10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutIcon: {
    marginLeft: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileText: {
    marginLeft: 15,
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileUsername: {
    color: '#ccc',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '700',
  },
  section: {
    borderRadius: 10,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 40, // Increased margin to create more gap between icon and text
  },
  menuText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#444',
  },
  confirmButton: {
    backgroundColor: '#8FFA09',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonText1:{
    color: '#000',
    fontWeight: 'bold',
  }
});

export default Profile;
