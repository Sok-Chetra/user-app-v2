import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

type Props = {
    theme: string | null | undefined;
    onPress: () => void
}

const DarkMode = ({
    theme,
    onPress
}: Props) => {
    const bottomSheetBackgroundColorAnimation = useAnimatedStyle(() => {
        return {
            backgroundColor: theme === 'dark' ? withTiming('#03346E') : withTiming('lightgray')
        }
    })

    const textColorAnimation = useAnimatedStyle(() => {
        return {
            color: theme === 'dark' ? withTiming('white') : withTiming('black')
        }
    })

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <Animated.View
                style={[
                    styles.container,
                    bottomSheetBackgroundColorAnimation
                ]}
            >
                <Animated.Text
                    style={[
                        textColorAnimation
                    ]}
                >
                    Theme
                </Animated.Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default DarkMode;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'lightgray'
    }
})