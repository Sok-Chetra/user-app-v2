import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import Icon from '../ui/icon';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { rotateZ } from '@shopify/react-native-skia';
import { router } from 'expo-router';
import { useServiceStore } from '@/providers/project/ServiceProvider';
import { useAddressStore } from '@/providers/project/AddressProvider';

type Props = {
    item: any;
    index: number;
    width: number;
    height: number;
    marginHorizontal: number;
    x: SharedValue<number>;
    fullWidth: number;
}

const generateColorFromHash = (seed: string) => {
    const hash = seed.split('').reduce((acc, char) => {
        return (acc * 31 + char.charCodeAt(0)) % 0xFFFFFF;
    }, 0);
    return `#${hash.toString(16).padStart(6, '0')}`;
};

// Function to calculate brightness for accessibility
const getBrightness = (hexColor: string) => {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
};

const CategoryCard = ({
    item,
    index,
    width,
    height,
    marginHorizontal,
    x,
    fullWidth
}: Props) => {
    const { _hasHydrated, setSelectedService, clearUserAnswers } = useServiceStore(state => state)
    const { setSelectedFromAddrBook } = useAddressStore(state => state)
    const animatedStyle = useAnimatedStyle(() => {
        const rotateZ = interpolate(
            x.value,
            [(index - 1) * fullWidth, index * fullWidth, (index + 1) * fullWidth],
            [20, 0, -20],
            'clamp'
        )

        const translateY = interpolate(
            x.value,
            [(index - 1) * fullWidth, index * fullWidth, (index + 1) * fullWidth],
            [60, 0, 60],
            'clamp'
        )

        return {
            transform: [{ rotateZ: `${rotateZ}deg` }, { translateY: translateY }]
        }
    })

    const colors = useMemo(() => {
        return generateColorFromHash(item.id);
    }, [item]);

    const bgColor = useMemo(() => generateColorFromHash(item.id), [item]);
    const textColor = useMemo(() => (getBrightness(bgColor) > 128 ? '#000000' : '#FFFFFF'), [bgColor]);

    const handleSelectCard = (isParent: boolean, service_code: string, cate_id: string) => {
        setSelectedService({
            service_code: service_code,
            is_parent: isParent,
            category_id: cate_id
        });

        if (isParent) {
            router.push(`/(app)/(main)/(screens)/projects/single-job/${service_code}`);
        } else {
            router.push(`/(app)/(main)/(screens)/projects/single-job/questionnaire`);
        }
    }

    const handleClearAnswers = () => {
        clearUserAnswers()  // Call the action to clear user answers
        setSelectedFromAddrBook({
            addressLine1: '',
            id: ''
        })
    };

    return (
        <Animated.View
            style={[
                styles.container,
                animatedStyle,
                { width: width, height: height, marginHorizontal: marginHorizontal, backgroundColor: bgColor }
            ]}
        >
            <Pressable
                onPress={() => {
                    handleSelectCard(item.isParentService, item.code, item.id);
                    handleClearAnswers();
                }}
                style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 10 }}>
                <View style={{ opacity: 0.2, alignItems: 'center' }}>
                    <Icon
                        name={item.icon!}
                        size={200}
                        color={textColor}
                    />

                </View>
                <Text style={[styles.cardTitle, { color: 'white' }]}>{item.name_en}</Text>
            </Pressable>
        </Animated.View>
    )
}

export default CategoryCard

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        backgroundColor: 'white',
        overflow: 'hidden',
        transformOrigin: 'bottom'
    },
    cardTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})