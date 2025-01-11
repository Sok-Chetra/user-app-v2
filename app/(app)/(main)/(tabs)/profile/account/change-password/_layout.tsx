import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function ChangePasswordLayout() {

    return (

        <Stack

        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    presentation: Platform.OS ? 'modal' : 'containedTransparentModal'
                }}
            />
            <Stack.Screen
                name="new-password"
                options={{
                    headerShown: false,
                    presentation: Platform.OS ? 'modal' : 'containedTransparentModal'
                }}
            />
        </Stack>
    );
}
