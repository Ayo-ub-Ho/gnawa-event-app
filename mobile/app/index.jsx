import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useGetEvent } from "../services/events/queries";
import { useRouter } from "expo-router";
const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const { isLoading, data: event, error, refetch } = useGetEvent();

  if (isLoading) {
    return <LoadingSpinner message="Chargement de l'événement..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Impossible de charger les informations de l'événement"
        onRetry={refetch}
      />
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const ticketPercentage = event
    ? ((event.total_capacity - event.available_tickets) /
        event.total_capacity) *
      100
    : 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Banner Image */}
      <Image
        source={{
          uri:
            event?.banner_image ||
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
        }}
        style={styles.banner}
      />

      {/* Event Info Card */}
      <View style={styles.card}>
        <Text style={styles.title}>{event?.title}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>{formatDate(event?.event_date)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>
            {event?.venue} - {event?.location}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="people" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>
            Capacité: {event?.total_capacity} places
          </Text>
        </View>

        <Text style={styles.description}>{event?.description}</Text>

        {/* Ticket Availability */}
        <View style={styles.availabilityCard}>
          <View style={styles.availabilityHeader}>
            <Text style={styles.availabilityTitle}>
              Disponibilité des billets
            </Text>
            <Text style={styles.availabilityCount}>
              {event?.available_tickets} / {event?.total_capacity}
            </Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${ticketPercentage}%` }]}
            />
          </View>

          <Text style={styles.priceText}>
            Prix: <Text style={styles.price}>{event?.ticket_price} MAD</Text> /
            billet
          </Text>
        </View>

        {/* Book Now Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => router.push("/bookings/booking-form")}
          disabled={event?.available_tickets === 0}
        >
          <Ionicons name="ticket" size={24} color="#fff" />
          <Text style={styles.bookButtonText}>
            {event?.available_tickets > 0 ? "Réserver maintenant" : "Complet"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/artists")}
        >
          <Ionicons name="musical-notes" size={32} color={COLORS.primary} />
          <Text style={styles.actionTitle}>Artistes</Text>
          <Text style={styles.actionSubtitle}>Découvrez les artistes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/bookings")}
        >
          <Ionicons name="ticket-outline" size={32} color={COLORS.primary} />
          <Text style={styles.actionTitle}>Mes Billets</Text>
          <Text style={styles.actionSubtitle}>Voir mes réservations</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  banner: {
    width: width,
    height: 250,
    backgroundColor: COLORS.border,
  },
  card: {
    backgroundColor: COLORS.card,
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 12,
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 24,
    marginTop: 16,
    marginBottom: 20,
  },
  availabilityCard: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  availabilityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  availabilityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  availabilityCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
  },
  priceText: {
    fontSize: 16,
    color: COLORS.text,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 12,
  },
  actionSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: "center",
  },
});
