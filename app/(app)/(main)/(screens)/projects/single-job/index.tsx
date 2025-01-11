import { FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetServicesCategoriesSuspenseQuery } from '@/generated/graphql'
import RenderItem from '@/components/animated/render-item/RenderItem'
import CategoryCard from '@/components/cards/CategoryCard'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

type Props = {}

const SingleJobScreen = (props: Props) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions()
    const { data } = useGetServicesCategoriesSuspenseQuery({
        fetchPolicy: 'no-cache'
    });
    const x = useSharedValue(0)

    const ITEM_WIDTH = 250
    const ITEM_HEIGHT = 400
    const MARGIN_HORIZONTAL = 20

    const ITEM_FULL_WIDTH = ITEM_WIDTH + MARGIN_HORIZONTAL * 2
    const SPACER = (SCREEN_WIDTH - ITEM_FULL_WIDTH) / 2

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x
        }
    })

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.textContainer]}>
                <Text style={[styles.text]}>Categories</Text>
                <Text style={{ textAlign: 'center', color: 'gray' }}>
                    Select a category to view a list of related sub-jobs. Tap a category to explore more!
                </Text>
            </View>
            <Animated.FlatList
                onScroll={onScroll}
                data={data?.categories}
                keyExtractor={item => item.id + item.name_en}
                ListHeaderComponent={<View />}
                ListHeaderComponentStyle={{ width: SPACER }}
                ListFooterComponent={<View />}
                ListFooterComponentStyle={{ width: SPACER }}
                renderItem={({ item, index }) => {
                    return (
                        <CategoryCard
                            item={item}
                            index={index}
                            width={ITEM_WIDTH}
                            height={ITEM_HEIGHT}
                            marginHorizontal={MARGIN_HORIZONTAL}
                            x={x}
                            fullWidth={ITEM_FULL_WIDTH}
                        />
                    )
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={'fast'}
                snapToInterval={ITEM_FULL_WIDTH}
            />
            <View style={{ flex: 1 }} />
        </SafeAreaView>
    )
}

export default SingleJobScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    text: {
        color: '#0B192C',
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold'
    },
    textContainer: {
        flex: 4,
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 30,
    }
})