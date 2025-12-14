import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function ArtistCard({ artist, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: artist.photo_url || "https://via.placeholder.com/150" }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {artist.name}
          </Text>
          {artist.is_headliner && (
            <View style={styles.badge}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.badgeText}>Headliner</Text>
            </View>
          )}
        </View>
        <Text style={styles.genre}>{artist.genre}</Text>
        <Text style={styles.bio} numberOfLines={2}>
          {artist.bio}
        </Text>
        {artist.performance_time && (
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={16} color={COLORS.primary} />
            <Text style={styles.time}>{artist.performance_time}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.border,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    flex: 1,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#B8860B",
    marginLeft: 4,
  },
  genre: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  time: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 6,
    fontWeight: "500",
  },
});
