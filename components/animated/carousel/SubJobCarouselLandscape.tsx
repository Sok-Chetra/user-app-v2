import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import Icon from '@/components/ui/icon'
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate } from 'react-native-reanimated';
import { router } from 'expo-router';
import { useServiceStore } from '@/providers/project/ServiceProvider';


type Props = {
    data: any
};

const generateDarkColors = (length: number): string[] => {
    // Generate colors with fixed saturation and lightness for white text compatibility
    const colors = [];
    for (let i = 0; i < length; i++) {
        const hue = (360 / length) * i; // Evenly spaced hues
        colors.push(`hsl(${hue}, 70%, 40%)`); // Darker colors with 40% lightness
    }
    return colors;
};

const SubJobCarouselLandscape = ({ data }: Props) => {
    const [newData] = useState([{ key: 'space-left' }, ...data.services, { key: 'space-right' }]);
    const colors = useMemo(() => generateDarkColors(data.services.length), [data.services]);
    const { width: SCREEN_WIDTH } = useWindowDimensions()
    const x = useSharedValue(0)

    const { selected_service, setSelectedService } = useServiceStore(state => state)

    const SIZE = SCREEN_WIDTH * 0.8
    const SPACER = (SCREEN_WIDTH - SIZE) / 2

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        }
    })


    const handleSelectCard = (service_code: string) => {
        router.push('/(app)/(main)/(screens)/projects/single-job/questionnaire');
        setSelectedService({
            sub_service_code: service_code,

        });
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 2, justifyContent: 'center', paddingHorizontal: 30, gap: 10 }}>
                <Text style={[styles.title]}>
                    Jobs
                </Text>
                <Text style={{ textAlign: 'center', color: 'gray' }}>
                    "A list of Jobs. Tap a sub-job to proceed to the questionnaire page!"
                </Text>
            </View>

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
                            [0.88, 1, 0.88]
                        )

                        return {
                            transform: [{ scale: scale }]
                        }
                    })

                    if (!service.icon) {
                        return <View style={{ width: SPACER }} key={index} />
                    }
                    const bgColor = colors[index - 1] || '#FA7070';

                    return (
                        <View key={service.id} style={{ width: SIZE }}>

                            <Pressable onPress={() => handleSelectCard(service.code)}>
                                <Animated.View style={[styles.iconContainer, style, { backgroundColor: bgColor }]}>
                                    <Icon
                                        name={service.icon}
                                        size={100}
                                        color={'#FEFDED'}
                                    />
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#FEFDED' }} >{service.name_en}</Text>
                                </Animated.View>
                            </Pressable>
                        </View>
                    )
                })}
            </Animated.ScrollView>
        </View>
    )
}

export default SubJobCarouselLandscape

const styles = StyleSheet.create({
    iconContainer: {
        borderRadius: 34,
        overflow: 'hidden',
        // backgroundColor: '#1E3E62',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: undefined,
        width: '100%',
        aspectRatio: 16 / 11,
        gap: 10
    },
    title: {
        color: '#0B192C',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold'
    }
})