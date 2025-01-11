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

// type Status = {
//     status: 'verify' | 'alreadyHaveAccount' | 'sentVerification' | 'requestPasswordChange' | 'underReview'
// }
type Status = keyof typeof notice_content;

const notice_content = {
    verify: {
        title: 'Verify Your Email',
        description: 'We have sent a verification link to your email. Please check your inbox and click the link to verify your email address.',
        buttons: [
            { text: 'Resend', link: '/notice' },
        ]
    },
    alreadyHaveAccount: {
        title: 'You might already have an account',
        description: 'Please check your email box for the verification and follow the instruction.',
        buttons: [
            { text: 'Resend', link: '/notice' },
        ]
    },
    sentVerification: {
        title: 'Verification Email Sent',
        description: 'We just sent you a verification email to your mailbox. Please follow the instructions there.',
        buttons: [
            { text: 'Resend', link: '/notice' },
        ]
    },
    requestPasswordChange: {
        title: 'Password Change Requested',
        description: 'You just requested to change your password. If the email is correct, you should receive an email.',
        buttons: [
            { text: 'Resend', link: '' },
            { text: 'Back', link: '/login' },
        ]
    },
    underReview: {
        title: 'Account Under Review',
        description: 'Your account is currently under review. Please come back later.',
        buttons: [
            { text: 'OK', link: '/(main)' },
        ]
    }
};

const notice_images = {
    verify: require('@/assets/lottie-animation/message-sent.json'),
    alreadyHaveAccount: require('@/assets/lottie-animation/target_customer.json'),
    sentVerification: require('@/assets/lottie-animation/message-sent.json'),
    requestPasswordChange: require('@/assets/lottie-animation/email_writing.json'),
    underReview: require('@/assets/lottie-animation/stickers.json'),
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

export default function NoticeScreen() {
    const [visible, setVisible] = useState(true);
    const [inputValue, setValue] = useState('')

    let status: Status = 'alreadyHaveAccount'

    const { title, description, buttons } = notice_content[status];
    const image = notice_images[status];


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

    const handleClickResend = () => {
        switch (status) {
            case 'verify' as Status:
                alert('Email Verification have been sent!')
                break;
            case 'alreadyHaveAccount' as Status:
                alert('You want to login!')
                break;
            case 'sentVerification' as Status:
                alert('Email Verification have been sent!')
                break;
            case 'requestPasswordChange' as Status:
                alert('Reset Password request have been sent!')
                break;
            case 'underReview' as Status:
                alert('Thank you for your patient!')
                break;

            default:
                handleNavigationWithAnimation('/login')
                break;
        }
    }

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
                                                source={image}
                                                autoPlay
                                                loop={true}
                                                style={[styles.lottieImage]}

                                                resizeMode="cover"
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.descriptionContainer}>
                                        <Text style={styles.description}>
                                            {description}
                                        </Text>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <View className="mt-10 gap-5">
                                            {buttons.map((btn, index) => (
                                                <Pressable
                                                    key={index}
                                                    style={[styles.nextBtn]}
                                                    onPress={
                                                        btn.text === 'Resend'
                                                            ? handleClickResend // Call resend logic
                                                            : () => handleNavigationWithAnimation(btn.link as Href) // Navigate for other buttons
                                                    }
                                                >
                                                    <Text className="text-center text-white font-semibold text-xl">
                                                        {btn.text}
                                                    </Text>
                                                </Pressable>
                                            ))}

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
    buttonContainer: {
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