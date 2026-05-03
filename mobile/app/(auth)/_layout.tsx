
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function AuthRouterLayout() {
    const { isSignedIn = "true" } = useAuth();
    // console.log("Signed in:", isSignedIn);
    if (isSignedIn) {
        return <Redirect href={"/(tabs)"} />
    }
    return <Stack screenOptions={{ headerShown: false }} />
}

