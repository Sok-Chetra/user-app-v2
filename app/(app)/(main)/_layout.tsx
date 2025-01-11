import { Stack } from "expo-router";

export default function Main() {
    return (
        <Stack
            screenOptions={{
                animation: 'fade'
            }}
        >
            <Stack.Screen name="(screens)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    )
}