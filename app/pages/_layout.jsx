import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="request-design" options={{ headerShown: false }} />
      <Stack.Screen name="measurement" options={{ headerShown: false }} />
      <Stack.Screen name="productDetails" options={{ headerShown: false }} />
      <Stack.Screen name="upload" options={{ headerShown: false }} />
      <Stack.Screen name="review" options={{ headerShown: false }} />
      <Stack.Screen name="view-profile" options={{ headerShown: false }} />
      <Stack.Screen name="chat-screen" options={{ headerShown: false }} />
      <Stack.Screen name="cart" options={{ headerShown: false }} />
      <Stack.Screen name="wishlist" options={{ headerShown: false }} />
      {/* <Stack.Screen name="filter" options={{ headerShown: false }} /> */}
      <Stack.Screen name="checkout" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{ headerShown: false }} />
      <Stack.Screen name="payment-success" options={{ headerShown: false }} />
      <Stack.Screen name="receipt" options={{ headerShown: false }} />
      <Stack.Screen name="flash_sale" options={{ headerShown: false }} />
      <Stack.Screen name="brand" options={{ headerShown: false }} />
      <Stack.Screen name="brand_info" options={{ headerShown: false }} />
      <Stack.Screen name="brand_page" options={{ headerShown: false }} />
      {/* <Stack.Screen name="viewProduct" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
