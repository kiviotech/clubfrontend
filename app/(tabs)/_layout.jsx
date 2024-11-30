import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Svgs from "../../constants/svgs";

const TabIcon = ({ SvgIcon, AfterSvgIcon, color, name, focused }) => {
  return (
    <View style={styles.tabItem}>
      {focused ? (
        <View style={styles.focusedTabContainer}>
          <AfterSvgIcon width={22} height={22} fill={"black"} />
          <Text style={styles.focusedTabLabel}>{name}</Text>
        </View>
      ) : (
        <View style={styles.iconContainer}>
          <SvgIcon width={22} height={22} fill={"black"} />
        </View>
      )}
    </View>
  );
};

const TabsLayout = () => {
  const tabScreens = [
    {
      name: "home",
      title: "Home",
      SvgIcon: Svgs.homeScreen,
      AfterSvgIcon: Svgs.afterhomeScreen,
      label: "Home",
    },
    {
      name: "store",
      title: "Store",
      SvgIcon: Svgs.storeScreen,
      AfterSvgIcon: Svgs.afterstoreScreen,
      label: "Store",
    },
    {
      name: "chat",
      title: "Chat",
      SvgIcon: Svgs.ChatScreen,
      AfterSvgIcon: Svgs.afterchatScreen,
      label: "Chat",
    },
    {
      name: "profile",
      title: "Profile",
      SvgIcon: Svgs.ProfileScreen,
      AfterSvgIcon: Svgs.afterprofileScreen,
      label: "Profile",
    },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#B0FF00", // Bright green
        tabBarInactiveTintColor: "#B0B0B0", // Light gray
        tabBarStyle: {
          backgroundColor: "black",
          height: 80,
          position: "absolute",
          borderTopWidth: 0,
          overflow: "hidden",
          paddingLeft: 10, // Add padding to the left of the tab bar
          paddingRight: 10, // Add padding to the right of the tab bar
        },
      }}
    >
      {tabScreens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                SvgIcon={screen.SvgIcon}
                AfterSvgIcon={screen.AfterSvgIcon} // Pass the "after" icon
                color={color}
                name={screen.label}
                focused={focused}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent", // No background for inactive tabs
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  focusedTabContainer: {
    flexDirection: "row", // Icon and label side by side
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B0FF00", // Bright green background for active tab
    borderRadius: 25, // Fully rounded background
    paddingHorizontal: 20, // Adjust for label and icon spacing
    height: 50, // Increase height to ensure proper vertical alignment
  },
  focusedTabLabel: {
    fontSize: 14, // Text size proportional to the image
    fontWeight: "bold",
    color: "black",
    marginLeft: 8, // Space between the icon and text
    lineHeight: 18, // Adjust line height to keep the label centered
  },
});

export default TabsLayout;
