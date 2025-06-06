import { icons } from "@/constants/icons";
import { environment } from "@/env/environment";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

// Define a unified type
interface Media {
  id: number;
  media_type: "movie" | "tv";
  title?: string;           // For movies
  name?: string;            // For TV shows
  poster_path: string | null;
  vote_average: number;
  release_date?: string;    // For movies
  first_air_date?: string;  // For TV shows
}


const MediaItem = (item: Media) => {
  const isMovie = item.media_type === "movie";
  const displayTitle = isMovie ? item.title : item.name;
  const displayDate = isMovie ? item.release_date : item.first_air_date;
  const typeLabel = isMovie ? "Movie" : "TV";

  return (
    // @ts-ignore
    <Link href={item.media_type === 'movie' ? `/movies/${item.id}` : `/tvs/${item.id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: item.poster_path
              ? `${environment.POSTER_URL}${item.poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {displayTitle}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(item.vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {displayDate?.split("-")[0] || "N/A"}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            {typeLabel}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MediaItem;