import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="request-design" options={{ headerShown: false }} />
      <Stack.Screen name="measurement" options={{ headerShown: false }} />
      <Stack.Screen name="upload" options={{ headerShown: false }} />
      <Stack.Screen name="review" options={{ headerShown: false }} />
      <Stack.Screen name="view-profile" options={{ headerShown: false }} />
      <Stack.Screen name="chat-screen" options={{ headerShown: false }} />
    </Stack>
  );
}
