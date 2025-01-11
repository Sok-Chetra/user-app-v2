
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, View, StyleSheet, StatusBar, TouchableWithoutFeedback } from "react-native";
import { GestureHandlerRootView, ScrollView, TextInput } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function NewEmail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [visible, setVisible] = useState(true);
    const [newEmail, setNewEmail] = useState('');
    const [isEdit, setIsEdit] = useState(false)

    useFocusEffect(() => {
        setVisible(true)
    })

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
                                        <MaterialIcons name='alternate-email' size={100} color={'#217af7'} />
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
                                            New Email
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
                                                value={newEmail}
                                                onChangeText={setNewEmail}
                                                placeholder="Enter your new email"
                                                clearTextOnFocus={false}
                                                selectTextOnFocus={false}
                                                clearButtonMode="while-editing"
                                                inputMode="email"
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