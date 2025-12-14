import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function BookingCard({ booking }) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `🎵 La Grande Soirée Gnawa
        
Réservation confirmée !
Code: ${booking.confirmation_code}
Nom: ${booking.customer_name}
Billets: ${booking.number_of_tickets}

Téléchargez l'app: gnawa://booking/${booking.confirmation_code}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return COLORS.success;
      case "pending":
        return "#FFC107";
      case "cancelled":
        return COLORS.error;
      default:
        return COLORS.textLight;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmé";
      case "pending":
        return "En attente";
      case "cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>Code de confirmation</Text>
          <Text style={styles.code}>{booking.confirmation_code}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(booking.status) },
          ]}
        >
          <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.details}>
        <View style={styles.row}>
          <Ionicons name="person-outline" size={20} color={COLORS.primary} />
          <Text style={styles.label}>Nom:</Text>
          <Text style={styles.value}>{booking.customer_name}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="mail-outline" size={20} color={COLORS.primary} />
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{booking.customer_email}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="call-outline" size={20} color={COLORS.primary} />
          <Text style={styles.label}>Téléphone:</Text>
          <Text style={styles.value}>{booking.customer_phone}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="ticket-outline" size={20} color={COLORS.primary} />
          <Text style={styles.label}>Billets:</Text>
          <Text style={styles.value}>{booking.number_of_tickets}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.amount}>{booking.total_amount} MAD</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{formatDate(booking.booking_date)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Ionicons name="share-social-outline" size={20} color="#fff" />
        <Text style={styles.shareText}>Partager</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  codeContainer: {
    flex: 1,
  },
  codeLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  code: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    letterSpacing: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  details: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 8,
    width: 80,
  },
  value: {
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    flex: 1,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shareText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
