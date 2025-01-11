import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function SingleJobLayout() {

    return (

        <Stack
            screenOptions={{
                animation: 'ios_from_right',
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[code]" options={{ headerShown: false }} />
            <Stack.Screen name="questionnaire" options={{ headerShown: false }} />
            <Stack.Screen name="location" options={{ headerShown: false }} />
        </Stack>
    );
}
