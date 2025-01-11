import { Feather, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Href, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, View, StyleSheet, StatusBar, TouchableWithoutFeedback, Image } from "react-native";
import { GestureHandlerRootView, Pressable, ScrollView, TextInput } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown, FadeOutUp } from "react-native-reanimated";

export default function ChangeEmail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [visible, setVisible] = useState(true);
    const [isEdit, setIsEdit] = useState(false)
    const [email, setEmail] = useState('chetra.ztoa@gmail.com');
    const [prevEmail, setPrevEmail] = useState('chetra.ztoa@gmail.com')

    useEffect(() => {
        setVisible(true);
    }, [])

    const handleEdit = () => {
        if (!isEdit) {
            setIsEdit(true)
        } else {
            router.push('/email-verify' as Href)
        }
    }

    const handleCancel = () => {
        setIsEdit(false);
        setEmail(prevEmail)
    }

    const onChangeEmail = (email: string) => {
        setEmail(email)
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
                                        <MaterialCommunityIcons name='email-edit-outline' size={100} color={'#217af7'} />
                                        <Text
                                            className="text-center text-xl"
                                        >
                                            Email helps you access your account. It isn't visible to others.
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
                                            Email
                                        </Text>
                                        <View
                                            style={{
                                                position: 'relative',
                                                backgroundColor: 'white',
                                                height: 50,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                borderRadius: 10,
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <TextInput
                                                value={email}
                                                onChangeText={onChangeEmail}
                                                placeholder="Your email"
                                                clearTextOnFocus={false}
                                                selectTextOnFocus={false}
                                                clearButtonMode="while-editing"
                                                editable={isEdit}
                                                inputMode="email"
                                                style={{
                                                    flex: 1,
                                                    textAlignVertical: 'center',
                                                    fontSize: Platform.OS === 'ios' ? 16 : 18,
                                                    letterSpacing: 1,
                                                    paddingLeft: 20,
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
})