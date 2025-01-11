import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Canvas, Circle, Group, LinearGradient, Mask, rotate } from '@shopify/react-native-skia'
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = {
    theme: string | null | undefined;
}
const RADIUS = 70;

const ModeIcon = ({
    theme
}: Props) => {
    const gradientColor1 = useSharedValue('#ff4467')
    const gradientColor2 = useSharedValue('#ff8e0b')
    const cy = useSharedValue(0)
    const mask = useSharedValue(0)

    const colors = useDerivedValue(() => {
        return [
            gradientColor1.value, gradientColor2.value
        ]
    })

    useEffect(() => {
        if (theme === 'light') {
            cy.value = withTiming(0)
            mask.value = withTiming(0)
            gradientColor1.value = withTiming('#ff4467')
            gradientColor2.value = withTiming('#ff8e0b')
        } else {
            cy.value = withTiming(RADIUS / 2, { duration: 600 })
            mask.value = withTiming(RADIUS, { duration: 600 })
            gradientColor1.value = withTiming('#8371ff')
            gradientColor2.value = withTiming('#86bfff')
            // alert('dark')
        }
        // alert(theme)
    }, [theme])

    return (
        <Canvas
            style={[styles.container]}
        >
            <Mask
                mode='luminance'
                mask={
                    <Group>
                        <Circle
                            cx={RADIUS}
                            cy={RADIUS}
                            r={RADIUS}
                            color={'white'}
                        />
                        <Circle
                            cx={RADIUS}
                            cy={cy}
                            r={mask}
                            color={'black'}
                        />
                    </Group>
                }

            >
                <Circle cx={RADIUS} cy={RADIUS} r={RADIUS} />
                <LinearGradient
                    colors={colors}
                    transform={[{
                        rotate: -90
                    }]}
                    origin={{
                        x: RADIUS,
                        y: RADIUS
                    }}
                    start={{
                        x: 0,
                        y: 0
                    }}
                    end={{
                        x: RADIUS * 2,
                        y: RADIUS * 2
                    }}
                />
            </Mask>
        </Canvas>
    )
}

export default ModeIcon

const styles = StyleSheet.create({
    container: {
        width: RADIUS * 2,
        height: RADIUS * 2,
        transform: [{
            rotate: '45deg'
        }]
    }
})