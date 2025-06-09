import React, { useCallback, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Platform,
  ScrollView,
  Text,
  View
} from "react-native";

import MediaItem from "@/components/MediaItem";
import Navbar from "@/components/NavBar";
import TrendingCard from "@/components/TrendingCard";
import {
  fetchDiscoverMulti,
  fetchJapaneseAnime,
  fetchKoreanDramas,
} from "@/services/movie.api";
import { getTrendingMovies } from "@/services/movie.appwrite";
import useFetch from "@/services/usefetch";
import { useFocusEffect } from "expo-router";

export default function Index() {
  const scrollRef = useRef<ScrollView | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const latestMoviesRef = useRef<View | null>(null),
        latestSeriesRef = useRef<View | null>(null),
        latestAnimeRef = useRef<View | null>(null);

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

  const latestMovies = mediaItems?.filter((item) => item.media_type === "movie") ?? [];
  const latestSeries = mediaItems?.filter((item) => item.media_type === "tv") ?? [];

  useFocusEffect(
    useCallback(() => {
      refetchTrending();
    }, [])
  );

  const scrollToSection = (ref: React.RefObject<View | null>) => {
    if (ref.current && scrollRef.current) {
      ref.current.measureInWindow((x, y) => {
        scrollRef.current?.scrollTo({ y: y - 150, animated: true }); // adjust 100 to match navbar height
      });
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <Navbar
        scrollY={scrollY}
        onPressTag={(label) => {
          if (label === "Movies") scrollToSection(latestMoviesRef);
          if (label === "TV Shows") scrollToSection(latestSeriesRef);
          if (label === "Anime") scrollToSection(latestAnimeRef);
        }}
      />

      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{
          paddingTop: Platform.OS === "ios" ? 100 : 80,
          paddingBottom: 60,
        }}
      >
        {mediaLoading || trendingLoading || koreanLoading || animeLoading ? (
          <ActivityIndicator size="large" color="#fff" className="mt-10 self-center" />
        ) : (
          <View className="flex-1 mt-10">
            {/* Trending */}
            <View className="mt-14 mb-3">
              <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
              <FlatList
                horizontal
                data={trendingMovies}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 26 }}
                renderItem={({ item, index }) => (
                  <TrendingCard media={item} index={index} />
                )}
                keyExtractor={(item) => item.media_id.toString()}
                ItemSeparatorComponent={() => <View className="w-4" />}
              />
            </View>

            {/* Movies */}
            <View ref={latestMoviesRef}>
              <Text className="text-lg text-white font-bold mb-3">Latest Movies</Text>
            </View>
            <FlatList
              horizontal
              data={latestMovies}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 26 }}
              renderItem={({ item }) => <MediaItem {...item} />}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />

            {/* Series */}
            <View ref={latestSeriesRef}>
              <Text className="text-lg text-white font-bold mb-3">Latest Series</Text>
            </View>
            <FlatList
              horizontal
              data={latestSeries}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 26 }}
              renderItem={({ item }) => <MediaItem {...item} />}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />

            {/* Korean Dramas */}
            <Text className="text-lg text-white font-bold mb-3">Korean Dramas</Text>
            <FlatList
              horizontal
              data={koreanDramas}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 26 }}
              renderItem={({ item }) => <MediaItem {...item} />}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />

            {/* Anime */}
            <View ref={latestAnimeRef}>
              <Text className="text-lg text-white font-bold mb-3">Japanese Anime</Text>
            </View>
            <FlatList
              horizontal
              data={japaneseAnime}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 26 }}
              renderItem={({ item }) => <MediaItem {...item} />}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View className="w-4" />}
            />
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
}
