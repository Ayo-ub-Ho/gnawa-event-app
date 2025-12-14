import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBookingStore } from "../../store/use-booking-store";
import { COLORS } from "../../constants/colors";
import BookingCard from "../../components/BookingCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useGetBookingsByEmail } from "../../services/bookings/queries";

export default function MyBookingsScreen() {
  const { setUserEmail } = useBookingStore();
  const [searchEmail, setSearchEmail] = useState("");
  const [activeEmail, setActiveEmail] = useState("");
  const {
    data: bookings,
    isLoading,
    error,
    refetch,
  } = useGetBookingsByEmail(activeEmail);

  const handleSearch = () => {
    if (!searchEmail.trim()) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email");
      return;
    }
    setActiveEmail(searchEmail);
    setUserEmail(searchEmail);
  };

  const displayData = bookings || [];

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Search Section */}
      <View style={styles.searchSection}>
        <Text style={styles.title}>Mes Réservations</Text>
        <Text style={styles.subtitle}>
          Entrez votre email pour voir vos réservations
        </Text>

        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textLight} />
            <TextInput
              style={styles.input}
              placeholder="votre@email.com"
              value={searchEmail}
              onChangeText={setSearchEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Ionicons name="search" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Results info */}
      {activeEmail && displayData && (
        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>
            {displayData.length} réservation
            {displayData.length !== 1 ? "s" : ""} trouvée
            {displayData.length !== 1 ? "s" : ""}
          </Text>
        </View>
      )}
    </View>
  );

  const renderItem = ({ item }) => <BookingCard booking={item} />;

  const renderEmpty = () => {
    if (!activeEmail) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="mail-outline" size={80} color={COLORS.border} />
          <Text style={styles.emptyTitle}>Aucune recherche</Text>
          <Text style={styles.emptyText}>
            Entrez votre email pour voir vos réservations
          </Text>
        </View>
      );
    }

    if (isLoading) {
      return <LoadingSpinner message="Recherche en cours..." />;
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="cloud-offline-outline"
            size={80}
            color={COLORS.error}
          />
          <Text style={styles.emptyTitle}>Erreur de connexion</Text>
          <Text style={styles.emptyText}>
            Impossible de charger vos réservations. Vérifiez votre connexion.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="ticket-outline" size={80} color={COLORS.border} />
        <Text style={styles.emptyTitle}>Aucune réservation</Text>
        <Text style={styles.emptyText}>
          Aucune réservation trouvée pour cet email
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={displayData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        // ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={activeEmail ? refetch : undefined}
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
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    padding: 16,
  },
  searchSection: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    color: COLORS.text,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  offlineBanner: {
    backgroundColor: "#FFF3CD",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FFC107",
  },
  offlineText: {
    fontSize: 14,
    color: "#856404",
    textAlign: "center",
  },
  resultsInfo: {
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    minHeight: 400,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
