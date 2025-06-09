import TabIcon from "@/components/TabIcon";
import tabScreenData from '@data/tab.data';
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle:{
          backgroundColor: '#0f0d23',
          borderRadius: 50,
          marginHorizontal: 20,
          height: 50,
          width:`auto`,
          position: 'absolute',
          bottom:40,
          borderWidth: 1,
          borderColor: "#0f0d23",
          overflow: 'hidden',
        },
      }}
    >
      {tabScreenData.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title={title} icon={icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
