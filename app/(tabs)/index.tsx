import MediaItem from "@/components/MediaItem";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  fetchDiscoverMulti,
  fetchJapaneseAnime,
  fetchKoreanDramas,
} from "@/services/movie.api";
import { getTrendingMovies } from "@/services/movie.appwrite";
import useFetch from "@/services/usefetch";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: mediaItems,
    loading: mediaLoading,
    error: mediaError,
  } = useFetch(() => fetchDiscoverMulti());

  const getTrending = useCallback(() => getTrendingMovies(), []);

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useFetch(getTrending);

  const {
    data: koreanDramas,
    loading: koreanLoading,
    error: koreanError,
  } = useFetch(() => fetchKoreanDramas());

  const {
    data: japaneseAnime,
    loading: animeLoading,
    error: animeError,
  } = useFetch(() => fetchJapaneseAnime());

  // Filter movies and tv shows from combined results
  const latestMovies =
    mediaItems?.filter((item) => item.media_type === "movie") ?? [];
  const latestSeries =
    mediaItems?.filter((item) => item.media_type === "tv") ?? [];

  useFocusEffect(
    useCallback(() => {
      refetchTrending();
    }, [])
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute !w-[100%] z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {mediaLoading || trendingLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        ) : mediaError || trendingError ? (
          <Text>Error: {mediaError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                {trendingMovies.length > 0 ? (
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mb-4 mt-3"
                    data={trendingMovies}
                    contentContainerStyle={{ gap: 26 }}
                    renderItem={({ item, index }) => (
                      <TrendingCard media={item} index={index} />
                    )}
                    keyExtractor={(item) => item.media_id.toString()}
                    ItemSeparatorComponent={() => <View className="w-4" />}
                  />
                ) : (
                  <View className="h-40 flex items-center justify-center m-3">
                    <Text className="text-white text-base">
                      There is no trending movie yet.
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Latest Movies Section */}
            <Text className="text-lg text-white font-bold mb-3">
              Latest Movies
            </Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4 mt-3"
              data={latestMovies}
              contentContainerStyle={{ gap: 26 }}
              renderItem={({ item }) => <MediaItem {...item} />}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />

            {/* Latest Series Section */}
            <Text className="text-lg text-white font-bold mb-3 mt-8">
              Latest Series
            </Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4 mt-3"
              data={latestSeries}
              contentContainerStyle={{ gap: 26 }}
              renderItem={({ item }) => <MediaItem {...item} />}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />

            {/* Korean Drama Section */}
            <Text className="text-lg text-white font-bold mb-3 mt-8">
              Korean Dramas
            </Text>

            {!koreanLoading && koreanDramas?.length ? (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-4 mt-3"
                data={koreanDramas}
                contentContainerStyle={{ gap: 26 }}
                renderItem={({ item }) => <MediaItem {...item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View className="w-4" />}
              />
            ) : koreanLoading ? (
              <ActivityIndicator size="small" color="#999" />
            ) : koreanError ? (
              <Text className="text-red-500">
                Failed to load Korean dramas.
              </Text>
            ) : (
              <View className="h-40 flex items-center justify-center m-3">
                <Text className="text-white text-base">
                  No Korean dramas found.
                </Text>
              </View>
            )}

            {/* Korean Drama Section */}
            <Text className="text-lg text-white font-bold mb-3 mt-8">
              Japanese Anime
            </Text>

            {!animeLoading && japaneseAnime?.length ? (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-32 mt-3"
                data={japaneseAnime}
                contentContainerStyle={{ gap: 26 }}
                renderItem={({ item }) => <MediaItem {...item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View className="w-4" />}
              />
            ) : koreanLoading ? (
              <ActivityIndicator size="small" color="#999" />
            ) : koreanError ? (
              <Text className="text-red-500">
                Failed to load Japanese anime.
              </Text>
            ) : (
              <View className="h-40 flex items-center justify-center m-3">
                <Text className="text-white text-base">
                  No Japanese anime found.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
