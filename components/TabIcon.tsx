import { images } from "@/constants/images";
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

interface TabIconProps {
  focused: boolean
  title: string
  icon: any
}
const TabIcon = (props: TabIconProps) => {
  const { focused, icon, title } = props as TabIconProps

  if(focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className={"flex flex-row min-w-[112px] h-16 mt-4 justify-center items-center rounded-full overflow-hidden"}
        resizeMode="cover"
      >
        <Image
          source={icon}
          tintColor="#151312"
          className="size-5"
        />
        <Text className="text-secondary text-sm font-semibold ml-2">{title}</Text>
      </ImageBackground>
    )
  }else{
    return (
      <View className="size-full justify-center items-center mt-4 rounded-full">
        <Image
          source={icon}
          tintColor="#A8B5DB"
          className="size-5"
        />
      </View>
    )
  }
}

export default TabIcon