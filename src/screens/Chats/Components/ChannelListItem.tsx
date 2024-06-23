import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  channelName: string;
  membersCount: number;
  onPress: () => void;
};

const ChannelListItem: React.FC<Props> = ({
  channelName,
  membersCount,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.ChannelListItem} onPress={onPress}>
      <View>
        <Text style={styles.ChannelName}>{channelName}</Text>
        <Text>{membersCount} members</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default ChannelListItem;

const styles = StyleSheet.create({
  ChannelListItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ChannelName: {
    fontWeight: "600",
  },
});
