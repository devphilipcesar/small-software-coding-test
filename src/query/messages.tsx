import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import Data from "../data/messages.json";
import { Channels } from "../typings";

const useChannelsAPI = () => {
  const fetchAllChannels = (search?: string) => {
    const query = useQuery({
      queryKey: ["fetchAllChannels"],
      queryFn: () => {
        if (search) {
          const searchText = search.toLowerCase();
          const channels = Data.channels.filter((channel) =>
            channel.name.includes(searchText)
          );
          return channels;
        } else {
          return Data.channels;
        }
      },
    });
    return query;
  };

  const fetchChannel = (channelId: string) => {
    const query = useQuery({
      queryKey: ["fetchChannel"],
      queryFn: () => {
        const channel = Data.channels.find(
          (channel: Channels) => channel.id === channelId
        );
        const channelMessages = channel?.messages.map((message) => {
          const member = channel?.members.find(
            (member) => member.id === message.user_id
          );

          return {
            ...message,
            user: {
              _id: member?.id,
              name: member?.name,
              avatar: `https://ui-avatars.com/api/?name=${member?.name}`,
            },
          };
        });

        return {
          ...channel,
          messages: channelMessages,
        };
      },
    });
    return query;
  };

  const fetchChannelMessages = (channelId: string, search?: string) => {
    console.log("fetchChannelMessages: ", search);
    const query = useQuery({
      queryKey: ["fetchChannelMessages"],
      queryFn: () => {
        const channel = Data.channels.find(
          (channel: Channels) => channel.id === channelId
        );
        const channelMessages = channel?.messages.map((message) => {
          const member = channel?.members.find(
            (member) => member.id === message.user_id
          );

          return {
            ...message,
            user: {
              _id: member?.id,
              name: member?.name,
              avatar: `https://ui-avatars.com/api/?name=${member?.name}`,
            },
          };
        });

        if (search) {
          const searchText = search.toLowerCase();
          const filteredMessages = channelMessages?.filter((msg) =>
            msg.text.includes(searchText)
          );
          return filteredMessages ?? [];
        }

        return [];
      },
      enabled: false,
    });
    return query;
  };

  return useMemo(
    () => ({ fetchAllChannels, fetchChannel, fetchChannelMessages }),
    [fetchAllChannels, fetchChannel, fetchChannelMessages]
  );
};

export { useChannelsAPI };
