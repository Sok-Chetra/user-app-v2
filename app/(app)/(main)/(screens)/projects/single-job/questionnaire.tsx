import { FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetServiceQuestionSuspenseQuery } from '@/generated/graphql'
import { useServiceStore } from '@/providers/project/ServiceProvider'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import Question from '@/components/select-option/Question'
import { useAddressStore } from '@/providers/project/AddressProvider'

type Props = {}

const Questionnaire = (props: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { width: SCREEN_WIDTH } = useWindowDimensions()
    const { _hasHydrated, selected_service, user_answers } = useServiceStore(state => state)
    const { startDate } = useAddressStore(state => state)
    const { data } = useGetServiceQuestionSuspenseQuery({
        fetchPolicy: "no-cache",
        variables: {
            code: selected_service.service_code!,
        },
    });
    const service = data?.homekong_db_services[0];

    const x = useSharedValue(0)
    const scrollViewRef = useRef<Animated.ScrollView>(null)

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        }
    })

    const scrollToNext = () => {
        // Calculate the next scroll position
        const nextOffset = x.value + SCREEN_WIDTH;
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: nextOffset, animated: true })
        }
    }


    const scrollToPrevious = () => {
        // Calculate the previous scroll position
        const prevOffset = x.value - SCREEN_WIDTH;
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: prevOffset, animated: true })
        }
    }

    const handleScrollEnd = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / SCREEN_WIDTH);
        setCurrentIndex(index);
    }

    const hasSelectedAnswerForQuestion = (question: string): boolean => {
        const questionAnswers = user_answers.filter(answer => answer.q === question);
        return questionAnswers.some(answer => answer.a.length > 0);
    };


    useEffect(() => {
        console.log(JSON.stringify(user_answers, null, 2))
        console.log(JSON.stringify(startDate, null, 2))

    }, [startDate, user_answers])

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Animated.ScrollView
                horizontal
                ref={scrollViewRef}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={16}
                snapToInterval={SCREEN_WIDTH}
                decelerationRate={'fast'}
                onScroll={onScroll}
                scrollEnabled={true}
                onMomentumScrollEnd={handleScrollEnd}
            >
                {service?.service_questions.map((question) => (
                    // <View style={{ width: SCREEN_WIDTH }}>
                    //     <Text>{question.question.questions}</Text>
                    // </View>
                    <Question
                        currentIndex={currentIndex}
                        key={question.question.id}
                        type={question.question.type}
                        question={question.question.questions}
                        options={question.question.options}
                        questionLength={service?.service_questions.length}
                        scrollToNext={scrollToNext}
                        scrollToPrevious={scrollToPrevious}
                        style={{ width: SCREEN_WIDTH }}
                    />
                ))}
            </Animated.ScrollView>
        </SafeAreaView>
    )
}

export default Questionnaire

const styles = StyleSheet.create({})