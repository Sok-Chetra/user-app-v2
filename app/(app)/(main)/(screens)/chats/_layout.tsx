import { Stack, Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function ChatsLayout() {

    return (

        <Stack
            screenOptions={{ animation: 'fade' }}
        >
            <Stack.Screen
                name="detail/[id]"
                options={{
                    headerShown: false,
                }} />
        </Stack>
    );
}
