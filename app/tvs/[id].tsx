import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { fetchTVDetails } from "@/services/movie.api";
import useFetch from "@/services/usefetch";

interface InfoProps {
  label: string;
  value?: string | number | null;
}

const InfoItem = ({ label, value }: InfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value ?? "N/A"}
    </Text>
  </View>
);

const TVDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: tv, loading } = useFetch(() => fetchTVDetails(id));

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );

  if (!tv)
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <Text className="text-white text-lg">TV Show not found</Text>
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
            <Image
              source={icons.play}
              className="w-6 h-7 ml-1"
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{tv.name}</Text>

          {tv.tagline ? (
            <Text className="text-light-200 italic text-sm mt-1">
              "{tv.tagline}"
            </Text>
          ) : null}

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {tv.first_air_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">
              {tv.episode_run_time?.[0] ?? "N/A"}m
            </Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(tv.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({tv.vote_count} votes)
            </Text>
          </View>

          {/* Info Items */}
          <InfoItem label="Overview" value={tv.overview} />
          <InfoItem
            label="Genres"
            value={tv.genres?.map((g) => g.name).join(" • ")}
          />
          <InfoItem
            label="Created By"
            value={tv.created_by?.map((c) => c.name).join(", ")}
          />
          <InfoItem label="Original Name" value={tv.original_name} />
          <InfoItem
            label="Spoken Languages"
            value={tv.spoken_languages?.map((l) => l.english_name).join(" • ")}
          />
          <InfoItem
            label="Origin Country"
            value={tv.origin_country?.join(", ")}
          />
          <InfoItem label="Type" value={tv.type} />
          <InfoItem
            label="Production Companies"
            value={tv.production_companies
              ?.map((c) => c.name)
              .join(" • ")}
          />

          {/* Seasons Section */}
          {tv.seasons?.length > 0 && (
            <View className="mt-8 w-full">
              <Text className="text-white font-bold text-lg mb-2">
                Seasons
              </Text>
              {tv.seasons.map((season) => (
                <View
                  key={season.id}
                  className="mt-4 border-b border-dark-100 pb-4"
                >
                  <Text className="text-light-100 font-semibold">
                    {season.name} ({season.air_date?.split("-")[0] ?? "N/A"})
                  </Text>
                  <Text className="text-light-200 text-sm">
                    {season.episode_count} episodes
                  </Text>
                  {season.overview ? (
                    <Text className="text-light-300 text-xs mt-1">
                      {season.overview}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TVDetails;
