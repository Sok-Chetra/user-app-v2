import { Pressable, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import MultiSelectOption from './MultiSelectOption';
import { useServiceStore } from '@/providers/project/ServiceProvider';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAddressStore } from '@/providers/project/AddressProvider';
import DatePicker from '../date/DatePicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

type Props = {
    type: 'SELECT' | 'DATE' | 'MULTI_SELECT' | string;
    style?: ViewStyle,
    question: string;
    options: string[] | null | undefined;
    currentIndex: number;
    questionLength: number;
    scrollToNext: () => void;
    scrollToPrevious: () => void;
}

const Question = ({
    type,
    style,
    question,
    options,
    currentIndex,
    questionLength,
    scrollToNext,
    scrollToPrevious
}: Props) => {
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [date, setDate] = useState<Date>(new Date());
    const { user_answers, setUserAnswer } = useServiceStore(state => state)
    const { setStartDate } = useAddressStore(state => state)

    const hasSelectedAnswerForQuestion = (question: string): boolean => {
        const questionAnswers = user_answers.filter(answer => answer.q === question);
        return questionAnswers.some(answer => answer.a.length > 0);
    };

    const initializeDate = () => {
        const questionAnswer = user_answers.find(answer => answer.q === question);
        if (!questionAnswer) {
            // If no answer exists, set today's date as the default answer
            setUserAnswer({
                a: [new Date().toISOString()],
                q: question,
                t: type,
            });
        }
    };

    const isSelected = hasSelectedAnswerForQuestion(question);

    useEffect(() => {
        if (type === 'DATE') {
            // setUserAnswer({
            //     a: [new Date().toISOString()],
            //     q: question,
            //     t: type,
            // });
            initializeDate();
            setStartDate(date.toISOString())
        }
    }, [type, question])

    return (
        <View style={{ flex: 1 }}>
            {type === 'SELECT' && (
                <View style={[style]}>
                    <Text>Select Option</Text>
                </View>
            )}

            {type === 'DATE' && (
                <View style={[style, { flex: 1, paddingTop: 50, paddingHorizontal: 20 }]}>
                    <View className="mt-10 pb-5">
                        <Text className="text-4xl font-bold capitalize">
                            {question}
                        </Text>
                    </View>

                    <DatePicker question={question} type={type} />
                </View>
            )}

            {type === 'MULTI_SELECT' && (
                <MultiSelectOption type={type} question={question} options={options} style={style} />
            )}

            {isSelected &&
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        padding: 10,
                        backgroundColor: 'blue',
                        borderRadius: 5,
                    }}
                    onPress={() => {
                        if (questionLength - 1 === currentIndex) {
                            router.push('/(app)/(main)/(screens)/projects/single-job/location')
                        } else {
                            scrollToNext();
                        }
                        // console.log(currentIndex)
                    }}
                >
                    <Text style={{ color: 'white' }}>Next</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default Question

const styles = StyleSheet.create({})