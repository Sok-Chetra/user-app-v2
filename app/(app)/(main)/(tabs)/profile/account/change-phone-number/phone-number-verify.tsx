
import { Feather, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, View, StyleSheet, StatusBar, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, Pressable, ScrollView, TextInput } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown, FadeOutUp } from "react-native-reanimated";

export default function PhoneNumberVerify() {
    const [visible, setVisible] = useState(true);
    const [verifyCode, setVerifyCode] = useState(''); // Default password for demonstration
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (text: string) => {
        setVerifyCode(text);
    }

    const handleNext = () => {
        router.push('/(main)/(tabs)/profile/account/change-phone-number/new-phone-number')
    };

    useEffect(() => {
        alert('sent code!')
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
                                        FadeIn
                                            .delay(300)
                                            .duration(500)
                                            .withInitialValues({
                                                transform: [{ translateY: 400 }]
                                            })
                                    }

                                    exiting={
                                        FadeOut
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
                                        <MaterialCommunityIcons name='numeric' size={100} color={'#217af7'} />
                                        <Text
                                            className="text-center text-xl"
                                        >
                                            Please enter the code that we have sent to your number.
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
                                            Verify Code
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
                                                value={verifyCode}
                                                onChangeText={onChange}
                                                placeholder="Enter 6 digit code"
                                                clearTextOnFocus={false}
                                                selectTextOnFocus={false}
                                                clearButtonMode="while-editing"
                                                inputMode="numeric"
                                                maxLength={6}
                                                style={{
                                                    flex: 1,
                                                    textAlignVertical: 'center',
                                                    fontSize: Platform.OS === 'ios' ? 16 : 18,
                                                    letterSpacing: 1,
                                                    paddingLeft: 20,
                                                    color: 'black'
                                                }}
                                            />
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
