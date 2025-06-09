import tagData from "@/data/tag.data";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Animated,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Tag from "./Tag";

interface NavbarProps {
  scrollY: Animated.Value;
  onPressTag?: (tag: string) => void;
}

const Navbar = ({ scrollY, onPressTag }: NavbarProps) => {
  const router = useRouter();

  const headerHeight = scrollY.interpolate({
    inputRange: [100, 100],
    outputRange: [150, 100],
    extrapolate: "clamp",
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 1],
    extrapolate: "clamp",
  });

  const tagOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const tagTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -20],
    extrapolate: "clamp",
  });

  // Handlers for icon taps:

  const onSearch = () => {
    router.push("/search");
  };
  const onShare = () => {
    /* share content */
  };
  const onDownload = () => {
    /* download media */
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: headerHeight,
          opacity,
        },
      ]}
    >
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text className="text-3xl text-white font-normal">For Terry Chua</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={onShare} style={styles.iconBtn}>
            <MaterialIcons name="connected-tv" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDownload} style={styles.iconBtn}>
            <Ionicons name="download-outline" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSearch} style={styles.iconBtn}>
            <Feather name="search" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tags Row */}
      <Animated.View
        style={[
          styles.tagRow,
          {
            opacity: tagOpacity,
            transform: [{ translateY: tagTranslateY }],
          },
        ]}
      >
        {tagData.map((tag) => (
          <Tag
            key={tag.value}
            label={tag.label}
            onPress={() => onPressTag?.(tag.label)}
          />
        ))}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "rgba(12,27,33,0.80)",
    backdropFilter: "blur(10px)",
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    zIndex: 1000,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  navLinks: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  navItem: {
    color: "#fff",
    marginHorizontal: 8,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  iconBtn: {
    marginHorizontal: 6,
  },
  profile: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginLeft: 6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },

  tagRow: {
    flexDirection: "row",
    marginRight: "auto",
  },
});

export default Navbar;
