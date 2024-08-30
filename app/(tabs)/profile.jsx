import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Profile = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            }}
            style={styles.profileImage}
          />
          <View style={styles.headerText}>
            <Text style={styles.name}>Jess Bailey</Text>
            <Text style={styles.username}>@jessbailey</Text>
          </View>
          <TouchableOpacity>
            <Icon name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Account</Text>
          <Icon name="chevron-forward" size={24} color="#fff" />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Language</Text>
          <Icon name="chevron-forward" size={24} color="#fff" />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Dark Mode</Text>
          <Icon name="chevron-forward" size={24} color="#fff" />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Email settings</Text>
          <Icon name="chevron-forward" size={24} color="#fff" />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Blocked user</Text>
          <Icon name="chevron-forward" size={24} color="#fff" />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Security</Text>
          <Icon name="chevron-forward" size={24} color="#fff" />
        </View>

        <View style={styles.divider} />

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Whats new</Text>
          <Icon name="log-out-outline" size={24} color="#fff" />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>FAQ</Text>
          <Icon name="log-out-outline" size={24} color="#fff" />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Terms of Service</Text>
          <Icon name="log-out-outline" size={24} color="#fff" />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Icon name="log-out-outline" size={24} color="#fff" />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Logout</Text>
          <Icon name="log-out-outline" size={24} color="#fff" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  username: {
    color: "#A0A0A0",
    fontSize: 14,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: "#333",
  },
  menuText: {
    color: "#fff",
    fontSize: 18,
  },
  divider: {
    marginVertical: 30,
  },
});

export default Profile;
