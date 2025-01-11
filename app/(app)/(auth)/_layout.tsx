import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

type Props = {}

const AuthLayout = (props: Props) => {
    return (
        <Stack
            screenOptions={{
                animation: 'fade'
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
            <Stack.Screen name="otp" options={{ headerShown: false }} />
            <Stack.Screen name="set-password" options={{ headerShown: false }} />
            <Stack.Screen name="set-phone" options={{ headerShown: false }} />
            <Stack.Screen name="notice" options={{ headerShown: false }} />
        </Stack>
    )
}

export default AuthLayout

const styles = StyleSheet.create({})