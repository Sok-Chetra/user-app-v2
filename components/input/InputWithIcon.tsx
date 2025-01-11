import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

type Props = {
    icon?: () => React.ReactElement | undefined;
    error?: () => React.ReactElement | undefined;
    style?: ViewStyle;
    inputProps: TextInputProps;
}

const InputWithIcon = ({
    icon,
    error,
    style,
    inputProps
}: Props) => {
    return (
        <View style={{ gap: 5 }}>

            <View
                style={[styles.inputContainer, style]}
            >
                {icon && icon()}
                <TextInput
                    placeholder='Enter Email'
                    {...inputProps}
                    style={[
                        styles.input,
                        inputProps.style,
                        {
                            paddingLeft: icon && icon() !== undefined ? 5 : 15,
                        }
                    ]}
                    placeholderTextColor={'#a3a3a3'}
                />

            </View>
            {error && error()}
        </View>
    )
}

export default InputWithIcon

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: 'white',
        height: 45,
        borderRadius: 99999999,
        overflow: 'hidden'
    },
    input: {
        paddingRight: 15,
        flex: 1,
        minWidth: 200
    }
})