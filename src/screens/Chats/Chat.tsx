import { FlatList, RefreshControl, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ChannelStackParamList,
  Channels,
  RootStackParamList,
} from "../../typings";
import ChannelListItem from "./Components/ChannelListItem";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useChannelsAPI } from "../../query/messages";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useDebounce } from "@uidotdev/usehooks";

type ChatProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList, "Chat">,
  NativeStackNavigationProp<ChannelStackParamList>
>;

const Chat = () => {
  const navigation = useNavigation<ChatProps>();
  const { fetchAllChannels } = useChannelsAPI();
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 600);
  const { data: CHANNELS, refetch } = fetchAllChannels(searchText);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const onViewChannel = (channelId: string) => {
    navigation.navigate("Channel", {
      channelId,
    });
  };

  const renderItem = ({ item, index }: { item: Channels; index: number }) => {
    return (
      <ChannelListItem
        channelName={item.name}
        membersCount={item.members?.length}
        key={`channel_${item.id}_${index}`}
        onPress={() => onViewChannel(item.id)}
      />
    );
  };

  useEffect(() => {
    (async () => {
      console.log("searchText: ", searchText);
      if (searchText) {
        console.log("debouncedSearchTerm: ", debouncedSearchTerm);
        if (debouncedSearchTerm) {
          await refetch();
        }
      } else {
        await refetch();
      }
    })();
  }, [searchText, debouncedSearchTerm]);

  return (
    <SafeAreaView style={styles.SafeAreaView} edges={["bottom"]}>
      <SearchBar
        value={searchText}
        onChangeText={(val) => setSearchText(val)}
        onClear={() => setSearchText("")}
      />
      <FlatList
        data={CHANNELS}
        renderItem={renderItem}
        keyExtractor={({ item }: { item: Channels }) => item?.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
});
