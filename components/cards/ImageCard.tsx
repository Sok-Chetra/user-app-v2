import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    interpolate,
    runOnJS,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { Image, useWindowDimensions } from 'react-native';
import { Post } from '@/app/(main)/(tabs)';

type Props = {
    item: any;
    index: number;
    dataLength: number;
    maxVisible: number;
    currentIndex: number;
    animatedValue: SharedValue<number>;
    setNewData: React.Dispatch<React.SetStateAction<any[]>>;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    newData: any[]
};

const ImageCard = ({
    item,
    index,
    dataLength,
    maxVisible,
    currentIndex,
    animatedValue,
    newData,
    setNewData,
    setCurrentIndex,
}: Props) => {
    const { width } = useWindowDimensions();
    const translateX = useSharedValue(0);
    const direction = useSharedValue(0);

    const pan = Gesture.Pan()
        .onUpdate((e) => {
            const isSwipeRight = e.translationX > 0;
            direction.value = isSwipeRight ? 1 : -1;

            if (currentIndex === index) {
                translateX.value = e.translationX;
                animatedValue.value = interpolate(
                    Math.abs(e.translationX),
                    [0, width],
                    [index, index + 1]
                );
            }
        })
        .onEnd((e) => {
            if (currentIndex === index) {
                if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
                    translateX.value = withTiming(
                        width * direction.value * 2,
                        {},
                        () => {
                            if (currentIndex < dataLength - 1) {
                                runOnJS(setCurrentIndex)(currentIndex + 1);
                                runOnJS(setNewData)([...newData, newData[currentIndex]])
                            }
                        }
                    );
                    animatedValue.value = withTiming(currentIndex + 1)
                } else {
                    translateX.value = withTiming(0, { duration: 500 });
                    animatedValue.value = withTiming(currentIndex)
                }
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        const currentItem = index === currentIndex;

        const rotateZ = interpolate(
            Math.abs(translateX.value),
            [0, width],
            [0, 20]
        );

        const translateY = interpolate(
            animatedValue.value,
            [index - 1, index],
            [-35, 0]
        );

        const scale = interpolate(
            animatedValue.value,
            [index - 1, index],
            [0.9, 1]
        );

        const opacity = interpolate(
            animatedValue.value + maxVisible,
            [index, index + 1],
            [0, 1]
        );

        return {
            opacity: index < maxVisible + currentIndex ? 1 : opacity,
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    scale: currentItem ? 1 : scale,
                },
                {
                    translateY: currentItem ? 0 : translateY,
                },
                {
                    rotateZ: currentItem ? `${direction.value * rotateZ}deg` : '0deg',
                },
            ],
        };
    });

    return (
        <GestureDetector gesture={pan}>
            <Animated.View
                style={[
                    animatedStyle,
                    {
                        position: 'absolute',
                        bottom: 0,
                        zIndex: dataLength - index,
                        width: width,
                        height: 250,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        overflow: 'hidden',
                    },
                ]}
            >
                <Image
                    source={item}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                />
            </Animated.View>
        </GestureDetector>
    );
};

export default ImageCard;
