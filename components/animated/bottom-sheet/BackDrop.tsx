import React from 'react'
import {
    Text,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'
import Animated, {
    interpolate,
    SharedValue,
    useAnimatedStyle
} from 'react-native-reanimated'

type BackDropProps = {
    backDropColor: string;
    topAnimation: SharedValue<number>;
    openHeight: number;
    closeHeight: number;
    close: () => void;
}

const BackDrop: React.FC<BackDropProps> = ({
    backDropColor,
    close,
    closeHeight,
    openHeight,
    topAnimation
}) => {

    const backDropAnimation = useAnimatedStyle(() => {
        const opacity = interpolate(
            topAnimation.value,
            [closeHeight, openHeight],
            [0, 0.5],
            'clamp'
        )

        const display = opacity === 0 ? 'none' : 'flex'

        return {
            opacity,
            display
        }
    })

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                close();
            }}
        >
            <Animated.View
                style={[
                    styles.container,
                    backDropAnimation,
                    {
                        backgroundColor: backDropColor
                    }
                ]}
            />
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
        display: 'none'
    }
})

export default BackDrop