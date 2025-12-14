import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="light-content" />
        <Stack screenOptions={{ headerShown: false, title: "Gnawa Event" }}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="bookings/booking-form"
            options={{ headerShown: true }}
          />
          <Stack.Screen name="bookings/index" options={{ headerShown: true }} />
          <Stack.Screen name="artists/index" />
          <Stack.Screen name="artists/[id]" />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
