import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function ProjectsLayout() {

    return (

        <Stack
            screenOptions={{
                animation: 'fade',
            }}
        >

            {/* <Stack.Screen name="index" options={{ headerShown: true }} /> */}
        </Stack>
    );
}
