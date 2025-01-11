import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function ProjectsLayout() {

    return (

        <Stack
            screenOptions={{
                animation: 'fade',
            }}
        >
            <Stack.Screen name="detail/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="single-job" options={{ headerShown: false }} />
        </Stack>
    );
}
