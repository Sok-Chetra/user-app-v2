import { useAuthStore } from "@/providers/auth/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { Href, router, useFocusEffect } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { useCallback, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Button,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar
} from "react-native";
import { GestureHandlerRootView, Pressable, ScrollView, TextInput } from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

export default function SetPasswordScreen() {
    const [visible, setVisible] = useState(true);
    const [inputValue, setValue] = useState('')
    const { form, setAccessToken, setRefreshToken } = useAuthStore(state => state)

    const { mutate } = useMutation({
        mutationKey: ["register"],
        mutationFn: async (fields: { email: string; otp: string; password: string; }) => {
            const apiUrl = `http://192.168.110.186:5000/auth/verify-otp-set-password`
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
            const apiUrl = `http://192.168.110.186:5000/auth/login`

            if (data) {
                const res = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nameEmail: data.email, password: inputValue }),
                })
                const loginData = await res.json()

                if (loginData.message) {
                    // console.log(loginData)
                    setAccessToken(loginData.access_token!)
                    setRefreshToken(loginData.refresh_token!)
                    handleNavigationWithAnimation('/set-phone')
                }
            }

        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    useFocusEffect(
        useCallback(() => {
            setVisible(true);
        }, [])
    );


    const handleNavigationWithAnimation = (route: Href) => {
        setVisible(false);
        setTimeout(() => {
            router.push(route);
        }, 600);
    };

    const handleNavigateBack = () => {
        setVisible(false);
        setTimeout(() => {
            router.back();
        }, 600);
    }

    const onSetPassword = async () => {
        const fields = {
            email: form.email!,
            otp: form.otp!,
            password: inputValue
        }
        mutate(fields)
    }

    return (
        <View style={styles.safeArea}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                    <GestureHandlerRootView>

                        <ScrollView
                            style={styles.scrollContainer}
                            contentInset={{
                                bottom: Platform.OS === 'ios' ? 30 : undefined,
                            }}
                            contentContainerStyle={{
                                paddingBottom: Platform.OS === 'ios' ? 0 : 50
                            }}
                            nestedScrollEnabled
                        >
                            {visible && (
                                <Animated.View
                                    style={[styles.animateContainer]}
                                    entering={
                                        FadeInDown
                                            .delay(300)
                                            .duration(500)
                                            .withInitialValues({
                                                transform: [{ translateY: 400 }]
                                            })
                                    }

                                    exiting={
                                        FadeOutUp
                                            .delay(300)
                                            .duration(500)
                                    }
                                >
                                    <View className="items-center mt-20">
                                        <View
                                            className="rounded-full aspect-square"
                                            style={styles.lottieContainer}>
                                            <LottieView
                                                source={require('@/assets/lottie-animation/enter_password.json')}
                                                autoPlay
                                                loop={true}
                                                style={[styles.lottieImage]}

                                                resizeMode="cover"
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.descriptionContainer}>
                                        <Text style={styles.description}>
                                            Please enter your Password to complete setup your Account.
                                        </Text>
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <View className="gap-10">
                                            <View>
                                                <Text
                                                    style={styles.label}
                                                >
                                                    New Password
                                                </Text>
                                                <TextInput
                                                    value={inputValue}
                                                    placeholder=""
                                                    onChangeText={setValue}
                                                    className="placeholder:text-gray-500"
                                                    style={[styles.input]}
                                                />
                                            </View>
                                        </View>
                                        <View className="mt-10">
                                            <Pressable
                                                style={[styles.nextBtn]}
                                                onPress={onSetPassword}
                                            >
                                                <Text className="text-center text-white font-semibold text-xl">
                                                    Next
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Animated.View>
                            )}
                        </ScrollView>
                    </GestureHandlerRootView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white'
    },
    animateContainer: {
        flex: 1,
        position: 'relative',
        gap: 60,
    },
    scrollContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight
    },
    lottieContainer: {
        height: SCREEN_WIDTH / 2,

        backgroundColor: '#e6f3ff',
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lottieImage: {
        width: '100%',
        height: SCREEN_WIDTH / 2,
        minHeight: SCREEN_WIDTH / 2,
    },
    descriptionContainer: {
        paddingHorizontal: 20
    },
    description: {
        fontSize: 17,
        textAlign: 'center',
        lineHeight: 23,
        fontWeight: '500'
    },
    label: {
        color: '#7f8a8f',
        fontWeight: '500'
    },
    inputContainer: {
        paddingHorizontal: 20
    },
    input: {
        color: '#50575a',
        textAlign: 'left',
        textAlignVertical: 'center',
        borderBottomWidth: 1,
        borderColor: '#9ca3af',
        height: 45,
        fontSize: 16,
        fontWeight: '500'
    },
    nextBtn: {
        backgroundColor: '#006bff',
        height: 50,
        justifyContent: 'center',
        borderRadius: 10
    },
    resendTextLink: {
        textAlign: 'right',
        color: '#217af7',
        fontWeight: '700',
        fontSize: 16,
    }
})