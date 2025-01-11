
import { Feather, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, View, StyleSheet, StatusBar, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, Pressable, ScrollView, TextInput } from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeOutDown, FadeOutUp } from "react-native-reanimated";

export default function NewPassword() {
    const [visible, setVisible] = useState(true);
    const TABBAR_HEIGHT = useBottomTabBarHeight()
    const [password, setPassword] = useState(''); // Default password for demonstration
    const [showPassword, setShowPassword] = useState(false);
    const [isEdit, setIsEdit] = useState(false)

    const onChangePassword = (text: string) => {
        setPassword(text);
    }

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleSavePassword = () => {
        alert('Your password have been changed!')
    };

    useEffect(() => {
        setVisible(true);
    }, [])

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
                                            .delay(200)
                                            .duration(500)
                                            .withInitialValues({
                                                transform: [{ translateY: 400 }]
                                            })
                                    }

                                    exiting={
                                        FadeOutDown
                                            .delay(300)
                                            .duration(500)
                                    }
                                >
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            gap: 20,
                                            paddingBottom: 20,
                                            paddingHorizontal: Platform.OS === 'ios' ? 20 : 20,
                                        }}
                                    >
                                        <Ionicons name='lock-closed-outline' size={100} color={'#217af7'} />
                                        <Text
                                            className="text-center text-xl"
                                        >
                                            Passwords are the first line of defense in protecting your digital identity and sensitive information.
                                        </Text>
                                    </View>

                                    <View>
                                        <Text
                                            style={{
                                                paddingHorizontal: Platform.OS === 'ios' ? 20 : 20,
                                                paddingBottom: 10,
                                                fontSize: 16,
                                                fontWeight: '500',
                                                color: '#717171'
                                            }}
                                        >
                                            New Password
                                        </Text>

                                        <View style={{
                                            position: 'relative',
                                            backgroundColor: 'white',
                                            height: 50,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            borderRadius: 10,
                                            overflow: 'hidden'
                                        }}>
                                            <TextInput
                                                value={password}
                                                onChangeText={onChangePassword}
                                                placeholder="Enter your new password"
                                                secureTextEntry={!showPassword}
                                                clearTextOnFocus={false}
                                                selectTextOnFocus={false}
                                                clearButtonMode="while-editing"
                                                placeholderClassName="tracking-normal"
                                                style={{
                                                    flex: 1,
                                                    textAlignVertical: 'center',
                                                    fontSize: Platform.OS === 'ios' ? 16 : 18,
                                                    paddingLeft: 20,
                                                    color: 'black'
                                                }}
                                            />

                                            <TouchableOpacity
                                                onPress={toggleShowPassword}
                                                style={{
                                                    width: 60,
                                                    height: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',

                                                }}
                                            >
                                                <Ionicons
                                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                                    size={22}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Animated.View>
                            )}
                        </ScrollView>
                    </GestureHandlerRootView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    animateContainer: {
        flex: 1,
        position: 'relative',
        paddingHorizontal: 10,
        gap: 20
    },
    scrollContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight
    },
    button: {
        marginLeft: 10,
    },
    buttonText: {
        color: 'blue',
        fontSize: 16,
    },
});
