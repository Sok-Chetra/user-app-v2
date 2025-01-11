import { FlatList, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import Icon from '../ui/icon';
import { useServiceStore } from '@/providers/project/ServiceProvider';

type Props = {
    question: string;
    type: 'SELECT' | 'DATE' | 'MULTI_SELECT' | string;
    options: string[] | null | undefined;
    style?: ViewStyle,
}

const MultiSelectOption = ({
    question,
    options,
    type,
    style
}: Props) => {
    const { setUserAnswer, user_answers } = useServiceStore(state => state)

    const handleSelectOption = (option: string, question: string, type: string) => {
        setUserAnswer({
            a: [option],
            q: question,
            t: type,
        });
    }

    return (
        <View style={[style, { paddingHorizontal: 15, paddingTop: 50 }]}>
            <View className="mt-10 pb-5 px-2">
                <Text className="text-4xl font-bold capitalize">
                    {question}
                </Text>
            </View>
            <FlatList
                data={options}
                keyExtractor={(item, index) => item + index}
                numColumns={2}
                renderItem={({ item }) => {
                    const isSelected = user_answers.some(answer => answer.a.includes(item));

                    return (
                        <Pressable
                            onPress={() => handleSelectOption(item, question, type)}
                            style={[styles.buttonOption, { marginHorizontal: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: isSelected ? '#FF6500' : 'white' }]}>
                            <Text style={{ color: isSelected ? 'white' : 'black', fontWeight: 'bold', fontSize: 16 }}>{item}</Text>
                        </Pressable>

                    )
                }}
            />
        </View>
    )
}

export default MultiSelectOption

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        gap: 20
    },
    buttonOption: {
        borderRadius: 20,
        overflow: 'hidden',
        flex: 1,
        height: 100
    }
})