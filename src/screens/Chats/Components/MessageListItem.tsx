import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ChannelMessages } from "../../../typings";

const MessageListItem: React.FC<Partial<ChannelMessages>> = ({
  user,
  text,
}) => {
  return (
    <TouchableOpacity style={styles.MessageListItem}>
      <Image
        source={{
          uri: user?.avatar as string,
        }}
        style={{
          width: 42,
          height: 42,
          borderRadius: 999,
        }}
      />
      <View>
        <Text style={styles.ChannelName}>{user?.name}</Text>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessageListItem;

const styles = StyleSheet.create({
  MessageListItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  ChannelName: {
    fontWeight: "600",
  },
});
