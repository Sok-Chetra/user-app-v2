import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function ScreensLayout() {
    return (
        <Stack
            screenOptions={{
                animation: 'fade',
                animationDuration: Platform.OS === 'ios' ? 300 : 400,
                keyboardHandlingEnabled: true,
            }}>
            <Stack.Screen name="chats" options={{ headerShown: false }} />
            <Stack.Screen name="projects" options={{ headerShown: false }} />
        </Stack>
    )
}