import { FlatList, StyleSheet, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import ChannelHeaderTitle from "./Components/ChannelHeaderTitle";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

import {
  ChannelMembers,
  ChannelMessages,
  ChannelStackParamList,
} from "../../typings";
import { useChannelsAPI } from "../../query/messages";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SearchBar from "./Components/SearchBar";
import { useDebounce } from "@uidotdev/usehooks";
import MessageListItem from "./Components/MessageListItem";

type Props = NativeStackScreenProps<ChannelStackParamList, "Channel">;

const ChannelView: React.FC<Props> = () => {
  const navigation = useNavigation();
  const params = useRoute().params as any;
  const channelId = params?.channelId;

  const { fetchChannel, fetchChannelMessages } = useChannelsAPI();
  const { data: channel, refetch } = fetchChannel(channelId);
  const [_messages, setMessages] = useState<IMessage[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchText, 600);

  const { data: filteredMessages, refetch: refetchSearch } =
    fetchChannelMessages(channelId, searchText);

  const firstTimeRef = useRef(true);

  const members = useMemo(
    () => channel?.members ?? [],
    [channel]
  ) as ChannelMembers[];
  const messages = useMemo(
    () => channel?.messages ?? [],
    [channel]
  ) as ChannelMessages[];

  const renderItem = ({
    item,
    index,
  }: {
    item: ChannelMessages;
    index: number;
  }) => {
    return (
      <MessageListItem
        text={item.text}
        user={item.user}
        key={`message_${item.id}_${index}`}
      />
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch])
  );

  useEffect(() => {
    const newData = messages.map((item, index) => ({
      _id: index + 1,
      text: item.text,
      createdAt: new Date(),
      user: {
        _id: item.user_id,
        name: item.user?.name,
        avatar: item.user?.avatar,
      },
    }));
    setMessages(newData);
  }, [messages]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <ChannelHeaderTitle
          children={channel?.name!}
          memberCount={members?.length}
        />
      ),
    });
  }, [navigation, channel, members]);

  useEffect(() => {
    (async () => {
      if (searchText) {
        if (debouncedSearchTerm) {
          await refetchSearch();
        }
      } else {
        await refetchSearch();
      }
    })();
  }, [searchText, debouncedSearchTerm]);

  const onSend = useCallback((messages: any = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <View style={styles.SafeAreaView}>
      <SearchBar
        containerStyle={styles.SearchBar}
        value={searchText}
        onChangeText={(val) => {
          setIsSearching(true);
          setSearchText(val);
        }}
        onClear={() => {
          setSearchText("");
        }}
        onCancel={() => {
          setSearchText("");
          setIsSearching(false);
        }}
      />
      {isSearching ? (
        <FlatList
          data={filteredMessages}
          renderItem={renderItem}
          keyExtractor={({ item }: { item: ChannelMessages }) => item?.id}
        />
      ) : (
        <GiftedChat
          showUserAvatar
          showAvatarForEveryMessage
          renderUsernameOnMessage
          scrollToBottom
          alwaysShowSend
          renderAvatarOnTop
          messages={_messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: "ksjf8938dj",
            name: "Charlie Brown",
            avatar: `https://ui-avatars.com/api/?name=Charlie+Brown`,
          }}
        />
      )}
    </View>
  );
};

export default ChannelView;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  SearchBar: {
    paddingHorizontal: 16,
  },
});
