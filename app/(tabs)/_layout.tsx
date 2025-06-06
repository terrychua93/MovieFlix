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
        tabBarItemStyle:{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle:{
          backgroundColor: '#0f0d23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          borderWidth: 1,
          borderColor: "#0f0d23",
          overflow: 'hidden',
        }
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
