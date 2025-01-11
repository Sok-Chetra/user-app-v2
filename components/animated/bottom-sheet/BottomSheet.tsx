import React, {
    forwardRef,
    useCallback,
    useImperativeHandle
} from 'react'
import {
    StyleSheet,
    View,
    useWindowDimensions
} from 'react-native'
import {
    Gesture,
    GestureDetector
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated'
import BackDrop from './BackDrop';

type BottomSheetProps = {
    snapTo: string;
    backgroundColor: string;
    backDropColor: string;
    theme?: string | null | undefined;
    children: React.ReactNode
}

export interface BottomSheetMethods {
    expand: () => void;
    close: () => void
}

const BottomSheet = forwardRef<BottomSheetMethods, BottomSheetProps>(({
    snapTo,
    backgroundColor,
    backDropColor,
    theme,
    children
}: BottomSheetProps, ref) => {
    const { height: SCREEN_HEIGHT } = useWindowDimensions()
    const closeHeight = SCREEN_HEIGHT;
    const percentage = parseFloat(snapTo.replace('%', '')) / 100;
    const openHeight = SCREEN_HEIGHT - SCREEN_HEIGHT * percentage;
    const topAnimation = useSharedValue(closeHeight)
    const context = useSharedValue(0)

    const expand = useCallback(() => {
        'worklet';
        topAnimation.value = withTiming(openHeight);
    }, [openHeight, topAnimation])

    const close = useCallback(() => {
        'worklet';
        topAnimation.value = withTiming(closeHeight);
    }, [openHeight, topAnimation])

    useImperativeHandle(
        ref,
        () => ({
            expand,
            close,
        }),
        [expand, close]
    )

    const animationStyle = useAnimatedStyle(() => {
        const top = topAnimation.value;

        return {
            top
        }
    })

    const bottomSheetBackgroundColorAnimation = useAnimatedStyle(() => {
        return {
            backgroundColor: theme === 'dark' ? withTiming('#03346E') : withTiming('white')
        }
    })

    const lineColorAnimation = useAnimatedStyle(() => {
        return {
            backgroundColor: theme === 'dark' ? withTiming('white') : withTiming('black')
        }
    })

    const pan = Gesture.Pan()
        .onBegin(() => {
            context.value = topAnimation.value
        })
        .onUpdate((event) => {
            if (event.translationY < 0) {
                topAnimation.value = withSpring(openHeight, {
                    damping: 100,
                    stiffness: 400
                })
            } else {
                topAnimation.value = withSpring(event.translationY + context.value, {
                    damping: 100,
                    stiffness: 400
                })
            }

        })
        .onEnd(() => {
            if (topAnimation.value > openHeight / 10) {
                topAnimation.value = withSpring(closeHeight, {
                    damping: 100,
                    stiffness: 400
                })
            } else {
                topAnimation.value = withSpring(openHeight, {
                    damping: 100,
                    stiffness: 400
                })
            }
        })

    return (
        <>
            <BackDrop
                close={close}
                closeHeight={closeHeight}
                openHeight={openHeight}
                topAnimation={topAnimation}
                backDropColor={backDropColor}
            />
            <GestureDetector gesture={pan}>
                <Animated.View
                    style={[
                        styles.container,
                        animationStyle,
                        bottomSheetBackgroundColorAnimation,
                        {
                            backgroundColor: backgroundColor
                        }
                    ]}
                >
                    <View
                        style={[styles.lineContainer]}
                    >
                        <Animated.View style={[styles.line, lineColorAnimation]} />
                    </View>
                    {children}
                </Animated.View>
            </GestureDetector>
        </>
    )
})

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'lightgray',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    lineContainer: {
        alignItems: 'center',
        marginVertical: 10
    },
    line: {
        width: 50,
        height: 4,
        backgroundColor: 'black',
        borderRadius: 20
    }
})

export default BottomSheet