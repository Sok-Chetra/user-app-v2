import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { OnBoardPage } from '@/libs/types/onboard-page/types'
import LottieView from 'lottie-react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    item: OnBoardPage;
    index: number;
    x: SharedValue<number>;
}

const RenderItem = ({
    item,
    index,
    x
}: Props) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions()

    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            Math.abs(x.value),
            [
                (index - 1) * SCREEN_WIDTH,
                (index) * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH,
            ],
            [0.5, 1, 0.5],
            'clamp'
        )

        const translateY = interpolate(
            Math.abs(x.value),
            [
                (index - 1) * SCREEN_WIDTH,
                (index) * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH,
            ],
            [100, 0, 100],
            'clamp'
        )

        return {
            transform: [
                { scale },
                { translateY }
            ]
        }
    })

    return (
        <Animated.View
            style={[
                styles.itemContainer,
                animatedStyle,
            ]}
        >
            <View
                style={[
                    styles.animationContainer,
                    {
                        width: 200,
                        height: 200,
                        backgroundColor: item.lottieBackgroundColor

                    }
                ]}
            >
                <LottieView
                    key={item.id}
                    source={item.lottieImage}
                    style={[
                        styles.animation,
                    ]}
                    autoPlay
                    loop
                    renderMode='HARDWARE'
                />
            </View>
            <Text
                style={[
                    styles.itemText,
                    {
                        color: item.textColor
                    }
                ]}
            >
                {item.title}
            </Text>
            <Text
                style={[
                    styles.itemDesc,
                    {
                        color: item.descColor
                    }
                ]}
            >
                {item.desc}
            </Text>
        </Animated.View>
    )
}

export default RenderItem

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 150,
    },
    itemText: {
        textAlign: 'center',
        fontSize: 44,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10,
        marginHorizontal: 20
    },
    itemDesc: {
        textAlign: 'center',
        marginHorizontal: 20
    },
    animationContainer: {
        borderRadius: 40,
        overflow: 'hidden'
    },
    animation: {
        height: '100%',
        width: '100%'
    }
})