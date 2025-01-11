import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function AccountLayout() {

    return (

        <Stack
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="change-email"
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
            <Stack.Screen
                name="change-password"
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
            <Stack.Screen
                name="change-phone-number"
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
        </Stack>
    );
}
