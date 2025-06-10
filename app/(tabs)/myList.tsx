import MyListItem from '@/components/MyListItem';
import Tag from '@/components/Tag';
import { TagData } from '@/data/schemes/tag.schema';
import tagData from '@/data/tag.data';
import { getBookmarks } from '@/services/movie.appwrite';
import useFetch from '@/services/usefetch';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';


export default function MyList() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const { data: bookmarks, loading, error, refetch } = useFetch(getBookmarks);

  const filteredList = selectedFilter
    ? bookmarks?.filter((item) => item.media_type === selectedFilter)
    : bookmarks;

      useFocusEffect(
        useCallback(() => {
          refetch();
        }, [])
      );

  return (
    <View className=" bg-primary px-4 pt-16 h-full">
      <Text className="text-white text-2xl font-bold mb-4">My List</Text>

      <View className="flex-row items-center mb-4">
        <Tag
          label="All"
          selected={selectedFilter === null}
          onPress={() => setSelectedFilter(null)}
        />

        {/* Dynamic tags from tagData */}
        {tagData.map((tag: TagData) => (
          <Tag
            key={tag.value}
            label={tag.label}
            selected={selectedFilter === tag.value}
            onPress={() => setSelectedFilter(tag.value)}
          />
        ))}
      </View>

      <View className="h-full">
        <FlatList
          data={filteredList}
          keyExtractor={(item) => item.media_id.toString()}
          renderItem={({ item }) => <MyListItem {...item} />}
          contentContainerStyle={{ paddingBottom: 60 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>


    </View>
  );
}
