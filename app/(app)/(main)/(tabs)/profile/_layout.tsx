import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function ProfileLayout() {

    return (

        <Stack
            screenOptions={{ animation: 'fade' }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="account"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="address"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
