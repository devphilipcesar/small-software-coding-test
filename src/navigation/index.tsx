import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Chat from "../screens/Chats/Chat";
import Profile from "../screens/Profile";
import ChannelView from "../screens/Chats/ChannelView";
import { ChannelStackParamList, RootStackParamList } from "../typings";

const Tab = createBottomTabNavigator<RootStackParamList>();

const Stack = createNativeStackNavigator<ChannelStackParamList>();

const ChannelNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Channels" component={Chat} />
      <Stack.Screen name="Channel" component={ChannelView} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Chat" component={ChannelNavigator} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
