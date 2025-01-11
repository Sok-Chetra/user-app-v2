import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Octicons } from '@expo/vector-icons'
import Animated, { Easing, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'

type Props = {}

const ThirdType = (props: Props) => {
    const firstValue = useSharedValue(30)
    const secondValue = useSharedValue(30)
    const thirdValue = useSharedValue(30)
    const isOpen = useSharedValue(false)
    const progress = useDerivedValue(() => isOpen.value ? withTiming(1) : withTiming(0))

    const handlePress = () => {
        const config = {
            easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
            duration: 500
        }
        if (isOpen.value) {
            firstValue.value = withTiming(30, config)
            secondValue.value = withDelay(50, withTiming(30, config))
            thirdValue.value = withDelay(100, withTiming(30, config))
        } else {
            firstValue.value = withDelay(200, withSpring(130))
            secondValue.value = withDelay(100, withSpring(200))
            thirdValue.value = withSpring(270)
        }
        isOpen.value = !isOpen.value;
    }

    const firstIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            firstValue.value,
            [30, 130],
            [0, 1],
            'clamp'
        )

        return {
            bottom: firstValue.value,
            transform: [{ scale: scale }]
        }
    })

    const secondIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            secondValue.value,
            [30, 200],
            [0, 1],
            'clamp'
        )

        return {
            bottom: secondValue.value,
            transform: [{ scale: scale }]
        }
    })

    const thirdIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            thirdValue.value,
            [30, 270],
            [0, 1],
            'clamp'
        )

        return {
            bottom: thirdValue.value,
            transform: [{ scale: scale }]
        }
    })

    const plusIcon = useAnimatedStyle(() => {
        return { transform: [{ rotate: `${progress.value * 45}deg` }] }
    })

    return (
        <View style={[styles.container]}>
            <Animated.View style={[styles.contentContainer, thirdIcon]}>
                <View style={[styles.iconContainer]}>
                    <Octicons name='plus' size={30} color={'white'} />
                </View>
            </Animated.View>
            <Animated.View style={[styles.contentContainer, secondIcon]}>
                <View style={[styles.iconContainer]}>
                    <Octicons name='plus' size={30} color={'white'} />
                </View>
            </Animated.View>
            <Animated.View style={[styles.contentContainer, firstIcon]}>
                <View style={[styles.iconContainer]}>
                    <Octicons name='plus' size={30} color={'white'} />
                </View>
            </Animated.View>
            <Pressable onPress={handlePress} style={[styles.contentContainer]}>
                <Animated.View style={[styles.iconContainer, plusIcon]}>
                    <Octicons name='plus' size={30} color={'white'} />
                </Animated.View>
            </Pressable>
        </View>
    )
}

export default ThirdType

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        backgroundColor: 'gray',
        position: 'absolute',
        bottom: 30,
        right: 30,
        borderRadius: 999999
    },
    iconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})