import { View, Text, StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Svgs from "../../constants/svgs";

const TabIcon = ({ SvgIcon, AfterSvgIcon, color, name, focused, screenWidth }) => {
  const iconSize = screenWidth > 400 ? 28 : 22; // Adjust icon size based on screen width
  const fontSize = screenWidth > 400 ? 16 : 12; // Adjust font size based on screen width

  return (
    <View style={styles.tabItem}>
      {focused ? (
        <View style={[styles.focusedTabContainer, { paddingHorizontal: screenWidth > 400 ? 25 : 15 }]}>
          <AfterSvgIcon width={iconSize} height={iconSize} fill={"black"} />
          <Text style={[styles.focusedTabLabel, { fontSize, lineHeight: fontSize + 4 }]}>{name}</Text>
        </View>
      ) : (
        <View style={styles.iconContainer}>
          <SvgIcon width={iconSize} height={iconSize} fill={"black"} />
        </View>
      )}
    </View>
  );
};

const TabsLayout = () => {
  const { width: screenWidth } = useWindowDimensions();

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
        tabBarActiveTintColor: "#8FFA09", 
        tabBarInactiveTintColor: "#B0B0B0",
        tabBarStyle: {
          backgroundColor: "black",
          height: screenWidth > 400 ? 80 : 60,
          position: "absolute",
          borderTopWidth: 0,
          overflow: "hidden",
          paddingLeft: 10,
          paddingRight: 10,
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
                AfterSvgIcon={screen.AfterSvgIcon}
                color={color}
                name={screen.label}
                focused={focused}
                screenWidth={screenWidth}
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
    backgroundColor: "transparent",
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  focusedTabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8FFA09",
    borderRadius: 25,
    height: 50,
  },
  focusedTabLabel: {
    fontWeight: "bold",
    color: "black",
    marginLeft: 8,
  },
});

export default TabsLayout;
