import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import ChatIcon from "@/assets/svgs/chat-icon-yellow.svg";
import MarketplaceIcon from "@/assets/svgs/marketplace-icon-yellow.svg";
import DarkChatIcon from "@/assets/svgs/chat-icon-balck.svg";
import DarkMarketplaceIcon from "@/assets/svgs/marketplace-icon-black.svg";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: "#fff", // Navbar background color
            shadowColor: "#000", // Shadow color
            shadowOffset: { width: 0, height: -3 }, // Shadow offset for iOS
            shadowOpacity: 0.1, // Shadow opacity for iOS
            shadowRadius: 3, // Shadow radius for iOS
            elevation: 4,
            borderTopWidth: 0,
          },
          android: {
            backgroundColor: "#fff", // Navbar background color
            shadowColor: "#000", // Shadow color
            shadowOffset: { width: 0, height: -3 }, // Shadow offset for iOS
            shadowOpacity: 0.1, // Shadow opacity for iOS
            shadowRadius: 3, // Shadow radius for iOS
            elevation: 4,
            borderTopWidth: 0,
            // paddingBottom: 50,
            height: 65,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 160,
                height: 70,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 150,
                  backgroundColor: focused ? "#000" : "#F2F3F5",
                  gap: 5,
                  height: 40,
                  marginTop: 35,
                  padding: 10,
                  borderRadius: 25,
                }}
              >
                {focused ? (
                  <ChatIcon width={25} height={25} color={"#fff"} />
                ) : (
                  <DarkChatIcon width={25} height={25} color={"#fff"} />
                )}
                <Text style={{ color: focused ? "#fff" : "#000" }}>Chats</Text>
              </View>
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 160,
                height: 60,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 150,
                  backgroundColor: focused ? "#000" : "#F2F3F5",
                  gap: 5,
                  height: 40,
                  marginTop: 35,
                  padding: 10,
                  borderRadius: 25,
                }}
              >
                {focused ? (
                  <MarketplaceIcon width={25} height={25} color={"#fff"} />
                ) : (
                  <DarkMarketplaceIcon width={25} height={25} color={"#fff"} />
                )}
                <Text style={{ color: focused ? "#fff" : "#000" }}>
                  Marketplace
                </Text>
              </View>
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
