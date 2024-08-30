import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/logo.png";
import svgs from "../../constants/svgs";
import DesignerCard from "../../components/DesignerCard";
import ImageCarousel from "../../components/ImageCarousel";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  // Function to handle navigation for design request
  const handleRequest = () => {
    router.push("/pages/request-design"); // Update the path if necessary
  };

  const handleProfileNavigation = (designer) => {
    router.push({
      pathname: "/profile",
      params: {
        name: designer.name,
        image: designer.image,
        rating: designer.rating,
        location: designer.location,
        company: designer.company,
        skills: designer.skills,
        experience: designer.experience,
        education: designer.education,
      },
    });
  };

  const designers = [
    {
      image:
        "https://www.corporatephotographerslondon.com/wp-content/uploads/2022/02/FRA-1699dark-sq.jpg",
      name: "Ortan",
      rating: "4.9",
      location: "New York, NY",
      company: "Vivaz Style.co",
      skills: [
        "Fashion design",
        "Illustration",
        "Pattern making",
        "Sewing",
        "Tech packs",
      ],
      experience: {
        years: 15,
        roles: [
          { title: "Designer", period: "2006 - 2010", company: "Marc Jacobs" },
          {
            title: "Senior Designer",
            period: "2010 - Present",
            company: "Chloe Design",
          },
        ],
      },
      education: [
        {
          degree: "BFA Fashion Design",
          period: "2002 - 2006",
          school: "Parsons School of Design",
        },
      ],
    },
    {
      image:
        "https://i.pinimg.com/736x/4c/e9/c4/4ce9c48dfc7e0164a0a4b708e755f6de.jpg",
      name: "Jasmine",
      rating: "4.6",
      location: "Los Angeles, CA",
      company: "Fashion Co",
      skills: ["Sewing", "Design", "Photography"],
      experience: {
        years: 8,
        roles: [
          {
            title: "Assistant Designer",
            period: "2012 - 2015",
            company: "ABC Fashion",
          },
          {
            title: "Designer",
            period: "2015 - Present",
            company: "Fashion Co",
          },
        ],
      },
      education: [
        {
          degree: "BA Fashion Marketing",
          period: "2008 - 2012",
          school: "FIDM",
        },
      ],
    },
  ];

  const imageUrls = [
    "https://i.pinimg.com/736x/51/c5/be/51c5be7a6f8dd89340a7009012bc7355.jpg",
    "https://marketplace.canva.com/EAFtdg3_p9I/1/0/1600w/canva-white-modern-daily-vlog-youtube-thumbnail-kuNaXX3Hu7c.jpg",
    "https://marketplace.canva.com/EAFu-uqk4SA/1/0/1600w/canva-beige-and-brown-minimalist-photo-frame-fashion-youtube-thumbnail-aayHWdjXq30.jpg",
  ];
  const Nicon = svgs.nbell;

  return (
    <SafeAreaView className="h-full px-3 bg-black">
      <View className="flex flex-row justify-between h-12 w-full p-2">
        <Image source={logo} />
        <Nicon />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-5 rounded-2xl bg-[#181818] px-5 py-8 mt-3">
          <Text className="text-white font-ps text-2xl mb-2">
            Welcome back 👋
          </Text>
          <Text className="text-white font-pbold text-2xl mb-4">
            Aditya Kumar Singh
          </Text>
          <Text className="text-[#A0A0A0] font-pregular text-base mb-4">
            If you are going to use a passage of Lorem Ipsum, you need to be
            sure there isn't anything.
          </Text>
          <TouchableOpacity
            className="px-4 py-3 rounded-xl bg-primary"
            onPress={handleRequest}
          >
            <Text className="text-black text-center font-psemibold text-base">
              Request Design
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mb-10">
          <Text className="text-white font-pbold text-2xl mb-4">
            Most Rated Designers
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {designers.map((designer, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleProfileNavigation(designer)}
              >
                <DesignerCard designer={designer} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View className=" rounded-lg bg-[#181818] mb-6">
          <View className="relative w-full h-60">
            <TouchableOpacity>
              <Image
                source={{
                  uri: "https://marketplace.canva.com/EAFnyVgZFQY/1/0/1600w/canva-black-and-white-modern-fashion-%26-clothing-photo-collage-youtube-thumbnail-_KXy8EudFw8.jpg",
                }}
                className="w-full h-full rounded-lg"
              />
            </TouchableOpacity>
            <Text className="absolute bottom-[88] left-2 text-primary text-3xl font-bold">
              Explore beautiful
            </Text>
            <Text className="absolute bottom-14 left-2 text-primary text-3xl font-bold">
              work,
            </Text>
            <Text className="absolute bottom-6 left-2 text-primary text-3xl font-bold">
              Picked for you.
            </Text>
          </View>
        </View>

        <View className="my-5">
          <Text className="text-white font-pbold text-2xl mb-6">
            What's new ?
          </Text>
          <View>
            <ImageCarousel images={imageUrls} />
          </View>
        </View>

        <View className="items-center my-5">
          <Text className="text-[#A0A0A0] font-pregular text-sm">
            © 2022 ClubUnplugged
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
