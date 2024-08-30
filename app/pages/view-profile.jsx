import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const Profile = () => {
  const params = useLocalSearchParams(); // Retrieve passed data from navigation
  const {
    name,
    image,
    rating,
    location,
    company,
    skills,
    experience = {},
    education = [],
  } = params;

  const [activeTab, setActiveTab] = useState("About");
  const tabs = ["About", "Reviews", "Portfolio"];

  useEffect(() => {
    console.log("Params:", params);
    console.log("Skills:", skills);
  }, [params, skills]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <View className="p-4">
            <Text className="text-primary text-lg font-bold">
              About {name?.split(" ")[0]}
            </Text>
            <Text className="text-gray-400 mt-2">
              I'm a fashion designer based in {location}. I have been working in
              the fashion industry for {experience?.years} years.
            </Text>
            <View className="mt-4 space-y-2">
              {location && (
                <View className="flex flex-row items-center">
                  <Image
                    source={{
                      uri: "https://img.icons8.com/ios-filled/50/4caf50/place-marker.png",
                    }}
                    className="w-4 h-4 mr-2"
                  />
                  <Text className="text-gray-400">{location}</Text>
                </View>
              )}
              {company && (
                <View className="flex flex-row items-center">
                  <Image
                    source={{
                      uri: "https://img.icons8.com/ios-filled/50/4caf50/organization.png",
                    }}
                    className="w-4 h-4 mr-2"
                  />
                  <Text className="text-gray-400">{company}</Text>
                </View>
              )}
            </View>

            {Array.isArray(skills) && skills.length > 0 && (
              <>
                <Text className="text-primary text-lg font-bold mt-6">
                  Skills
                </Text>
                <View className="flex flex-row flex-wrap mt-2 space-y-2">
                  {skills.map((skill, index) => (
                    <Text
                      key={index}
                      className="bg-[#333] text-white px-3 py-1 rounded-full text-xs mb-2"
                    >
                      {skill}
                    </Text>
                  ))}
                </View>
              </>
            )}

            {experience?.roles && experience.roles.length > 0 && (
              <>
                <Text className="text-primary text-lg font-bold mt-6">
                  Experience
                </Text>
                <View className="mt-2 space-y-2">
                  {experience.roles.map((role, index) => (
                    <View key={index} className="mb-2">
                      <Text className="text-gray-400">{role.title}</Text>
                      <Text className="text-white">{role.period}</Text>
                      <Text className="text-white mb-2">{role.company}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            {Array.isArray(education) && education.length > 0 && (
              <>
                <Text className="text-primary text-lg font-bold mt-6">
                  Education
                </Text>
                <View className="mt-2 space-y-2">
                  {education.map((edu, index) => (
                    <View key={index} className="mb-2">
                      <Text className="text-gray-400">{edu.degree}</Text>
                      <Text className="text-white">{edu.period}</Text>
                      <Text className="text-white mb-2">{edu.school}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        );
      case "Reviews":
        return (
          <View className="p-4">
            <Text className="text-white text-lg font-bold">
              Reviews for {name}
            </Text>
            <Text className="text-gray-400 mt-2">No reviews yet.</Text>
          </View>
        );
      case "Portfolio":
        return (
          <View className="p-4">
            <Text className="text-white text-lg font-bold">
              Portfolio of {name}
            </Text>
            <Text className="text-gray-400 mt-2">No portfolio available.</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="h-full bg-black">
      <ScrollView>
        <View className="p-4 items-center">
          {image && (
            <Image
              source={{ uri: image }}
              className="w-32 h-32 rounded-full mb-4"
            />
          )}
          <Text className="text-white text-3xl font-bold">{name}</Text>
          {location && (
            <Text className="text-primary text-lg">
              Fashion Designer in {location}
            </Text>
          )}
          {rating && (
            <Text className="text-primary text-lg">{rating} followers</Text>
          )}
          <View className="flex flex-row space-x-4 mt-4">
            <TouchableOpacity className="bg-primary px-4 py-2 rounded-full">
              <Text className="text-white">Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-500 px-4 py-2 rounded-full">
              <Text className="text-white">Contact</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-around my-4 border-b border-gray-700">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab ? "border-b-2 border-primary" : ""
              }`}
            >
              <Text
                className={`text-lg ${
                  activeTab === tab ? "text-primary" : "text-gray-400"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
