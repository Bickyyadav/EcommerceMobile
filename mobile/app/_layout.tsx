import "../global.css"

import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ClerkProvider, ClerkLoaded } from '@clerk/expo'
import { tokenCache } from '../lib/cache'

const queryClient = new QueryClient()

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}


