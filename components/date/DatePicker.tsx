import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useServiceStore } from '@/providers/project/ServiceProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

type ModeType = 'date' | 'time' | 'datetime';
type Props = {
    question: string;
    type: 'SELECT' | 'DATE' | 'MULTI_SELECT' | string;
}

const DatePicker = ({
    question,
    type
}: Props) => {
    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState<Date>(new Date());
    const [tempDate, setTempDate] = useState<Date | null>(null); // Temporary date state
    const [tempTime, setTempTime] = useState<Date | null>(null); // Temporary time state
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState<ModeType>('date');

    const { _hasHydrated, setUserAnswer, user_answers } = useServiceStore(state => state)

    const onChange = (event: any, selectedValue?: Date | undefined) => {
        if (selectedValue) {
            if (mode === 'date') {
                setTempDate(selectedValue);  // Store temporary date

            } else {
                setTempTime(selectedValue);  // Store temporary time
            }
        }
        if (Platform.OS === 'android') {
            setShow(false); // On Android, close the picker after date selection
            if (event.type === "set") {
                setDate(selectedValue || date); // Confirm the date on "OK"
                setUserAnswer({
                    a: [(selectedValue || date).toISOString()],
                    q: question,
                    t: type,
                });
            } else {
                setDate(date); // Reset to last confirmed date on "Cancel"
            }
        }
    };

    function formatDateAndTime(isoString: string | undefined | null) {
        if (!isoString || isNaN(new Date(isoString).getTime())) {
            return { formattedDate: '', formattedTime: '' }; // Return empty strings as fallback
        }

        const dateObject = new Date(isoString);

        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const dayOfWeek = weekdays[dateObject.getDay()];
        const month = months[dateObject.getMonth()];
        const day = dateObject.getDate();
        const year = dateObject.getFullYear();
        const hours = dateObject.getHours()

        const formattedDate = `${dayOfWeek} ${month} ${day} ${year}`;

        const formattedTime = dateObject.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: Platform.OS === 'ios' ? true : false,
        });

        return { formattedDate, formattedTime };
    }

    const userAnswer = user_answers.find(answer => answer.q === question && answer.t === "DATE");

    const { formattedDate, formattedTime } = formatDateAndTime(userAnswer ? userAnswer.a[0].toString() : date.toISOString());

    return (
        <>
            <Pressable
                className="h-24 flex-row items-center gap-5 border-2 border-blue-500 rounded-2xl px-5"
                onPress={() => {
                    setTempDate(date); // Store current date in temp state
                    setShow(true);
                    setMode('date');
                }}
            >
                {/* <CalendarDays color={'#3b82f6'} /> */}
                <Ionicons name='calendar-number-outline' size={25} />
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    {_hasHydrated && formattedDate ? formattedDate : 'Select Date'}
                </Text>


            </Pressable>
            {Platform.OS === 'ios' ? show && (
                <Pressable
                    style={styles.overlay}
                    onPress={() => setShow(false)} // Close on pressing outside
                >
                    <View style={styles.dateTimePickerContainer}>

                        <DateTimePicker
                            testID="dateDatePicker"
                            value={mode === 'date' ? userAnswer ? new Date(userAnswer.a[0]) : date : userAnswer ? new Date(userAnswer.a[0]) : time}
                            mode={mode === 'datetime' ? 'date' : mode}
                            is24Hour={true}
                            onChange={onChange}
                            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                        />
                        {Platform.OS === 'ios' && (
                            <View style={styles.iosButtonContainer}>
                                <Pressable
                                    onPress={() => {
                                        // Revert to original value on Cancel
                                        setTempDate(null);
                                        setTempTime(null);
                                        setShow(false);
                                    }}
                                    style={{ backgroundColor: 'gray', paddingHorizontal: 20, paddingVertical: 10 }}
                                >
                                    <Text>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        if (mode === 'date') {
                                            // Commit date change on Done
                                            setDate(tempDate || date);
                                            setUserAnswer({
                                                a: [(tempDate || date).toISOString()],
                                                q: question,
                                                t: type,
                                            });
                                        } else {
                                            // Combine tempTime with the date for final update
                                            const combinedDateTime = new Date(
                                                date.getFullYear(),
                                                date.getMonth(),
                                                date.getDate(),
                                                (tempTime || time).getHours(),
                                                (tempTime || time).getMinutes()
                                            );
                                            setTime(tempTime || time);
                                            setUserAnswer({
                                                a: [combinedDateTime.toISOString()],
                                                q: question,
                                                t: type,
                                            });
                                        }
                                        setShow(false); // Close picker
                                    }}
                                    style={{ backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical: 10 }}
                                >
                                    <Text>Done</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                </Pressable>
            ) : show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={mode === 'date' ? userAnswer ? new Date(userAnswer.a[0]) : date : userAnswer ? new Date(userAnswer.a[0]) : time}
                    mode={mode === 'datetime' ? 'date' : mode}
                    is24Hour={true}
                    onChange={onChange}
                    display={mode === 'date' ? 'calendar' : 'spinner'}
                />
            )}
        </>
    )
}

export default DatePicker

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',  // Center vertically
        alignItems: 'center',       // Center horizontally
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        zIndex: 10
    },
    dateTimePickerContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        padding: 20,
        borderRadius: 10,
        elevation: 5, // Adds a shadow (Android)
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    iosButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
})