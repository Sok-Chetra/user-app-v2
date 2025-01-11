import { Stack, Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function ChatsLayout() {

    return (

        <Stack
            screenOptions={{ animation: 'fade' }}
        >
            {/* <Stack.Screen
                name="index"
                options={{
                    title: 'Items',
                    headerShown: true,
                    headerLargeTitle: true,
                    headerSearchBarOptions: {
                        hideNavigationBar: true,
                        shouldShowHintSearchIcon: true
                    },
                    headerLargeTitleStyle: {
                        color: 'red'
                    },
                }}
            /> */}
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
}
