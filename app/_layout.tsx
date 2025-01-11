import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SessionProvider } from '@/providers/auth/AuthContextProvider';
import "../global.css";
import { AuthStoreProvider } from '@/providers/auth/AuthProvider';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ServiceStoreProvider } from '@/providers/project/ServiceProvider';
import { AddressStoreProvider } from '@/providers/project/AddressProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient()

const client = new ApolloClient({
    uri: process.env.EXPO_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache(),
});

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }


    return (
        <QueryClientProvider client={queryClient}>
            {/* <SessionProvider> */}
            <ApolloProvider client={client}>
                <AuthStoreProvider>
                    <ServiceStoreProvider>
                        <AddressStoreProvider>
                            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                                <StatusBar
                                    animated
                                    hidden={!loaded}
                                    hideTransitionAnimation='fade'
                                    translucent
                                    style="auto"
                                />
                                <Stack
                                    screenOptions={{
                                        animation: 'fade'
                                    }}
                                >
                                    <Stack.Screen name="(app)" options={{ headerShown: false }} />
                                    <Stack.Screen name="+not-found" />
                                </Stack>

                            </ThemeProvider>
                        </AddressStoreProvider>
                    </ServiceStoreProvider>
                </AuthStoreProvider>
            </ApolloProvider>
            {/* </SessionProvider> */}
        </QueryClientProvider>
    );
}
