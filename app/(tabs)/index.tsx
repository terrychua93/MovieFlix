import MediaItem from "@/components/MediaItem";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchDiscoverMulti } from "@/services/movie.api";
import { getTrendingMovies } from "@/services/movie.appwrite";
import useFetch from "@/services/usefetch";
import { useRouter } from "expo-router";
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
  } = useFetch(getTrending);


  // Filter movies and tv shows from combined results
  const latestMovies = mediaItems?.filter(item => item.media_type === "movie") ?? [];
  const latestSeries = mediaItems?.filter(item => item.media_type === "tv") ?? [];

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
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
                    <Text className="text-white text-base">There is no trending movie yet.</Text>
                  </View>
                )}

              </View>
            )}

            {/* Latest Movies Section */}
            <Text className="text-lg text-white font-bold mb-3">Latest Movies</Text>
            <FlatList
              data={latestMovies}
              renderItem={({ item }) => <MediaItem {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2"
              scrollEnabled={false}
            />

            {/* Latest Series Section */}
            <Text className="text-lg text-white font-bold mb-3 mt-8">Latest Series</Text>
            <FlatList
              data={latestSeries}
              renderItem={({ item }) => <MediaItem {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 mb-32"
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
