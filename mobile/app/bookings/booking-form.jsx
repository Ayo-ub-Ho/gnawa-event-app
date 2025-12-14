import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBookingStore } from "../../store/use-booking-store";
import { COLORS } from "../../constants/colors";
import { useCreateBooking } from "../../services/bookings/mutations";
import { useRouter } from "expo-router";

export default function BookingFormScreen() {
  const router = useRouter();
  const { setCurrentBooking, setUserEmail, addBooking } = useBookingStore();
  const { mutate, isPending: isLoading } = useCreateBooking();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    number_of_tickets: "1",
  });

  const handleSubmit = () => {
    // Validation
    if (!formData.customer_name.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre nom");
      return;
    }
    if (!formData.customer_email.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre email");
      return;
    }
    if (!formData.customer_phone.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre téléphone");
      return;
    }
    const numTickets = parseInt(formData.number_of_tickets);
    if (isNaN(numTickets) || numTickets < 1 || numTickets > 10) {
      Alert.alert("Erreur", "Le nombre de billets doit être entre 1 et 10");
      return;
    }

    // Submit
    mutate(
      {
        ...formData,
        number_of_tickets: numTickets,
      },
      {
        onSuccess: (data) => {
          // Save to store
          setCurrentBooking(data);
          setUserEmail(formData.customer_email);
          addBooking(data);

          Alert.alert(
            "✅ Réservation confirmée !",
            `Votre code de confirmation est: ${data.confirmation_code}`,
            [
              {
                text: "Voir mes billets",
                onPress: () => router.push("/bookings"),
              },
            ]
          );
          setFormData({
            customer_name: "",
            customer_email: "",
            customer_phone: "",
            number_of_tickets: "1",
          });
        },
        onError: (error) => {
          Alert.alert(
            "❌ Erreur",
            error.response?.data?.message ||
              "Impossible de créer la réservation. Réessayez."
          );
        },
      }
    );
  };

  const incrementTickets = () => {
    const current = parseInt(formData.number_of_tickets) || 1;
    if (current < 10) {
      setFormData({ ...formData, number_of_tickets: (current + 1).toString() });
    }
  };

  const decrementTickets = () => {
    const current = parseInt(formData.number_of_tickets) || 1;
    if (current > 1) {
      setFormData({ ...formData, number_of_tickets: (current - 1).toString() });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="ticket" size={48} color={COLORS.primary} />
          <Text style={styles.title}>Réservation de billets</Text>
          <Text style={styles.subtitle}>
            Remplissez le formulaire pour réserver vos billets
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom complet *</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.textLight}
              />
              <TextInput
                style={styles.input}
                placeholder="Ex: Ahmed El Mansouri"
                value={formData.customer_name}
                onChangeText={(text) =>
                  setFormData({ ...formData, customer_name: text })
                }
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.textLight}
              />
              <TextInput
                style={styles.input}
                placeholder="exemple@email.com"
                value={formData.customer_email}
                onChangeText={(text) =>
                  setFormData({ ...formData, customer_email: text })
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Téléphone *</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="call-outline"
                size={20}
                color={COLORS.textLight}
              />
              <TextInput
                style={styles.input}
                placeholder="+212 6 00 00 00 00"
                value={formData.customer_phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, customer_phone: text })
                }
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Number of tickets */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de billets (max 10)</Text>
            <View style={styles.ticketCounter}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={decrementTickets}
              >
                <Ionicons name="remove" size={24} color={COLORS.primary} />
              </TouchableOpacity>

              <View style={styles.counterDisplay}>
                <Text style={styles.counterText}>
                  {formData.number_of_tickets}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.counterButton}
                onPress={incrementTickets}
              >
                <Ionicons name="add" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Total */}
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total à payer</Text>
            <Text style={styles.totalAmount}>
              {(parseInt(formData.number_of_tickets) || 1) * 150} MAD
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              isLoading && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={24} color="#fff" />
                <Text style={styles.submitButtonText}>
                  Confirmer la réservation
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
  },
  form: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    color: COLORS.text,
  },
  ticketCounter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  counterButton: {
    backgroundColor: COLORS.background,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  counterDisplay: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  counterText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  totalCard: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  submitButton: {
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
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
