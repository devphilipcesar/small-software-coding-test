import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  children: string;
  tintColor?: string;
  memberCount?: number;
};

const ChannelHeaderTitle: React.FC<Props> = ({
  children,
  tintColor,
  memberCount,
}) => {
  return (
    <View>
      <Text>{children}</Text>
      <Text>{memberCount} members</Text>
    </View>
  );
};

export default ChannelHeaderTitle;

const styles = StyleSheet.create({});
