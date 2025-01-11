
import {
    FontAwesome,
    Fontisto,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    SimpleLineIcons
} from "@expo/vector-icons";
import {
    Href,
    router,
    useFocusEffect
} from "expo-router";
import {
    useCallback,
    useState
} from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    StatusBar
} from "react-native";
import {
    GestureHandlerRootView,
    Pressable
} from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

const accountButtons = [
    {
        id: 1,
        title: 'Edit Profile',
        icon: <FontAwesome name="user-o" size={25} />,
        link: '/profile/account/1'
    },
    {
        id: 2,
        title: 'Change Email',
        icon: <Fontisto name="email" size={25} />,
        link: '/profile/account/change-email'
    },
    {
        id: 3,
        title: 'Change Password',
        icon: <MaterialIcons name="password" size={25} />,
        link: '/profile/account/change-password'
    },
    {
        id: 4,
        title: 'Change Phone number',
        icon: <Ionicons name="phone-portrait-outline" size={25} />,
        link: '/profile/account/change-phone-number'
    },
]

export default function AccountScreen() {
    const [visible, setVisible] = useState(true);

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

                                    {/* Settings Buttons */}
                                    <View style={styles.settingButtonsContainer}>
                                        {accountButtons.map((button) => (
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
        paddingHorizontal: 10
    },
    scrollContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight
    },
    settingButtonsContainer: {
        borderColor: '#d5d5d5',
        paddingHorizontal: 10,
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