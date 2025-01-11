import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import DarkMode from './DarkMode'
import BottomSheet, { BottomSheetMethods } from '../../bottom-sheet/BottomSheet'
import ModeIcon from './ModeIcon'
import ModeSwitcher from './ModeSwitcher'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColorScheme } from '@/hooks/useColorScheme'

type Props = {}

const HowToApply = (props: Props) => {
    const colorScheme = useColorScheme()
    const [themeSwitch, setThemeSwitch] = useState<"system" | "light" | "dark">('system')
    const [theme, setTheme] = useState<string | null | undefined>(colorScheme);
    const { top } = useSafeAreaInsets()

    const modeBottomSheetRef = useRef<BottomSheetMethods>(null)

    const openModeBottomSheet = useCallback(() => {
        modeBottomSheetRef.current?.expand()
    }, [])

    const backgroundColorAnimation = useAnimatedStyle(() => {
        return {
            backgroundColor: theme === 'dark' ? withTiming('#021526') : withTiming('white')
        }
    })

    const textColorAnimation = useAnimatedStyle(() => {
        return {
            color: theme === 'dark' ? withTiming('white') : withTiming('black')
        }
    })

    useEffect(() => {
        if (themeSwitch === 'system') {
            setTheme(colorScheme)
        }
        // alert(colorScheme)
    }, [themeSwitch, colorScheme])

    return (
        <GestureHandlerRootView
            style={{ flex: 1 }}
        >
            <Animated.View
                style={[
                    backgroundColorAnimation,
                    {
                        flex: 1,
                        paddingTop: top,
                        backgroundColor: 'white'
                    }
                ]}
            >
                <DarkMode
                    theme={theme}
                    onPress={openModeBottomSheet}
                />

                <BottomSheet
                    ref={modeBottomSheetRef}
                    backDropColor="black"
                    backgroundColor="white"
                    snapTo="50%"
                    theme={theme}
                >
                    <View
                        style={{
                            paddingVertical: 30
                        }}
                    >

                        <View
                            style={{
                                alignItems: 'center'
                            }}
                        >
                            <ModeIcon
                                theme={theme}
                            />
                        </View>

                        <Animated.Text
                            style={[
                                textColorAnimation,
                                {
                                    textAlign: 'center',
                                    fontSize: 25,
                                    fontWeight: 500
                                }
                            ]}
                        >
                            Choose a mode
                        </Animated.Text>
                        <Animated.Text
                            style={[
                                textColorAnimation,
                                {
                                    textAlign: 'center',
                                    paddingTop: 20
                                }
                            ]}
                        >
                            Customize your interface.
                        </Animated.Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center'
                        }}
                    >
                        <ModeSwitcher
                            themeSwitch={themeSwitch}
                            theme={theme}
                            setThemeSwitch={setThemeSwitch}
                            setTheme={setTheme}
                        />
                    </View>
                </BottomSheet>
            </Animated.View>
        </GestureHandlerRootView>
    )
}

export default HowToApply

const styles = StyleSheet.create({})