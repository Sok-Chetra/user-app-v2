import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function ChangePhoneNumberLayout() {

    return (

        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="phone-number-verify"
                options={{
                    headerShown: false,
                    presentation: Platform.OS ? 'modal' : 'containedTransparentModal'
                }}
            />
            <Stack.Screen
                name="new-phone-number"
                options={{
                    headerShown: false,
                    presentation: Platform.OS ? 'modal' : 'containedTransparentModal'
                }}
            />
        </Stack>
    );
}
