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
      <Stack.Screen name="profileScreen" options={{ headerShown: false }} />
      <Stack.Screen name="changePasswordScreen" options={{ headerShown: false }} />
      <Stack.Screen name="otpPage" options={{ headerShown: false }} />
      <Stack.Screen name="ResetPasswordScreen" options={{ headerShown: false }} />
      <Stack.Screen name="changeAddress" options={{ headerShown: false }} />
      <Stack.Screen name="orderPage" options={{ headerShown: false }} />
      <Stack.Screen name="TrackOrderScreen" options={{ headerShown: false }} />
      <Stack.Screen name="LanguageSelector" options={{ headerShown: false }} />
      <Stack.Screen name="passwordChangedNotification" options={{ headerShown: false }} />
      <Stack.Screen name="designRequestCart" options={{ headerShown: false }} />
      <Stack.Screen name="viewProduct" options={{ headerShown: false }} />
      <Stack.Screen name="header" options={{ headerShown: false }} />
      <Stack.Screen name="logoutScreen" options={{ headerShown: false }} />
      <Stack.Screen name="loading" options={{ headerShown: false }} />
      <Stack.Screen name="OrderSuccessScreen" options={{ headerShown: false }} />
      <Stack.Screen name="DetailRequest" options={{ headerShown: false }} />
      <Stack.Screen name="CustomizePage" options={{ headerShown: false }} />
      <Stack.Screen name="ColorPicker" options={{ headerShown: false }} />
      <Stack.Screen name="GalleryPage" options={{ headerShown: false }} />
      <Stack.Screen name="GalleryDetail" options={{ headerShown: false }} />
    </Stack>
  );
}
