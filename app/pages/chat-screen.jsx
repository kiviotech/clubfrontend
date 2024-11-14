import React, { useState, useCallback, useEffect } from "react";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Day,
  Time,
  Avatar,
} from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-picker";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const { chatName } = useLocalSearchParams();

  const audioRecorderPlayer = new AudioRecorderPlayer();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello! How can I help you today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: chatName,
          avatar:
            "https://i.pinimg.com/736x/4c/e9/c4/4ce9c48dfc7e0164a0a4b708e755f6de.jpg",
        },
      },
    ]);
  }, [chatName]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#8FFA09",
            borderRadius: 20,
            paddingVertical: 6,
            paddingHorizontal: 12,
          },
          left: {
            backgroundColor: "#2C2C2E",
            borderRadius: 20,
            paddingVertical: 6,
            paddingHorizontal: 12,
          },
        }}
        textStyle={{
          right: {
            color: "#000",
          },
          left: {
            color: "#fff",
          },
        }}
        timeTextStyle={{
          right: {
            color: "#A0A0A0",
          },
          left: {
            color: "#A0A0A0",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginBottom: 10, marginRight: 10 }}>
          <Icon name="send" size={24} color="#8FFA09" />
        </View>
      </Send>
    );
  };

  const onPickImage = () => {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.uri) {
        const message = {
          _id: messages.length + 1,
          createdAt: new Date(),
          user: {
            _id: 1,
          },
          image: response.uri,
        };
        onSend([message]);
      }
    });
  };

  const onRecordAudio = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
        // handle audio recording here
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={{ alignItems: "center" }}
      >
        <TouchableOpacity onPress={onPickImage}>
          <Icon name="image" size={24} color="#8FFA09" style={{ margin: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onRecordAudio}>
          <Icon name="mic" size={24} color="#8FFA09" style={{ margin: 8 }} />
        </TouchableOpacity>
      </InputToolbar>
    );
  };

  const renderDay = (props) => {
    return <Day {...props} textStyle={styles.dayText} />;
  };

  const renderTime = (props) => {
    return <Time {...props} textStyle={styles.timeText} />;
  };

  const renderAvatar = (props) => {
    return (
      <Avatar
        {...props}
        containerStyle={{
          left: { marginRight: 8 },
        }}
        imageStyle={{
          left: { borderRadius: 16 },
        }}
      />
    );
  };

  const renderCustomView = (props) => {
    // This is where you would implement custom views like audio players, etc.
    return <View />;
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderDay={renderDay}
        renderTime={renderTime}
        renderAvatar={renderAvatar}
        renderCustomView={renderCustomView}
        alwaysShowSend
        textInputStyle={styles.textInput}
        placeholder="Write your message..."
        minInputToolbarHeight={80} // Adjust this to create space
        bottomOffset={15} // Add space above the input bar
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Set background to black
  },
  inputToolbar: {
    backgroundColor: "#1C1C1E",
    borderTopWidth: 0,
    paddingVertical: 8,
  },
  dayText: {
    color: "#A0A0A0",
    fontSize: 12,
  },
  timeText: {
    color: "#A0A0A0",
    fontSize: 10,
  },
  textInput: {
    backgroundColor: "#2C2C2E",
    color: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 10,
  },
});

export default ChatScreen;
