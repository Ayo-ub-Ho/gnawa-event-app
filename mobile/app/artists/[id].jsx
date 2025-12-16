import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetArtistById } from "../../services/artists/queries";
import { COLORS } from "../../constants/colors";

const { width } = Dimensions.get("window");

export default function ArtistDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: artist, isLoading, error, refetch } = useGetArtistById(id);

  if (isLoading) {
    return <LoadingSpinner message="Chargement de l'artiste..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Impossible de charger les détails de l'artiste"
        onRetry={refetch}
      />
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Artist Image */}
      <Image
        source={{ uri: artist?.photo_url || "https://via.placeholder.com/400" }}
        style={styles.image}
      />

      {/* Headliner Badge */}
      {artist?.is_headliner && (
        <View style={styles.headlinerBadge}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.headlinerText}>Tête d&apos;affiche</Text>
        </View>
      )}

      {/* Artist Info */}
      <View style={styles.content}>
        <Text style={styles.name}>{artist?.name}</Text>

        <View style={styles.genreContainer}>
          <Ionicons name="musical-note" size={20} color={COLORS.primary} />
          <Text style={styles.genre}>{artist?.genre}</Text>
        </View>

        {/* Performance Time */}
        {artist?.performance_time && (
          <View style={styles.timeCard}>
            <View style={styles.timeHeader}>
              <Ionicons name="time" size={24} color={COLORS.primary} />
              <Text style={styles.timeTitle}>Horaire de performance</Text>
            </View>
            <Text style={styles.timeText}>{artist.performance_time}</Text>
          </View>
        )}

        {/* Bio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Biographie</Text>
          <Text style={styles.bio}>{artist?.bio}</Text>
        </View>

        {/* Book Tickets Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => router.push(`/bookings/booking-form`)}
        >
          <Ionicons name="ticket" size={24} color="#fff" />
          <Text style={styles.bookButtonText}>Réserver des billets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
// ahmed@gmail.com
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: width,
    height: 400,
    backgroundColor: COLORS.border,
  },
  headlinerBadge: {
    position: "absolute",
    top: 360,
    right: 20,
    backgroundColor: "#FFF9E6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headlinerText: {
    color: "#B8860B",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 12,
  },
  genreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  genre: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: "600",
    marginLeft: 8,
  },
  timeCard: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  timeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  timeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: 8,
  },
  timeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginLeft: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 24,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
