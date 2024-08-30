import React, { useRef } from "react";
import { View, Text } from "react-native";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

const RichTextEditor = () => {
  const richText = useRef();

  return (
    <View className="rounded-lg bg-[#181818] mb-4">
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.blockquote,
        ]}
        iconTint="white"
        selectedIconTint="#D1D1D1"
        style={{
          backgroundColor: "#202020",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />
      <RichEditor
        ref={richText}
        placeholder="Special Instructions"
        style={{
          backgroundColor: "#181818",
          color: "white",
          minHeight: 150,
          padding: 10,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      />
    </View>
  );
};

export default RichTextEditor;
