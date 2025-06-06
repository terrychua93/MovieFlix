import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import useFetch from "@/services/usefetch";

import MediaItem from "@/components/MediaItem";
import SearchBar from "@/components/SearchBar";
import { searchMedia } from "@/services/movie.api"; // <-- updated import
import { updateSearchCount } from "@/services/movie.appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: media,
    loading,
    error,
    refetch: loadMedia,
    reset,
  } = useFetch(() => searchMedia({ query: searchQuery }), false); // <-- renamed

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMedia();
        console.log('media',media)
        if (media?.results?.length && media.results[0]) {
          await updateSearchCount(searchQuery, media.results[0]);
        }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        className="px-5"
        data={media?.results ?? []}
        keyExtractor={(item) => `${item.media_type}-${item.id}`}
        renderItem={({ item }) => <MediaItem {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie or TV show"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              media?.results?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No results found"
                  : "Start typing to search for movies or TV shows"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
