import {
    Button,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View
} from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import ThreeCircle from '@/components/animated/circles/ThreeCircle'
import Animated, { FadeIn } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {}

const Auth = (props: Props) => {
    const [isLoading, setIsLoading] = useState(true)
    const { width: SCREEN_WIDTH } = useWindowDimensions()

    const handleClear = async () => {
        await AsyncStorage.setItem('hasViewedOnboarding', 'false')
        router.reload()
    }

    return (
        <View style={[styles.container]}>

            <View style={[styles.headerContainer]}>
                {!isLoading &&
                    <>
                        <Animated.Image
                            entering={FadeIn.duration(500)}
                            source={require('@/assets/logo.png')}
                            style={{
                                width: 100,
                                height: 100
                            }}
                        />
                        <Animated.Text entering={FadeIn.delay(200).duration(500)} style={[styles.titleText]}>
                            User App
                        </Animated.Text>
                        <Button title='clear onBoard' onPress={handleClear} />
                    </>
                }
            </View>


            <View style={[styles.bodyContainer]}>
                <View style={[styles.buttonContainer]}>
                    <Pressable
                        onPress={() => router.push('/login')}
                        style={[
                            styles.button,
                            {
                                backgroundColor: '#FF6500'
                            }
                        ]}
                    >
                        <Text style={[styles.buttonText]}>Sign in</Text>
                    </Pressable>
                    <Pressable onPress={() => router.push('/signup')} style={[styles.button]}>
                        <Text style={[styles.buttonText]}>Sign up</Text>
                    </Pressable>
                </View>
                <ThreeCircle
                    setIsLoading={setIsLoading}
                    circleOneStyle={{
                        width: SCREEN_WIDTH * 1.3,
                        height: SCREEN_WIDTH * 1.3,
                    }}
                    circleTwoStyle={{
                        width: SCREEN_WIDTH * 1.5,
                        height: SCREEN_WIDTH * 1.5,
                    }}
                    circleThreeStyle={{
                        width: SCREEN_WIDTH * 1.5,
                        height: SCREEN_WIDTH * 1.6,
                    }}
                />
            </View>
        </View>
    )
}

export default Auth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        flex: 1,
        borderBottomRightRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 60
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#435585'
    },
    bodyContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        paddingBottom: 60,
        zIndex: 60,
        alignItems: 'center',
        gap: 20,

    },
    button: {
        backgroundColor: '#1E3E62',
        width: 150,
        height: 40,
        borderRadius: 99999999,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 700,
        color: 'white'
    }
})