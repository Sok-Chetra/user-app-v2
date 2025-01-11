
import { Entypo, Feather, Ionicons, MaterialCommunityIcons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, View, StyleSheet, StatusBar, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, Pressable, ScrollView, TextInput } from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeOutDown, FadeOutUp } from "react-native-reanimated";

export default function ChangePhoneNumber() {
    const [visible, setVisible] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState<string>('12345678');
    const [prevPhoneNumber, setPrevPhoneNumber] = useState<string>('12345678');
    const [isEdit, setIsEdit] = useState(false)

    const onChangePhoneNumber = (text: string) => {
        // Clean input by removing any non-digit characters
        const cleanedText = text.replace(/\D/g, "");
        const formatted = formatPhoneNumber(cleanedText); // Format without adding country code
        setPhoneNumber(formatted); // Update the phone number state
    };

    const handleEdit = () => {
        if (!isEdit) {
            setIsEdit(true)
        } else {
            router.push('/(main)/(tabs)/profile/account/change-phone-number/phone-number-verify')
        }
    }

    const handleCancel = () => {
        setIsEdit(false);
        setPhoneNumber(prevPhoneNumber)
    }

    const formatPhoneNumber = (number: string): string => {
        const cleaned = number.replace(/\D/g, ""); // Remove any non-digit characters
        let formatted = cleaned;

        switch (formatted.length) {
            case 2:
                formatted = formatted.replace(/(\d{2})/, "$1");
                break;
            case 3:
                formatted = formatted.replace(/(\d{2})(\d{1})/, "$1 $2");
                break;
            case 4:
                formatted = formatted.replace(/(\d{2})(\d{2})/, "$1 $2");
                break;
            case 5:
                formatted = formatted.replace(/(\d{2})(\d{2})/, "$1 $2");
                break;
            case 6:
                formatted = formatted.replace(/(\d{2})(\d{3})(\d{1})/, "$1 $2 $3");
                break;
            case 7:
                formatted = formatted.replace(/(\d{2})(\d{3})(\d{2})/, "$1 $2 $3");
                break;
            default:
                formatted = formatted.replace(/(\d{2})(\d{3})(\d{3})/, "$1 $2 $3");
                break;
        }

        return formatted;
    };

    useEffect(() => {
        setPhoneNumber(formatPhoneNumber(phoneNumber))
    })

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
                                            .delay(300)
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
                                        <Entypo name='old-phone' size={100} color={'#217af7'} />
                                        <Text
                                            className="text-center text-xl"
                                        >
                                            Your phone number serves as an essential element for communication, authentication, and account security.
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
                                            Phone number
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
                                                value="+44"
                                                style={{
                                                    fontSize: Platform.OS === 'ios' ? 16 : 18,
                                                    paddingLeft: 20,
                                                    letterSpacing: 2,
                                                    color: !isEdit ? '#7e7e7e' : 'black'
                                                }}
                                                editable={false}
                                            />
                                            <TextInput
                                                value={phoneNumber}
                                                onChangeText={onChangePhoneNumber}

                                                placeholder=""
                                                keyboardType="phone-pad"
                                                dataDetectorTypes={"phoneNumber"}
                                                inputMode="tel"
                                                maxLength={12}
                                                editable={isEdit}
                                                style={{
                                                    flex: 1,
                                                    textAlignVertical: 'center',
                                                    fontSize: Platform.OS === 'ios' ? 16 : 18,
                                                    letterSpacing: 2,
                                                    marginLeft: Platform.OS === 'ios' ? 0 : -4.5,
                                                    color: !isEdit ? '#7e7e7e' : 'black'
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
    )
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
})