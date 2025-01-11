import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useGetSubServicesSuspenseQuery } from '@/generated/graphql';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubJobCarouselLandscape from '@/components/animated/carousel/SubJobCarouselLandscape';

type Props = {}

const SubJob = (props: Props) => {
    const { code } = useLocalSearchParams<{ code: string }>()
    const { data } = useGetSubServicesSuspenseQuery({
        variables: {
            parent_code: code
        }
    })

    return (
        <SafeAreaView style={[styles.container]}>
            <SubJobCarouselLandscape
                data={data}
            />
        </SafeAreaView>
    )
}

export default SubJob

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})