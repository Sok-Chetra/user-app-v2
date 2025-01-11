import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OnBoardPage } from '@/libs/types/onboard-page/types'
import { Ionicons } from '@expo/vector-icons';
import Animated, { clamp, interpolate, SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { router } from 'expo-router';
import { useSession } from '@/providers/auth/AuthContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
    data: OnBoardPage[];
    dataLength: number;
    screenWidth: number;
    x: SharedValue<number>;
    currentIndex: number;
}

const RADIUS = 100;

const ButtonNext = ({
    data,
    dataLength,
    screenWidth,
    x,
    currentIndex
}: Props) => {
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
    const { session } = useSession()

    const animatedOpacityButton = useAnimatedStyle(() => {
        const opacity = interpolate(
            Math.abs(x.value % screenWidth),
            [0, 40],
            [1, 0],
            'clamp'
        )

        return {
            opacity
        }
    })

    const handleNext = async () => {
        if (currentIndex === dataLength - 1) {
            await AsyncStorage.setItem('hasViewedOnboarding', 'true')
            if (!session) {
                router.replace('/(app)/(auth)')
            } else {
                router.replace('/(app)/(main)/(tabs)')
            }
        } else {
            const clampValue = clamp(
                Math.abs(x.value) + screenWidth,
                0,
                (dataLength - 1) * screenWidth
            );
            x.value = withTiming(-clampValue, { duration: 1000 })
        }
    }

    return (
        <AnimatedPressable
            onPress={handleNext}
            style={[
                styles.button,
                animatedOpacityButton
            ]}
        >
            <Ionicons
                name='chevron-forward-outline'
                size={50}
                color={'white'}
            />
        </AnimatedPressable>
    )
}

export default ButtonNext

const styles = StyleSheet.create({
    button: {

        position: 'absolute',

        width: RADIUS,
        height: RADIUS,
        bottom: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RADIUS
    }
})