import { useAuthStore } from "@/providers/auth/AuthProvider";
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Href, router, useFocusEffect } from "expo-router";
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useState } from "react";
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
    StatusBar,
    Image
} from "react-native";
import { GestureHandlerRootView, Pressable, ScrollView, TextInput } from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

const settingButtons = [
    {
        id: 1,
        title: 'Account',
        icon: <FontAwesome name="user" size={25} />,
        link: '/profile/account'
    },
    {
        id: 2,
        title: 'Address',
        icon: <Ionicons name="location" size={25} />,
        link: '/profile/address'
    },
    {
        id: 3,
        title: 'Messages',
        icon: <Entypo name="message" size={25} />,
        link: ''
    },
    {
        id: 4,
        title: 'Transaction History',
        icon: <MaterialIcons name="work-history" size={25} />,
        link: ''
    },
    {
        id: 5,
        title: 'Settings',
        icon: <Ionicons name="settings" size={25} />,
        link: ''
    },
]

export default function ProfileScreen() {
    const [visible, setVisible] = useState(true);
    const TABBAR_HEIGHT = useBottomTabBarHeight()
    const [inputValue, setValue] = useState('')
    const { user, setUser, setAccessToken, setRefreshToken } = useAuthStore(state => state)

    const handleNavigationWithAnimation = (route: Href) => {
        setVisible(false);
        setTimeout(() => {
            router.push(route);
        }, 600);
    };

    useEffect(() => {
        console.log(JSON.stringify(user, null, 2))
    }, [user])

    return (
        <View style={styles.safeArea}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                    <GestureHandlerRootView>
                        {/* <View className="absolute left-5" style={{ top: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight! + 20 }}>
                            <Pressable
                                onPress={handleNavigateBack}
                                style={{
                                    zIndex: 1
                                }}
                            >
                                <Text className="text-[#217af7] font-bold text-xl">
                                    Back
                                </Text>
                            </Pressable>
                        </View> */}

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
                                {/* User Profile */}
                                <Pressable
                                    style={{
                                        height: 160,
                                        justifyContent: 'flex-end',
                                        paddingBottom: 20
                                    }}
                                    onPress={() => handleNavigationWithAnimation('/profile/account/1')}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 20
                                        }}
                                    >
                                        <View
                                            style={{
                                                height: 100,
                                                width: 100,
                                            }}
                                        >
                                            <Image
                                                className="rounded-2xl"
                                                source={require('@/assets/images/placholder/newsfeed/cat.jpg')}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                                resizeMode="cover"
                                                resizeMethod="scale"
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text
                                                style={{
                                                    fontSize: 24,
                                                    fontWeight: '600',
                                                    color: '#0A5EB0',
                                                    textTransform: 'capitalize'
                                                }}
                                                numberOfLines={1}
                                            >
                                                {user?.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: '#939393',
                                                    fontWeight: '500',
                                                    fontSize: Platform.OS === 'ios' ? 16 : 15
                                                }}
                                            >
                                                {user?.email}
                                            </Text>
                                        </View>
                                    </View>
                                </Pressable>

                                {/* Settings Buttons */}
                                <View style={styles.settingButtonsContainer}>
                                    {settingButtons.map((button) => (
                                        <View key={button.id}>
                                            <Pressable
                                                style={styles.buttonContainer}
                                                onPress={() => handleNavigationWithAnimation(button.link as Href)}
                                            >
                                                <View
                                                    style={styles.buttonIconWithTextContainer}
                                                >
                                                    <View
                                                        style={styles.buttonIcon}
                                                    >
                                                        {button.icon}
                                                    </View>
                                                    <Text
                                                        style={styles.buttonText}
                                                    >
                                                        {button.title}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <MaterialCommunityIcons
                                                        name="chevron-right"
                                                        size={25}
                                                    />
                                                </View>
                                            </Pressable>
                                        </View>
                                    ))}

                                </View>

                                {/* Others Buttons */}
                                {/* <View style={{ height: SCREEN_HEIGHT / 3 }}>

                                        <Text>
                                            others
                                        </Text>
                                    </View> */}
                                <Pressable
                                    onPress={() => {
                                        setUser(null);
                                        setAccessToken(null);
                                        setRefreshToken(null);
                                    }}
                                >
                                    <Text>Logout</Text>
                                </Pressable>

                            </Animated.View>
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
        paddingHorizontal: 10
    },
    scrollContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight
    },
    settingButtonsContainer: {

        borderColor: '#d5d5d5',
        paddingVertical: 30,
        gap: 25
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonIconWithTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    buttonIcon: {
        backgroundColor: '#F2F9FF',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: Platform.OS === 'ios' ? 17 : 17,
        fontWeight: '500'
    }
})