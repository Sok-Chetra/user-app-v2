import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import {
    StyleSheet,
    View,
    useWindowDimensions,
    FlatListProps
} from 'react-native'
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView
} from 'react-native-gesture-handler';
import Animated, {
    AnimatedScrollViewProps,
    runOnJS,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated'
import BackDrop from './BackDrop';

interface BottomSheetProps extends FlatListProps<any> {
    snapTo: string;
    backgroundColor: string;
    backDropColor: string;
    isModalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BottomSheetMethods {
    expand: () => void;
    close: () => void
}

const BottomSheetFlatList = forwardRef<BottomSheetMethods, BottomSheetProps>(({
    snapTo,
    backgroundColor,
    backDropColor,
    renderItem,
    data,
    isModalVisible,
    setModalVisible,
    ListHeaderComponent,
    ...rest
}: BottomSheetProps, ref) => {
    const [enableScroll, setEnableScroll] = useState<boolean>(true)
    const { height: SCREEN_HEIGHT } = useWindowDimensions();
    const closeHeight = SCREEN_HEIGHT;
    const percentage = parseFloat(snapTo.replace('%', '')) / 100;
    const openHeight = SCREEN_HEIGHT - SCREEN_HEIGHT * percentage;
    const topAnimation = useSharedValue(closeHeight)
    const context = useSharedValue(0)
    const scrollBegin = useSharedValue(0)
    const scrollY = useSharedValue(0)

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
            if (topAnimation.value > openHeight / 2) {
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

    const onScroll = useAnimatedScrollHandler({
        onBeginDrag: event => {
            scrollBegin.value = event.contentOffset.y
        },
        onScroll: event => {
            scrollY.value = event.contentOffset.y
        }
    })

    const panScroll = Gesture.Pan()
        .onBegin(() => {
            context.value = topAnimation.value
        })
        .onUpdate((event) => {
            if (event.translationY < 0) {
                runOnJS(setEnableScroll)(true);
                topAnimation.value = withSpring(openHeight, {
                    damping: 100,
                    stiffness: 400
                })
            } else if (event.translationY > 0 && scrollY.value === 0) {
                runOnJS(setEnableScroll)(false);
                topAnimation.value = withSpring(event.translationY + context.value, {
                    damping: 100,
                    stiffness: 400
                })
            }

        })
        .onEnd(() => {
            runOnJS(setEnableScroll)(true);

            if (topAnimation.value > openHeight / 1) {

                topAnimation.value = withSpring(closeHeight, {
                    damping: 100,
                    stiffness: 400
                }, (isFinished) => {
                    if (isFinished) {
                        runOnJS(setModalVisible)(false); // Ensure React state update
                    }
                })
            } else {
                topAnimation.value = withSpring(openHeight, {
                    damping: 100,
                    stiffness: 400
                })
            }
        })

    const scrollViewGesture = Gesture.Native();

    return (
        <>
            {isModalVisible &&
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
                                {
                                    backgroundColor: backgroundColor
                                }
                            ]}
                        >
                            <View
                                style={[styles.lineContainer]}
                            >
                                <View style={[styles.line]} />
                            </View>
                            <GestureDetector gesture={Gesture.Simultaneous(panScroll, scrollViewGesture)}>
                                <Animated.FlatList
                                    data={data}
                                    renderItem={renderItem}
                                    bounces={false}
                                    scrollEventThrottle={16}
                                    onScroll={onScroll}
                                    ListHeaderComponent={ListHeaderComponent}
                                    scrollEnabled={enableScroll}
                                    {...rest as Animated.FlatList<any>}
                                />
                            </GestureDetector>
                        </Animated.View>
                    </GestureDetector>

                </>
            }
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

export default BottomSheetFlatList