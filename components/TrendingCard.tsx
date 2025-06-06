import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/images";

const TrendingCard = ({
  media: { media_id, title, poster_url, media_type },
  index,
}: TrendingCardProps) => {
  return (
    //@ts-ignore
    <Link href={media_type === 'movie' ? `/movies/${media_id}` : `/tvs/${media_id}`} asChild>
      <TouchableOpacity className="w-32 relative">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute top-0 left-30 bg-blue-900 w-8 h-8 rounded-full overflow-hidden items-center justify-center">
          <MaskedView
            maskElement={
              <View className="w-9 h-9 items-center justify-center">
                <Text className="text-white font-extrabold text-lg">{index + 1}</Text>
              </View>
            }
          >
            <Image
              source={images.rankingGradient}
              className="w-9 h-9"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
