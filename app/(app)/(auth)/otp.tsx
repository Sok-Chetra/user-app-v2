import { useAuthStore } from "@/providers/auth/AuthProvider";
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

export default function OTPScreen() {
    const [visible, setVisible] = useState(true);
    const [inputValue, setValue] = useState('')
    const { setForm, form } = useAuthStore(state => state)

    useFocusEffect(
        useCallback(() => {
            setVisible(true);
        }, [])
    );


    const handleNavigationWithAnimation = (route: Href) => {
        setVisible(false);
        setTimeout(() => {
            setForm({
                ...form,
                otp: inputValue
            })
            router.push(route);
        }, 600);
    };


    const handleNavigateBack = () => {
        setVisible(false);
        setTimeout(() => {
            router.back();
        }, 600);
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
                                                source={require('@/assets/lottie-animation/inbox_delivery.json')}
                                                autoPlay
                                                loop={true}
                                                style={[styles.lottieImage]}

                                                resizeMode="cover"
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.descriptionContainer}>
                                        <Text style={styles.description}>
                                            Please enter the code sent to your Email.
                                        </Text>
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <View className="gap-10">
                                            <View>
                                                <Text
                                                    style={styles.label}
                                                >
                                                    OTP Code
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
                                        <View className="mt-5">
                                            <Pressable
                                                onPress={() => alert('send new code')}
                                            >
                                                <Text
                                                    style={[styles.resendTextLink]}
                                                >
                                                    Didn't recieve code?
                                                </Text>
                                            </Pressable>

                                        </View>
                                        <View className="mt-10">
                                            <Pressable
                                                style={[styles.nextBtn]}
                                                onPress={() => handleNavigationWithAnimation('/set-password')}
                                            >
                                                <Text className="text-center text-white font-semibold text-xl">
                                                    Send
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
        padding: 10,
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