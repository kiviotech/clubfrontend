import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/logo.png";
import SearchBar from "../../components/SearchBar";
import CategoryButtons from "../../components/CategoryButtons";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductList from "../../components/productList";
import BrandIcons from "../../components/BrandIcons";
import { useRouter } from "expo-router";


const categories = ["All", "Men", "Women", "Kids Wear"];
const brands = [
  { name: "Zara", icon: "shopping-bag" }, // Replace with actual icons
  { name: "Gucci", icon: "gg" },
  { name: "H&M", icon: "gg" },
  { name: "Nike", icon: "check-circle" },
];

const products = [
  {
    name: "Dennis Lingo",
    price: "$250",
    brand: "Hazy Rose",
    image:
      "https://i.pinimg.com/564x/1c/15/bb/1c15bb2c1663e56e9a4dcf6bb35d65df.jpg",
  },
  {
    name: "Marks & Spencer",
    price: "$140",
    brand: "Hazy Rose",
    image:
      "https://i.pinimg.com/564x/82/b2/37/82b237f1ffb00f5437ab903d65dc6526.jpg",
  },
  {
    name: "Marks & Spencer",
    price: "$140",
    brand: "Hazy Rose",
    image:
      "https://i.pinimg.com/736x/4c/e9/c4/4ce9c48dfc7e0164a0a4b708e755f6de.jpg",
  },
  {
    name: "Marks & Spencer",
    price: "$140",
    brand: "Hazy Rose",
    image:
      "https://i.pinimg.com/564x/82/b2/37/82b237f1ffb00f5437ab903d65dc6526.jpg",
  },
  {
    name: "Marks & Spencer",
    price: "$140",
    brand: "Hazy Rose",
    image:
      "https://i.pinimg.com/564x/82/b2/37/82b237f1ffb00f5437ab903d65dc6526.jpg",
  },
  {
    name: "Marks & Spencer",
    price: "$140",
    brand: "Hazy Rose",
    image:
      "https://i.pinimg.com/564x/82/b2/37/82b237f1ffb00f5437ab903d65dc6526.jpg",
  },
  {
    name: "Marks & Spencer",
    price: "$140",
    brand: "Hazy Rose",
    image:
      "https://i.pinimg.com/564x/82/b2/37/82b237f1ffb00f5437ab903d65dc6526.jpg",
  },
];

const store = () => {
  const router = useRouter();

  // Function to handle navigation for design request
  const handleRequest = () => {
    router.push("/pages/cart");
  };
  return (
    <SafeAreaView className="h-full px-3 bg-black">
      <View className="flex flex-row justify-between h-12 w-full p-2">
        <Image source={logo} />
        <TouchableOpacity onPress={handleRequest}>
          <Icon name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-2xl text-white font-bold mb-4">Brands Store</Text>
        <SearchBar />
        <Text className="text-xl text-white font-bold my-2">
          Top Categories
        </Text>
        <CategoryButtons categories={categories} />
        <Text className="text-xl text-white font-bold my-2">Top Brands</Text>
        <BrandIcons brands={brands} />
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl text-white font-pbold my-2">
            Popular Products
          </Text>
          <TouchableOpacity>
            <Text className="text-base text-white font-pmedium my-3">
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <ProductList products={products} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default store