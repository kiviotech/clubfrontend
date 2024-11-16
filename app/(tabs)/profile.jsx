// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/Ionicons";

// const Profile = () => {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <View style={styles.header}>
//             <Image
//               source={{
//                 uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
//               }}
//               style={styles.profileImage}
//             />
//             <View style={styles.headerText}>
//               <Text style={styles.name}>Jess Bailey</Text>
//               <Text style={styles.username}>@jessbailey</Text>
//             </View>
//             <TouchableOpacity>
//               <Icon name="chevron-forward" size={24} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.menuItem}>
//             <Text style={styles.menuText}>Account</Text>
//             <Icon name="chevron-forward" size={24} color="#fff" />
//           </View>
//           <View style={styles.menuItem}>
//             <Text style={styles.menuText}>Language</Text>
//             <Icon name="chevron-forward" size={24} color="#fff" />
//           </View>
//           <View style={styles.menuItem}>
//             <Text style={styles.menuText}>Dark Mode</Text>
//             <Icon name="chevron-forward" size={24} color="#fff" />
//           </View>
//           <View style={styles.menuItem}>
//             <Text style={styles.menuText}>Email settings</Text>
//             <Icon name="chevron-forward" size={24} color="#fff" />
//           </View>
//           <View style={styles.menuItem}>
//             <Text style={styles.menuText}>Blocked user</Text>
//             <Icon name="chevron-forward" size={24} color="#fff" />
//           </View>
//           <View style={styles.menuItem}>
//             <Text style={styles.menuText}>Security</Text>
//             <Icon name="chevron-forward" size={24} color="#fff" />
//           </View>

//           <View style={styles.divider} />

//           <View style={styles.menuItem}>
//             <Text style={styles.menuText}>Whats new</Text>
//             <Icon name="log-out-outline" size={24} color="#fff" />
//           </View>
//           <View style={styles.menuItem}>
//             <Text style={styles.menuText}>FAQ</Text>
//             <Icon name="log-out-outline" size={24} color="#fff" />
//           </View>
//           <View style={styles.menuItem}>
//             <Text style={styles.menuText}>Terms of Service</Text>
//             <Icon name="log-out-outline" size={24} color="#fff" />
//           </View>
//           <View style={styles.menuItem}>
//             <Text style={styles.menuText}>Privacy Policy</Text>
//             <Icon name="log-out-outline" size={24} color="#fff" />
//           </View>
//           <View style={styles.menuItem}>
//             <Text style={styles.menuText}>Logout</Text>
//             <Icon name="log-out-outline" size={24} color="#fff" />
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#000", // Ensuring the safe area background is black
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#000", // Black background
//   },
//   scrollContainer: {
//     padding: 20,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   profileImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     marginRight: 15,
//   },
//   headerText: {
//     flex: 1,
//   },
//   name: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   username: {
//     color: "#A0A0A0",
//     fontSize: 14,
//   },
//   menuItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 15,
//     borderBottomColor: "#333",
//   },
//   menuText: {
//     color: "#fff",
//     fontSize: 18,
//   },
//   divider: {
//     marginVertical: 30,
//   },
// });

// export default Profile;

import React,{useEffect,useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from "../../assets/logo.png";
import Svgs from '../../constants/svgs';
import { useRouter } from 'expo-router';
import { getUserProfile } from '../../src/api/repositories/userRepository';
import useStore from '../../src/store/useStore';


const Profile = () => {
  const ProfileSvg = Svgs.profile;
  const router = useRouter();
  // const [profile, setProfile] = useState(null);
  const userId = useStore(state => state.user);
console.log("User ID from Zustand store:", userId);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const userId =23; // Get the user ID from context or route params
  //       const response = await getUserProfile(userId); // Get profile data using the API
  //       setProfile(response.data[0]); 
  //       console.log(response)
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };
  //   fetchProfile();
  // }, []);


  const ProfileRequest = () => {
    router.push({
      pathname: "/pages/profileScreen",  // Path to your profile screen
      params: {
        // profile: profile.ProfileSvg ,  // Pass the profile SVG
        name: profile.name,       // Pass the name
        username: profile.userName // Pass the username
      },
    });
  };

  const profile = {
    name: "Jess Bailey",
    userName: "@jessbailey"
  };

  const handlePassword = () => {
    router.push("/pages/changePasswordScreen"); 
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
        <ProfileSvg/>
        <View style={styles.profileText}>
          <Text style={styles.profileName}>Jess bailey</Text>
          <Text style={styles.profileUsername}>@jessbailey</Text>
        </View>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.section}>
      <TouchableOpacity onPress={() => ProfileRequest(profile)} style={styles.menuItem}>
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
    width: 60,
    height: 60,
    borderRadius: 30,
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
