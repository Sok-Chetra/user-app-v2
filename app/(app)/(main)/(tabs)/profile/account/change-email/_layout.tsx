import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function ChangeEmailLayout() {

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
                name="email-verify"
                options={{
                    headerShown: false,
                    presentation: Platform.OS ? 'modal' : 'containedTransparentModal'
                }}
            />
            <Stack.Screen
                name="new-email"
                options={{
                    headerShown: false,
                    presentation: Platform.OS ? 'modal' : 'containedTransparentModal'
                }}
            />
        </Stack>
    );
}
