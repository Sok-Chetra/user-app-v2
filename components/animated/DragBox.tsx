import React from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';

const SIZE = 50; // Draggable box size
const OFFSETX = 10;
const OFFSETY = 50

interface DragViewProps {
    boxHeight?: number;
    boxWidth?: number;
}

export default function DragBox({
    boxHeight = 200,
    boxWidth = 200
}: DragViewProps) {
    const offsetX = useSharedValue<number>(0);
    const offsetY = useSharedValue<number>(0);

    const pan = Gesture.Pan()
        .onChange((event) => {
            offsetX.value += event.changeX;
            offsetY.value += event.changeY;
        })
        .onEnd(() => {
            // Clamp X within container boundaries with OFFSET
            if (offsetX.value < -(boxWidth / 2) + SIZE / 2 + OFFSETX) {
                offsetX.value = withSpring(-(boxWidth / 2) + SIZE / 2 + OFFSETX);
            } else if (offsetX.value > boxWidth / 2 - SIZE / 2 - OFFSETX) {
                offsetX.value = withSpring(boxWidth / 2 - SIZE / 2 - OFFSETX);
            }

            // Clamp Y within container boundaries with OFFSET
            if (offsetY.value < -(boxHeight / 2) + SIZE / 2 + OFFSETY) {
                offsetY.value = withSpring(-(boxHeight / 2) + SIZE / 2 + OFFSETY);
            } else if (offsetY.value > boxHeight / 2 - SIZE / 2 - OFFSETY) {
                offsetY.value = withSpring(boxHeight / 2 - SIZE / 2 - OFFSETY);
            }
        });

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: offsetX.value },
            { translateY: offsetY.value },
        ],
    }));

    return (
        <GestureHandlerRootView style={styles.container}>
            <View
                style={{
                    backgroundColor: 'gray',
                    height: boxHeight,
                    width: boxWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <GestureDetector gesture={pan}>
                    <Animated.View style={[styles.box, animatedStyles]} />
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    box: {
        height: SIZE,
        width: SIZE,
        backgroundColor: '#b58df1',
        borderRadius: 20,
    },
});
