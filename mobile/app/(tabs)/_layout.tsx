import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@clerk/expo';
import { Redirect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';



const TabLayout = () => {

    const { isSignedIn, isLoaded } = useAuth();
    const insets = useSafeAreaInsets();
    if (!isLoaded) return null
    if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#1DB954",
                tabBarInactiveTintColor: "#B3B3B3",

                tabBarStyle: {
                    position: "absolute",
                    backgroundColor: "transparent", // no background
                    borderTopWidth: 0,

                    elevation: 0,       // Android shadow remove
                    shadowOpacity: 0,   // iOS shadow remove

                    height: 50 + insets.bottom,
                    paddingTop: 4,
                    marginHorizontal: 100,
                    marginBottom: insets.bottom,
                    borderRadius: 24,
                },
                tabBarBackground: () => (
                    <BlurView intensity={100} tint="dark"
                        style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0 }} />
                        // style={StyleSheet.absoluteFill} />
                ),
                tabBarItemStyle: {
                    backgroundColor: "transparent", // 🔥 prevents item background
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen name="index" options={{ title: "Shop", tabBarIcon: ({ color, size }) => <Ionicons name="grid" size={size} color={color} /> }} />
            <Tabs.Screen name="card" options={{ title: "Cart", tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} /> }} />
            <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }} />
        </Tabs>
    )

}

export default TabLayout
