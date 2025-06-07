import { images } from "@/constants/images";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

interface TabIconProps {
  focused: boolean;
  title: string;
  icon: any;
}
const TabIcon = (props: TabIconProps) => {
  const { focused, icon, title } = props as TabIconProps;

  if (focused) {
    return (
      <View className="absolute bottom-[-21px]">
        <ImageBackground
          source={images.highlight}
          className={
            "flex flex-row min-w-36 min-h-16 justify-center items-center rounded-full overflow-hidden"
          }
          resizeMode="cover"
          style={{ width: "100%", height: '100%' }}
        >
          <Image source={icon} tintColor="#151312" className="size-5" />
          <Text className="text-secondary text-sm font-semibold ml-2">
            {title}
          </Text>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View className="absolute bottom-[0px]">
        <Image source={icon} tintColor="#A8B5DB" className="size-5" />
      </View>
    );
  }
};

export default TabIcon;

