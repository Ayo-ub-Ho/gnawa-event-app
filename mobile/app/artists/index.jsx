import { View, FlatList, StyleSheet, Text } from "react-native";
import { useGetArtists } from "../../services/artists/queries";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import ArtistCard from "../../components/ArtistCard";
import { COLORS } from "../../constants/colors";
import { useRouter } from "expo-router";
export default function ArtistsListScreen() {
  const router = useRouter();
  const { data: artists, isLoading, error, refetch } = useGetArtists();

  if (isLoading) {
    return <LoadingSpinner message="Chargement des artistes..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Impossible de charger les artistes. Vérifiez votre connexion."
        onRetry={refetch}
      />
    );
  }

  const renderItem = ({ item }) => (
    <ArtistCard
      artist={item}
      onPress={() => router.push(`/artists/${item.id}`)}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Aucun artiste disponible</Text>
    </View>
  );
  const renderHeader = () => {
    if (!artists) {
      return (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            📱 Mode hors ligne - Données en cache
          </Text>
        </View>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={artists}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingVertical: 8,
  },
  offlineBanner: {
    backgroundColor: "#FFF3CD",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FFC107",
  },
  offlineText: {
    fontSize: 14,
    color: "#856404",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
  },
});
