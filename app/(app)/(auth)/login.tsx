import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { router, useFocusEffect } from 'expo-router'
import ThreeCircle from '@/components/animated/circles/ThreeCircle'
import { Ionicons } from '@expo/vector-icons'
import InputWithIcon from '@/components/input/InputWithIcon'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/providers/auth/AuthProvider'

const loginSchema = z.object({
    nameEmail: z.string(),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type Props = {}

const Login = (props: Props) => {
    const [isLoading, setIsLoading] = useState(true)
    const { width: SCREEN_WIDTH } = useWindowDimensions()
    const { bottom } = useSafeAreaInsets()
    const { setAccessToken, setRefreshToken, setUser } = useAuthStore(state => state)

    const { data, mutate } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (fields: { nameEmail: string; password: string }) => {
            const apiUrl = `http://192.168.110.186:5000/auth/login`
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            })
            const data = await res.json();
            if (data.message) {
                return data
            }
        },
        onSuccess: async (data) => {
            // const apiUrl = `http://192.168.110.186:5000/auth/request-email-verification`
            if (data) {
                setAccessToken(data.accessToken)
                setRefreshToken(data.refreshToken)
                setUser(data.data)
                // console.log(JSON.stringify(data, null, 2))
            }

        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            nameEmail: "",
            password: "",
        },
    });

    async function onLogin(values: z.infer<typeof loginSchema>) {
        mutate(values)
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={[styles.bodyContainer]}>
                        <View style={{ zIndex: 60, paddingBottom: 60 }}>
                            <Text style={{ color: '#FF6500', paddingHorizontal: 20, fontSize: 35, fontWeight: 'bold', textAlign: 'center' }}>Login</Text>
                        </View>

                        <View style={[styles.formContainer, { paddingBottom: Platform.OS === 'ios' ? 80 : bottom + 30, }]}>
                            <Controller
                                name="nameEmail"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => {
                                    return (

                                        <InputWithIcon
                                            style={{
                                                height: 50,
                                            }}
                                            inputProps={{
                                                value: value,
                                                onChangeText: onChange,
                                                placeholder: 'Email',
                                                style: {
                                                    color: '#0B192C'
                                                }
                                            }}
                                            icon={() => (
                                                <Ionicons
                                                    name='mail-outline'
                                                    size={22}
                                                    color={'#a3a3a3'}
                                                    style={[styles.inputIcon]}
                                                />
                                            )}
                                            error={() => {
                                                if (errors.nameEmail) {
                                                    return (
                                                        <Text style={[styles.errorText]}>
                                                            {errors.nameEmail.message}
                                                        </Text>
                                                    )
                                                }
                                            }}
                                        />
                                    )
                                }}
                            />
                            <Controller
                                name="password"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => {
                                    return (

                                        <InputWithIcon
                                            style={styles.input}
                                            inputProps={{
                                                value: value,
                                                onChangeText: onChange,
                                                placeholder: 'Password',
                                                style: {
                                                    color: '#0B192C'
                                                }
                                            }}
                                            icon={() => (
                                                <Ionicons
                                                    name='lock-closed-outline'
                                                    size={22}
                                                    color={'#a3a3a3'}
                                                    style={[styles.inputIcon]}
                                                />
                                            )}
                                            error={() => {
                                                if (errors.password) {
                                                    return (
                                                        <Text style={[styles.errorText]}>
                                                            {errors.password.message}
                                                        </Text>
                                                    )
                                                }
                                            }}
                                        />
                                    )
                                }}
                            />
                            <Pressable onPress={() => router.push('/forgot-password')} style={{ alignSelf: 'flex-end' }}>
                                <Text style={[styles.forgotPassword]}>Forgot password?</Text>
                            </Pressable>
                            <Pressable
                                onPress={handleSubmit(onLogin)}
                                style={[styles.button]}
                            >
                                <Text style={[styles.buttonText]}>Sign in</Text>
                            </Pressable>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Text style={[styles.forgotPassword]}>Already have an account?</Text>
                                <Pressable onPress={() => router.push('/signup')}>
                                    <Text style={[styles.signUp]}>Sign up</Text>
                                </Pressable>
                            </View>
                        </View>
                        {/* Circle Animation */}
                        <ThreeCircle
                            setIsLoading={setIsLoading}
                            circleOneStyle={{
                                width: SCREEN_WIDTH * 1.7,
                                height: Platform.OS === 'ios' ? SCREEN_WIDTH * 2.8 : SCREEN_WIDTH * 2.6,
                                left: '-34%'
                            }}
                            circleTwoStyle={{
                                width: SCREEN_WIDTH * 1.8,
                                height: Platform.OS === 'ios' ? SCREEN_WIDTH * 3 : SCREEN_WIDTH * 2.8,
                                left: '-40%',
                            }}
                            circleThreeStyle={{
                                width: SCREEN_WIDTH * 1.8,
                                height: Platform.OS === 'ios' ? SCREEN_WIDTH * 3 : SCREEN_WIDTH * 2.8,
                                left: '-40%',
                                bottom: '-45%'
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    formContainer: {
        paddingHorizontal: 20,
        zIndex: 60,
        alignItems: 'center',
        gap: 30,

    },
    button: {
        backgroundColor: '#FF6500',
        width: '100%',
        height: 40,
        borderRadius: 99999999,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 700,
        color: 'white'
    },
    input: {
        height: 50,
    },
    inputIcon: {
        paddingLeft: 15,
        paddingRight: 5
    },
    forgotPassword: {
        color: 'white'
    },
    signUp: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6500'
    },
    errorText: {
        color: 'red',
        paddingHorizontal: 20,
        marginTop: 3
    }
})