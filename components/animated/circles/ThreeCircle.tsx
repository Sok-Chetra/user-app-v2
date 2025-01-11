import { DimensionValue, StyleSheet, Text, useWindowDimensions, View, ViewStyle } from 'react-native'
import React, { useEffect } from 'react'
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    enableLayoutAnimations
} from 'react-native-reanimated'

type Props = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    circleOneStyle?: ViewStyle,
    circleTwoStyle?: ViewStyle,
    circleThreeStyle?: ViewStyle
}
enableLayoutAnimations(true)
const ThreeCircle = ({
    setIsLoading,
    circleOneStyle,
    circleTwoStyle,
    circleThreeStyle,
}: Props) => {

    const { width: SCREEN_WIDTH } = useWindowDimensions()
    // Shared values for Circle One and Circle Two
    const circleOneScale = useSharedValue(0.5); // Start small
    const circleTwoScale = useSharedValue(0.5); // Start small
    const circleThreeScale = useSharedValue(0.5); // Start small

    // Animated styles for Circle One
    const circleOneStyleAnimation = useAnimatedStyle(() => ({
        transform: [{ scale: circleOneScale.value }],
    }));

    // Animated styles for Circle Two
    const circleTwoStyleAnimation = useAnimatedStyle(() => ({
        transform: [{ scale: circleTwoScale.value }],
    }));

    const circleThreeStyleAnimation = useAnimatedStyle(() => ({
        transform: [{ scale: circleThreeScale.value }],
    }));

    // Forward animations
    useEffect(() => {
        circleOneScale.value = withSpring(1, { damping: 20, stiffness: 90 }, (isFinished) => {
            if (isFinished) {
                circleTwoScale.value = withSpring(1, { damping: 20, stiffness: 90 }, (isFinished) => {
                    if (isFinished) {
                        circleThreeScale.value = withSpring(1, { damping: 20, stiffness: 90 }, (isFinished) => {
                            if (isFinished) {
                                runOnJS(setIsLoading)(false)
                            }
                        });
                    }
                });
            }
        });
    }, []);

    return (
        <>
            <Animated.View
                style={[
                    styles.circle1,
                    circleOneStyleAnimation,
                    circleOneStyle
                ]}
            />
            <Animated.View
                style={[
                    styles.circle2,
                    circleTwoStyleAnimation,
                    circleTwoStyle
                ]}
            />
            <Animated.View
                style={[
                    circleThreeStyleAnimation,
                    styles.circle3,
                    circleThreeStyle
                ]}
            />
        </>
    )
}

export default ThreeCircle

const styles = StyleSheet.create({
    circle1: {
        position: 'absolute',
        bottom: '-65%',
        left: '-15%',
        backgroundColor: '#0B192C',
        borderRadius: 999999999,
        zIndex: 50
    },
    circle2: {
        position: 'absolute',
        bottom: '-60%',
        left: '-25%',
        backgroundColor: '#C6E7FF',
        borderRadius: 999999999,
        zIndex: 10,
        opacity: 0.5
    },
    circle3: {
        position: 'absolute',
        bottom: '-40%',
        left: '-25%',
        backgroundColor: '#F2F9FF',
        borderRadius: 999999999,
        zIndex: 5,
        opacity: 0.5
    }
})