import React, { useState, useCallback, useEffect } from 'react';
import {
    TextInput,
    TextInputProps,
    View,
    StyleSheet,
    ViewStyle,
    Platform,
    Text
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';

type Props = {
    label: string;
    error?: () => React.ReactElement | undefined;
    style?: ViewStyle;
    inputProps?: TextInputProps;
};

const InputFloatLabel = ({ label, error, style, inputProps }: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [labelWidth, setLabelWidth] = useState(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const backgroundOpacity = useSharedValue(0);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
        translateY.value = withTiming(-27, {
            duration: 200,
            easing: Easing.out(Easing.ease),
        });
        scale.value = withTiming(0.85, {
            duration: 200,
            easing: Easing.out(Easing.ease),
        });
        backgroundOpacity.value = withTiming(1, {
            duration: 200,
            easing: Easing.out(Easing.ease),
        });
    }, [translateY, scale, backgroundOpacity]);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
        if (!inputProps?.value) {
            translateY.value = withTiming(0, {
                duration: 200,
                easing: Easing.out(Easing.ease),
            });
            scale.value = withTiming(1, {
                duration: 200,
                easing: Easing.out(Easing.ease),
            });
            backgroundOpacity.value = withTiming(0, {
                duration: 200,
                easing: Easing.out(Easing.ease),
            });
        }
    }, [translateY, scale, backgroundOpacity, inputProps?.value]);

    const animatedLabelStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    const animatedBackgroundStyle = useAnimatedStyle(() => ({
        backgroundColor: 'white',
        opacity: backgroundOpacity.value,
        borderRadius: 9999,
    }));

    useEffect(() => {
        if (!isFocused) {
            handleFocus();
            handleBlur();
            // alert('df')
        }

    }, [isFocused, inputProps?.value])

    return (
        <View style={[styles.container]}>
            <View style={[styles.inputWrapper, style]}>
                <Animated.Text
                    style={[
                        styles.label,
                        animatedLabelStyle,
                        animatedBackgroundStyle,
                        {
                            backgroundColor: isFocused || inputProps?.value ? 'white' : undefined,
                            width: labelWidth + 1,
                            zIndex: 0,
                        },
                    ]}
                />
                <Animated.Text
                    style={[
                        styles.label,
                        animatedLabelStyle,
                        {
                            color: isFocused || inputProps?.value ? '#4b5563' : '#a3a3a3',
                        },
                    ]}
                    onLayout={(event) => {
                        const { width } = event.nativeEvent.layout; // Get the width of the label
                        setLabelWidth(width); // Update the labelWidth statefdsafsf
                    }}
                >
                    {label}
                </Animated.Text>
                {/* <Text style={{ position: 'absolute', top: 0 }}>
                    {label}
                </Text> */}
                <TextInput
                    {...inputProps}
                    style={[styles.input, inputProps?.style]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholderTextColor="#a3a3a3"
                />
            </View>
            {error && error()}
        </View>
    );
};

export default InputFloatLabel;

const styles = StyleSheet.create({
    container: {

    },
    inputWrapper: {
        position: 'relative',
        borderWidth: 1,
        // borderColor: '#d4d4d8',
        height: 50,
        justifyContent: 'center',

    },
    label: {
        position: 'absolute',
        left: 10,
        zIndex: 0,
        borderRadius: 999999,
        paddingHorizontal: 2,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    },
});
