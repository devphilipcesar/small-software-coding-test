import { User } from "react-native-gifted-chat";

export type Channels = {
  id: string;
  name: string;
  members: ChannelMembers[];
  messages: ChannelMessages[];
};

export type ChannelMembers = {
  id: string;
  name: string;
};

export type ChannelMessages = {
  id: string;
  content: string;
  text: string;
  user_id: string;
  user?: User;
};

export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type ChannelStackParamList = {
  Channels: undefined;
  Channel: {
    channelId: string;
  };
};
