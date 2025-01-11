import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OnBoardPage } from '@/libs/types/onboard-page/types';
import Animated, { Extrapolation, interpolate, interpolateColor, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    data: OnBoardPage[];
    screenWidth: number;
    x: SharedValue<number>;
}

const RADIUS = 100

const Circle = ({
    data,
    screenWidth,
    x,
}: Props) => {

    // const animatedBackgroundColor = useAnimatedStyle(() => {
    //     const backgroundColor = interpolateColor(
    //         Math.abs(x.value),
    //         [
    //             0,
    //             screenWidth / 2,
    //             screenWidth / 2,
    //             screenWidth - 10,
    //             screenWidth,
    //             (screenWidth * 3) / 2 - 0.0001,
    //             (screenWidth * 3) / 2,
    //             screenWidth * 2 - 10,
    //             screenWidth * 2,
    //             screenWidth * 3
    //         ],
    //         [
    //             data[1].backgroundColor,
    //             data[1].backgroundColor,
    //             data[0].backgroundColor,
    //             data[0].backgroundColor,
    //             data[2].backgroundColor,
    //             data[2].backgroundColor,
    //             data[0].backgroundColor,
    //             data[3].backgroundColor,
    //             data[3].backgroundColor,
    //             data[2].backgroundColor,
    //         ]
    //     )

    //     return {
    //         backgroundColor
    //     }
    // })

    const animatedBackgroundColor = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            Math.abs(x.value),
            [
                0,
                screenWidth / 2,
                screenWidth / 2,
                screenWidth - 10,
                screenWidth,
                (screenWidth * 3) / 2 - 0.0001,
                (screenWidth * 3) / 2,
                screenWidth * 2 - 10,
                screenWidth * 2,
                screenWidth * 3
            ],
            [
                data[1].backgroundColor,
                data[1].backgroundColor,
                data[0].backgroundColor,
                data[0].backgroundColor,
                data[2].backgroundColor,
                data[2].backgroundColor,
                data[0].backgroundColor,
                data[3].backgroundColor,
                data[3].backgroundColor,
                data[2].backgroundColor,
            ]
        )

        return {
            backgroundColor
        }
    })

    const animatedTransformCircle = useAnimatedStyle(() => {
        const rotateY
            = interpolate(
                Math.abs(x.value % screenWidth),
                [0, screenWidth],
                [0, -180],
                Extrapolation.CLAMP
            )
        const scale
            = interpolate(
                Math.abs(x.value % screenWidth),
                [0, screenWidth / 2, screenWidth],
                [1, 10, 1],
                Extrapolation.CLAMP
            )


        return {
            transform: [
                { perspective: Platform.OS === 'ios' ? 400 : 500 },
                { rotateY: `${rotateY}deg` },
                { scale }
            ]
        }
    })

    return (
        <Animated.View
            style={[
                styles.circle,
                animatedTransformCircle,
                animatedBackgroundColor
            ]}
        />
    )
}

export default Circle

const styles = StyleSheet.create({
    circle: {

        position: 'absolute',
        width: RADIUS,
        height: RADIUS,
        bottom: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RADIUS,
        backgroundColor: 'red'
    }
})