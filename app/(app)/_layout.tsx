import {
    StyleSheet
} from 'react-native'
import React, { useEffect } from 'react'
import {
    Href,
    router,
    Stack,
    useFocusEffect
} from 'expo-router'
import { useSession } from '@/providers/auth/AuthContextProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthStore } from '@/providers/auth/AuthProvider'
import { useMutation, useQuery } from '@tanstack/react-query'

type Props = {}

const AppLayout = (props: Props) => {
    const { refreshToken, accessToken, setAccessToken, setRefreshToken } = useAuthStore(state => state)

    const { data, mutate } = useMutation({
        mutationKey: ['refreshToken'],
        mutationFn: async (refreshToken: string) => {
            const apiUrl = `http://192.168.110.186:5000/auth/refresh-token`;
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${refreshToken!}`
                }
            })
            const data = await res.json();
            return data
        },
        onSuccess(data) {
            if (data) {
                setAccessToken(data.accessToken);
                setRefreshToken(data.refreshToken)
            }
        },
    })

    useEffect(() => {
        const checkOnboarding = async () => {
            const hasViewedOnboarding = await AsyncStorage.getItem("hasViewedOnboarding");
            if (hasViewedOnboarding === 'true') {
                if (!accessToken) {
                    console.log(accessToken)
                    router.replace('/(auth)' as Href)
                } else {
                    router.replace('/(main)/(tabs)' as Href)
                }
            } else {
                router.replace('/')
            }
        }

        if (refreshToken) {
            mutate(refreshToken)
        }

        checkOnboarding()
    }, [accessToken, refreshToken])

    return (
        <Stack
            screenOptions={{
                animation: 'fade'
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
    )
}

export default AppLayout

const styles = StyleSheet.create({})