import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity,StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";


const Chat = () => {
  // Example chat data
  const chats = [
    {
      name: "Alex Linderson",
      message: "How are you today?",
      time: "2 min ago",
      avatar:
        "https://www.corporatephotographerslondon.com/wp-content/uploads/2022/02/FRA-1699dark-sq.jpg",
      unreadCount: 3,
    },
    {
      name: "Team Align",
      message: "Don't miss to attend the meeting.",
      time: "2 min ago",
      avatar:
        "https://i.pinimg.com/736x/51/c5/be/51c5be7a6f8dd89340a7009012bc7355.jpg",
      unreadCount: 4,
    },
    {
      name: "John Araham",
      message: "Hey! Can you join the meeting?",
      time: "2 min ago",
      avatar:
        "https://i.pinimg.com/736x/4c/e9/c4/4ce9c48dfc7e0164a0a4b708e755f6de.jpg",
      unreadCount: 0,
    },
    {
      name: "Sabila Sayma",
      message: "How are you today?",
      time: "2 min ago",
      avatar:
        "https://www.corporatephotographerslondon.com/wp-content/uploads/2022/02/FRA-1699dark-sq.jpg",
      unreadCount: 1,
    },
    {
      name: "John Borino",
      message: "Have a good day 🌸",
      time: "2 min ago",
      avatar:
        "https://i.pinimg.com/736x/51/c5/be/51c5be7a6f8dd89340a7009012bc7355.jpg",
      unreadCount: 2,
    },
    {
      name: "Angel Dayna",
      message: "How are you today?",
      time: "2 min ago",
      avatar:
        "https://i.pinimg.com/736x/4c/e9/c4/4ce9c48dfc7e0164a0a4b708e755f6de.jpg",
      unreadCount: 0,
    },
    {
      name: "Jane Doe",
      message: "Let's catch up later.",
      time: "3 min ago",
      avatar:
        "https://www.corporatephotographerslondon.com/wp-content/uploads/2022/02/FRA-1699dark-sq.jpg",
      unreadCount: 0,
    },
    {
      name: "Mark Williams",
      message: "Can you send me the files?",
      time: "5 min ago",
      avatar:
        "https://i.pinimg.com/736x/51/c5/be/51c5be7a6f8dd89340a7009012bc7355.jpg",
      unreadCount: 1,
    },
  ];

  const handleChat = () => {
    router.push("../../pages/chat-screen");
  };

  return (
//     <SafeAreaView className="h-full px-3 bg-black">
//       <View className="flex flex-row justify-between h-12 w-full p-2 items-center">
//         <Text className="text-white text-2xl font-bold">Messages</Text>
//         <Icon name="search-outline" size={24} color="white" />
//       </View>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         className="mt-4"
//         contentContainerStyle={{ paddingBottom: 80 }}
//       >
//         {chats.map((chat, index) => (
//           <TouchableOpacity
//             key={index}
//             className="flex flex-row items-center p-4 bg-[#181818] rounded-xl mb-3"
//             onPress={handleChat}
//           >
//             <Image
//               source={{ uri: chat.avatar }}
//               className="w-12 h-12 rounded-full"
//               style={{
//                 borderColor: chat.unreadCount > 0 ? "#00FF00" : "#181818",
//                 borderWidth: 2,
//               }}
//             />
//             <View className="flex-1 ml-3">
//               <Text className="text-white text-base font-semibold">
//                 {chat.name}
//               </Text>
//               <Text className="text-[#A0A0A0] text-sm">{chat.message}</Text>
//             </View>
//             <View className="items-end">
//               <Text className="text-[#A0A0A0] text-xs">{chat.time}</Text>
//               {chat.unreadCount > 0 && (
//                 <View className="bg-[#00FF00] w-6 h-6 rounded-full items-center justify-center mt-2">
//                   <Text className="text-white text-xs font-bold">
//                     {chat.unreadCount}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Chat;

<SafeAreaView style={styles.container}>
<View style={styles.header}>
  <Text style={styles.headerText}>Messages</Text>
  <Icon name="search-outline" size={24} color="white" />
</View>
<ScrollView
  showsVerticalScrollIndicator={false}
  style={styles.scrollView}
  contentContainerStyle={styles.scrollContent}
>
  {chats.map((chat, index) => (
    <TouchableOpacity
      key={index}
      style={styles.chatItem}
      onPress={handleChat}
    >
      <Image
        source={{ uri: chat.avatar }}
        style={[
          styles.avatar,
          {
            borderColor: chat.unreadCount > 0 ? "#00FF00" : "#181818",
            borderWidth: 2,
          },
        ]}
      />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{chat.name}</Text>
        <Text style={styles.chatMessage}>{chat.message}</Text>
      </View>
      <View style={styles.chatStatus}>
        <Text style={styles.chatTime}>{chat.time}</Text>
        {chat.unreadCount > 0 && (
          <View style={styles.unreadCount}>
            <Text style={styles.unreadCountText}>
              {chat.unreadCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  ))}
</ScrollView>
</SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: 'black',
paddingHorizontal: 12, // Equivalent to px-3
},
header: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
height: 48, // Equivalent to h-12
padding: 8, // Equivalent to p-2
},
headerText: {
color: 'white',
fontSize: 24, // Equivalent to text-2xl
fontWeight: 'bold', // Equivalent to font-bold
},
scrollView: {
marginTop: 16, // Equivalent to mt-4
},
scrollContent: {
paddingBottom: 80,
},
chatItem: {
flexDirection: 'row',
alignItems: 'center',
padding: 16, // Equivalent to p-4
backgroundColor: '#181818',
borderRadius: 16, // Equivalent to rounded-xl
marginBottom: 12, // Equivalent to mb-3
},
avatar: {
width: 48, // Equivalent to w-12
height: 48, // Equivalent to h-12
borderRadius: 24, // Equivalent to rounded-full
},
chatDetails: {
flex: 1,
marginLeft: 12, // Equivalent to ml-3
},
chatName: {
color: 'white',
fontSize: 16, // Equivalent to text-base
fontWeight: '600', // Equivalent to font-semibold
},
chatMessage: {
color: '#A0A0A0',
fontSize: 12, // Equivalent to text-sm
},
chatStatus: {
alignItems: 'flex-end',
},
chatTime: {
color: '#A0A0A0',
fontSize: 10, // Equivalent to text-xs
},
unreadCount: {
backgroundColor: '#00FF00',
width: 24, // Equivalent to w-6
height: 24, // Equivalent to h-6
borderRadius: 12, // Equivalent to rounded-full
alignItems: 'center',
justifyContent: 'center',
marginTop: 8, // Equivalent to mt-2
},
unreadCountText: {
color: 'white',
fontSize: 10, // Equivalent to text-xs
fontWeight: 'bold', // Equivalent to font-bold
},
});

export default Chat;
