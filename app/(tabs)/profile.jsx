

import React,{useEffect,useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from "../../assets/logo.png";
import Svgs from '../../constants/svgs';
import { useRouter } from 'expo-router';
import { getProfiles } from '../../src/api/repositories/profileRepository';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';
import { getProfileByUserId } from '../../src/api/repositories/profileRepository';
import useUserDataStore from '../../src/store/userData';
import { getUserById } from '../../src/api/repositories/userRepository';

const Profile = () => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const ProfileSvg = Svgs.profile;
  const router = useRouter();

  const userId = useUserDataStore((state) => state.users[0]?.id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(userId); // Fetch user data by ID
        console.log(response.data);
        setUser(response.data); // Set the fetched user data to the state
        console.log(response.data.username)
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    if (userId) {
      fetchUser();
    }
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
    router.push("/pages/LanguageSelector"); 
  };

  return (
    <View style={styles.container}>
     
      {/* Header with Logo and Logout */}
      <View style={styles.headerRow}>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
          <Icon name="log-out-outline" size={20} color="#00ff00" style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.header}>
          {/* Display Profile Image */}
  {user?.profile_img?.url ? (
    <Image
      source={{ uri: `${MEDIA_BASE_URL}${user.profile_img.url}` ||'https://example.com/fallback.png'}}
      style={styles.profileImage}
    />
  ) : (
    <ProfileSvg />
  )}
        <View style={styles.profileText}>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileUsername}>{user?.username}</Text>
        </View>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.section}>
      <TouchableOpacity onPress={() => ProfileRequest(user)} style={styles.menuItem}>
          <Icon name="person" size={20} color="#00ff00" style={styles.icon} />
          <Text style={styles.menuText}>Profile</Text>
          <Icon name="chevron-forward" size={20} color="#00ff00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handlePassword}>
          <Icon name="lock-closed" size={20} color="#00ff00" style={styles.icon} />
          <Text style={styles.menuText}>Change password</Text>
          <Icon name="chevron-forward" size={20} color="#00ff00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}  onPress={handleAddress}>
          <Icon name="location" size={20} color="#00ff00" style={styles.icon}/>
          <Text style={styles.menuText}>Change address</Text>
          <Icon name="chevron-forward" size={20} color="#00ff00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleCart}>
          <Icon name="bag" size={20} color="#00ff00" style={styles.icon} />
          <Text style={styles.menuText}>Orders</Text>
          <Icon name="chevron-forward" size={20} color="#00ff00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLanguage }>
          <Icon name="language" size={20} color="#00ff00" style={styles.icon} />
          <Text style={styles.menuText}>Language</Text>
          <Icon name="chevron-forward" size={20} color="#00ff00" />
        </TouchableOpacity>
      </View>

      {/* Feedback & Information Section */}
      <Text style={styles.sectionTitle}>Feedback & Information</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="help-circle" size={20} color="#00ff00" style={styles.icon} />
          <Text style={styles.menuText}>FAQ's</Text>
          <Icon name="chevron-forward" size={20} color="#00ff00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="document-text" size={20} color="#00ff00" style={styles.icon} />
          <Text style={styles.menuText}>Term of Service</Text>
          <Icon name="chevron-forward" size={20} color="#00ff00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="shield-checkmark" size={20} color="#00ff00" style={styles.icon} />
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Icon name="chevron-forward" size={20} color="#00ff00" />
        </TouchableOpacity>
      </View>
    </View>
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
});

export default Profile;
