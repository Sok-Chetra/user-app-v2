import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import { z } from 'zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputWithIcon from '@/components/input/InputWithIcon';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import ThreeCircle from '@/components/animated/circles/ThreeCircle';
import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/providers/auth/AuthProvider';

const signupSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3, { message: "Username must be at least 3 characters" }),
});

type Props = {}

const signup = (props: Props) => {
    const [isLoading, setIsLoading] = useState(true)
    const { width: SCREEN_WIDTH } = useWindowDimensions()
    const { bottom } = useSafeAreaInsets()
    const { form, setForm } = useAuthStore(state => state)
    const { mutate } = useMutation({
        mutationKey: ["register"],
        mutationFn: async (fields: { name: string; email: string }) => {
            const apiUrl = `http://192.168.110.186:5000/auth/create-account`
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            })
            const data = await res.json();
            if (data.message) {
                return data.data
            }
        },
        onSuccess: async (data, variables, context) => {
            const apiUrl = `http://192.168.110.186:5000/auth/request-otp-code`

            if (data) {
                const res = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: data.email }),
                })
                const dataOtp = await res.json()

                if (dataOtp.message) {
                    setForm({
                        ...form,
                        email: data.email
                    })
                    router.push('/otp')
                }
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
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            name: "",
        },
    });

    async function onRegister(values: z.infer<typeof signupSchema>) {
        mutate(values)
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={[styles.bodyContainer]}>
                        <View style={{ zIndex: 60, paddingBottom: 60 }}>
                            <Text style={{ color: '#FF6500', paddingHorizontal: 20, fontSize: 35, fontWeight: 'bold', textAlign: 'center' }}>Register</Text>
                        </View>

                        <View style={[styles.formContainer, { paddingBottom: Platform.OS === 'ios' ? 80 : bottom + 30, }]}>
                            <Controller
                                name="email"
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
                                                if (errors.email) {
                                                    return (
                                                        <Text style={[styles.errorText]}>
                                                            {errors.email.message}
                                                        </Text>
                                                    )
                                                }
                                            }}
                                        />
                                    )
                                }}
                            />
                            <Controller
                                name="name"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => {
                                    return (

                                        <InputWithIcon
                                            style={styles.input}
                                            inputProps={{
                                                value: value,
                                                onChangeText: onChange,
                                                placeholder: 'Username',
                                                style: {
                                                    color: '#0B192C'
                                                }
                                            }}
                                            icon={() => (
                                                <FontAwesome
                                                    name='user-o'
                                                    size={22}
                                                    color={'#a3a3a3'}
                                                    style={[styles.inputIcon]}
                                                />
                                            )}
                                            error={() => {
                                                if (errors.name) {
                                                    return (
                                                        <Text style={[styles.errorText]}>
                                                            {errors.name.message}
                                                        </Text>
                                                    )
                                                }
                                            }}
                                        />
                                    )
                                }}
                            />
                            <Pressable
                                onPress={handleSubmit(onRegister)}
                                style={[styles.button]}
                            >
                                <Text style={[styles.buttonText]}>Sign up</Text>
                            </Pressable>

                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Text style={[styles.forgotPassword]}>Already have an account?</Text>
                                <Pressable onPress={() => router.push('/login')}>
                                    <Text style={[styles.signIn]}>Sign in</Text>
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

export default signup

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
    signIn: {
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