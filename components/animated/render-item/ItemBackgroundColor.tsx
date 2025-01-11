import { Dimensions, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { OnBoardPage } from '@/libs/types/onboard-page/types';
import Animated, { interpolateColor, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    data: OnBoardPage[];
    screenWidth: number;
    x: SharedValue<number>;
}
const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const ItemBackgroundColor = ({
    data,
    screenWidth,
    x,
}: Props) => {
    const { width } = useWindowDimensions()
    const animatedBackgroundColor = useAnimatedStyle(() => {
        const ranges = data.map((_, index) => index * screenWidth - 0.0001);
        const colors = data.map(item => item.backgroundColor);

        const backgroundColor = interpolateColor(
            Math.abs(x.value),
            // [bgItem1, bgItem2, bgItem3, bgItem4]
            ranges, // Dynamic ranges
            colors  // Dynamic colors
        )

        return {
            backgroundColor
        }
    })

    return (
        <Animated.View
            style={[
                styles.bg,
                animatedBackgroundColor
            ]}
        />
    )
}

export default ItemBackgroundColor

const styles = StyleSheet.create({
    bg: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -9999999,
    }
})