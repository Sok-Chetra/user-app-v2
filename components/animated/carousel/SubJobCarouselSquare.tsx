import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import Icon from '@/components/ui/icon'
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate } from 'react-native-reanimated';


type Props = {
    data: any
};

const SubJobCarouselSquare = ({ data }: Props) => {
    const [newData] = useState([{ key: 'space-left' }, ...data.services, { key: 'space-right' }]);

    const { width: SCREEN_WIDTH } = useWindowDimensions()
    const x = useSharedValue(0)

    const SIZE = SCREEN_WIDTH * 0.7
    const SPACER = (SCREEN_WIDTH - SIZE) / 2

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        }
    })

    return (
        <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={16}
            snapToInterval={SIZE}
            decelerationRate={'fast'}
            onScroll={onScroll}
        >
            {newData.map((service: any, index: number) => {
                const style = useAnimatedStyle(() => {
                    const scale = interpolate(
                        x.value,
                        [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                        [0.8, 1, 0.8]
                    )

                    return {
                        transform: [{ scale: scale }]
                    }
                })

                if (!service.icon) {
                    return <View style={{ width: SPACER }} key={index} />
                }
                return (
                    <View key={service.id} style={{ width: SIZE }}>
                        <Animated.View style={[styles.iconContainer, style]}>
                            <Icon
                                name={service.icon}
                                size={100}
                            />
                        </Animated.View>
                    </View>
                )
            })}
        </Animated.ScrollView>
    )
}

export default SubJobCarouselSquare

const styles = StyleSheet.create({
    iconContainer: {
        borderRadius: 34,
        overflow: 'hidden',
        backgroundColor: 'gray',
        height: 250
    }
})