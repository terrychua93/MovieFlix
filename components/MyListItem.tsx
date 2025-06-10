import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface MediaItemProps extends BookmarkItem {
  onPressPlay?: () => void;
}

const MyListItem = (item: MediaItemProps) => {
  return (
    <View className="flex-row items-center mb-4 p-3">
      <Image
        source={{ uri: item.poster_url }}
        className="w-40 h-24"
        resizeMode="stretch"
      />
      <View className="flex-1 ml-4 h-full">
        <Text className="text-white text-base font-semibold"
        numberOfLines={2}
        ellipsizeMode="tail">{item.title}</Text>
      </View>
      <TouchableOpacity onPress={item.onPressPlay}>
        <Ionicons name="play-circle" size={32} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

export default MyListItem;