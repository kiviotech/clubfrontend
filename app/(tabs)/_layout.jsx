import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { FormProvider } from "../../context/FormContext"; // Adjust the import path as needed

const TabIcon = ({ iconName, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Icon name={iconName} size={24} color={color} />
      <Text
        className={`${focused ? "font-semibold" : "font-normal"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const tabScreens = [
    {
      name: "home",
      title: "Home",
      iconName: "home-outline",
      label: "Home",
    },
    {
      name: "store",
      title: "Store",
      iconName: "cart-outline",
      label: "Store",
    },
    {
      name: "chat",
      title: "Chat",
      iconName: "chatbubble-outline",
      label: "Chat",
    },
    {
      name: "profile",
      title: "Profile",
      iconName: "person-outline",
      label: "Profile",
    },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#B0B0B0",
        tabBarStyle: {
          backgroundColor: "black",
          height: 60,
          position: "absolute",
          overflow: "hidden",
          paddingTop: 10,
        },
        // tabBarItemStyle: {
        //   borderRadius: 30,
        // },
      }}
    >
      {tabScreens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName={screen.iconName}
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

export default TabsLayout;
