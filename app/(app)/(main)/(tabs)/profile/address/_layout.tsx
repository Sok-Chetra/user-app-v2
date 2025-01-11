import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function AddressLayout() {

    return (

        <Stack
            screenOptions={{ animation: 'fade' }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="add" options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_bottom' }} />
            {/* <Stack.Screen name="address" options={{ headerShown: false }} /> */}
        </Stack>
    );
}
