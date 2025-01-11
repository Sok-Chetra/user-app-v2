import BottomSheet, { BottomSheetMethods } from "@/components/animated/bottom-sheet/BottomSheet";
import DarkMode from "@/components/animated/switch/theme/DarkMode";
import ModeIcon from "@/components/animated/switch/theme/ModeIcon";
import ModeSwitcher from "@/components/animated/switch/theme/ModeSwitcher";
import PickTakePhoto from "@/components/camera/PickTakePhoto";
import ButtonNext from "@/components/animated/render-item/ButtonNext";
import Circle from "@/components/animated/render-item/Circle";
import ItemBackgroundColor from "@/components/animated/render-item/ItemBackgroundColor";
import { useColorScheme } from '@/hooks/useColorScheme';
import { onboardPages } from "@/libs/init-datas/onboard-page";
import { useSession } from "@/providers/auth/AuthContextProvider";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { router, usePathname } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Platform, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { clamp, interpolateColor, runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RenderItem from "@/components/animated/render-item/RenderItem";

export default function Home() {
    const { width: SCREEN_WIDTH } = useWindowDimensions()
    const [currentIndex, setCurrentIndex] = useState(0)

    const x = useSharedValue(0);
    const context = useSharedValue(0);

    const translateXStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: x.value
            }]
        }
    })

    const animatedBackgroundColor = useAnimatedStyle(() => {
        const ranges = onboardPages.map((_, index) => index * SCREEN_WIDTH);
        const colors = onboardPages.map(item => item.backgroundColor);

        const backgroundColor = interpolateColor(
            Math.abs(x.value),
            ranges,
            colors
        )

        return {
            backgroundColor
        }
    })

    useAnimatedReaction(() => {
        return Math.floor(Math.abs(x.value / SCREEN_WIDTH))
    }, (currentValue, previousValue) => {
        if (currentValue !== previousValue) {
            runOnJS(setCurrentIndex)(currentValue)
        }
    })

    const panGesture = Gesture
        .Pan()
        .onBegin(() => {
            context.value = Math.abs(x.value);
        })
        .onUpdate((e) => {
            const clampValue = clamp(
                context.value - e.translationX,
                0,
                3 * SCREEN_WIDTH
            );
            x.value = -clampValue;
        })
        .onEnd((e) => {
            const isSwipeLeft = e.translationX < 0;
            const isSwipeRight = e.translationX > 0;
            const isBeyondLeftLimit = context.value < 3 * SCREEN_WIDTH && currentIndex <= 2;
            const isBeyondRightLimit = context.value > 0;

            let targetIndex = currentIndex; // Default to current index

            if (isSwipeLeft && isBeyondLeftLimit) {
                if (e.translationX < -SCREEN_WIDTH / 3 || e.velocityX < -500) {
                    targetIndex = currentIndex + 1;
                }
            } else if (isSwipeRight && isBeyondRightLimit) {
                if (e.translationX > SCREEN_WIDTH / 3 || e.velocityX > 500) {
                    targetIndex = currentIndex - 1;
                }
            }

            // Ensure targetIndex stays within valid bounds
            targetIndex = Math.max(0, Math.min(targetIndex, onboardPages.length - 1));

            // Calculate dynamic animation duration for smoother feel
            const distance = Math.abs(targetIndex - currentIndex) * SCREEN_WIDTH;
            const duration = Math.min(1000, Math.max(500, (distance / SCREEN_WIDTH) * 300)); // Between 200ms and 500ms

            // Smoothly scroll to the calculated target index
            x.value = withTiming(-SCREEN_WIDTH * targetIndex, { duration });
        });


    return (
        <GestureHandlerRootView
            style={{
                flex: 1,
            }}
        >
            <Animated.View
                style={[
                    styles.container,
                    animatedBackgroundColor
                ]}
            >
                <Circle
                    data={onboardPages}
                    screenWidth={SCREEN_WIDTH}
                    x={x}
                />
                <GestureDetector gesture={panGesture}>
                    <Animated.View
                        style={[
                            styles.listContainer,
                            translateXStyle,
                            {
                                width: SCREEN_WIDTH * onboardPages.length,
                                transform: [{
                                    translateX: -0 * SCREEN_WIDTH
                                }]
                            }
                        ]}
                    >
                        {onboardPages.map((page, index) => (
                            <RenderItem
                                key={page.id}
                                item={page}
                                index={index}
                                x={x}
                            />
                        ))}
                    </Animated.View>
                </GestureDetector>
            </Animated.View>
            <ButtonNext
                data={onboardPages}
                dataLength={onboardPages.length}
                screenWidth={SCREEN_WIDTH}
                x={x}
                currentIndex={currentIndex}
            />
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        zIndex: 1
    }
})