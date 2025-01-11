import { Appearance, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

type Props = {
    setThemeSwitch: React.Dispatch<React.SetStateAction<"system" | "light" | "dark">>;
    setTheme: React.Dispatch<React.SetStateAction<string | null | undefined>>;
    theme: string | null | undefined;
    themeSwitch: string;
}

const ModeSwitcher = ({
    setThemeSwitch,
    setTheme,
    theme,
    themeSwitch
}: Props) => {
    const colorSchema = Appearance.getColorScheme()
    const { width: SCREEM_WIDTH } = useWindowDimensions()
    const SWITCH_SLIDE_CONTAINER_WIDTH = SCREEM_WIDTH * 0.9
    const SWITCH_SLIDE_WIDTH = SCREEM_WIDTH * 0.9 / 3
    const translateX = useSharedValue(SWITCH_SLIDE_WIDTH * 0);

    const translateAnimation = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: translateX.value
            }]
        }
    })

    useEffect(() => {
        if (themeSwitch === 'system') {
            translateX.value = withSpring(SWITCH_SLIDE_WIDTH * 0)
        } else if (themeSwitch === 'light') {
            translateX.value = withSpring(SWITCH_SLIDE_WIDTH * 1)
        } else if (themeSwitch === 'dark') {
            translateX.value = withSpring(SWITCH_SLIDE_WIDTH * 2)
        }
        // alert(themeSwitch)
    }, [themeSwitch])

    return (
        <View
            style={[styles.container, { width: SWITCH_SLIDE_CONTAINER_WIDTH }]}
        >
            <Animated.View
                style={[
                    styles.slideContainer,
                    translateAnimation,
                    {
                        width: SWITCH_SLIDE_WIDTH
                    }
                ]}
            >
                <View
                    style={[
                        styles.slide,
                        {
                            width: SCREEM_WIDTH * 0.8 / 3
                        }
                    ]}
                />
            </Animated.View>
            <Text>

            </Text>
            <Pressable
                onPress={() => {
                    setThemeSwitch('system');
                    if (colorSchema) {
                        setTheme(colorSchema)
                    }
                }}
                style={[
                    styles.button
                ]}
            >
                <Text
                    style={[
                        styles.textButton
                    ]}
                >
                    System
                </Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    setThemeSwitch('light');
                    setTheme('light')
                }}
                style={[
                    styles.button,

                ]}
            >
                <Text
                    style={[
                        styles.textButton
                    ]}
                >
                    Light
                </Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    setThemeSwitch('dark');
                    setTheme('dark')
                }}
                style={[
                    styles.button
                ]}
            >
                <Text
                    style={[
                        styles.textButton
                    ]}
                >
                    Dark
                </Text>
            </Pressable>
        </View>
    )
}

export default ModeSwitcher

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'lightgray',
        borderRadius: 40,
        overflow: 'hidden'
    },
    button: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textButton: {
        textAlign: 'center'
    },
    slideContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        backgroundColor: 'white',
        padding: 23,
        borderRadius: 30
    }
})