import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/providers/auth/AuthProvider'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { interpolate, SharedValue, SlideInLeft, SlideOutDown, useAnimatedStyle } from 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';

type Props = {}

function convertToReadableDate(isoDate: string) {
    const date = new Date(isoDate);

    // Format each part using Intl.DateTimeFormat
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    const timeZoneFormatter = new Intl.DateTimeFormat('en-US', {
        timeZoneName: 'short',
    });

    const formattedDate = dateFormatter.format(date); // e.g., "January 10, 2025"
    const formattedTime = timeFormatter.format(date); // e.g., "4:35:37 AM"
    const formattedTimeZone = timeZoneFormatter.format(date).split(' ').pop() || ''; // e.g., "UTC"

    // Combine for a full date string
    const fullDate = `${formattedDate} ${formattedTime} ${formattedTimeZone}`;

    return {
        date: formattedDate,
        time: formattedTime,
        timezone: formattedTimeZone,
        fullDate: fullDate,
    };
}


const Address = (props: Props) => {
    const [openSwipeableIndex, setOpenSwipeableIndex] = useState<number | null>(null);
    const [isScrolling, setIsScroll] = useState(false)
    const [isSwiping, setIsSwipe] = useState(false)
    const queryClient = useQueryClient()
    const swipeableRefs = useRef<(SwipeableMethods | null)[]>([]);

    const { bottom, top } = useSafeAreaInsets()
    const { accessToken } = useAuthStore(state => state)

    const { data, isFetched, isFetching, isError, refetch } = useQuery({
        queryKey: ['GetAddresses'],
        queryFn: async () => {
            const api_url = `http://192.168.110.186:5000/address`
            const res = await fetch(api_url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const data = await res.json()
            return data.data;
        },
    })

    const { isPending, isSuccess, error, mutate } = useMutation({
        mutationKey: ['DeleteAddress'],
        mutationFn: async (id: string | number) => {
            1
            const api_url = `http://192.168.110.186:5000/address/${id}`
            const res = await fetch(api_url,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${accessToken!}`,
                    },
                }
            );
            const data = await res.json()

            if (data.error) {
                setTimeout(() => {
                    alert("This address has been used.")
                }, 2000)

            } else {
                console.log('Address has been Deleted!')
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['GetAddresses']
            });
        },
    });

    const closeOtherSwipeables = (index: number) => {
        // Close all swipeables except the current one
        swipeableRefs.current.forEach((swipeable, i) => {
            if (swipeable && i !== index) {
                swipeable.close();
            }
        });
    };

    const closeAllSwipeables = () => {
        swipeableRefs.current.forEach((swipeable) => {
            if (swipeable) {
                swipeable.close();
            }
        });
    };

    const handleSwipeableWillOpen = (index: number) => {
        if (openSwipeableIndex !== index) {
            setOpenSwipeableIndex(index);
            setIsSwipe(true)
        }
    };


    function LeftAction(prog: SharedValue<number>, drag: SharedValue<number>) {
        // button 1
        // const styleAnimation = useAnimatedStyle(() => {
        //     const archiveTranslateX = interpolate(
        //         drag.value,
        //         [0, 50, 75], // Input range: from 0 to 150, with an intermediate point at 75
        //         [-20, -5, 0],// Move the Archive button in
        //         'clamp',
        //     );


        //     return {
        //         transform: [{ translateX: archiveTranslateX }],
        //     };
        // });

        // button 2
        const styleAnimation2 = useAnimatedStyle(() => {
            const deleteTranslateX = interpolate(
                drag.value,
                [0, 150, 200], // Input range for smooth transition
                [-100, -25, 0],
                'clamp',
            );

            return {
                transform: [{ translateX: deleteTranslateX }],
            };
        });

        return (
            <View style={{ flexDirection: 'row', width: 200 }}>
                {/* button 1 */}
                {/* <Pressable>
                    <Animated.View
                        style={[
                            styleAnimation,
                            styles.buttonActionLeft,
                            { backgroundColor: '#6c564c', }
                        ]}
                    >

                        <Text style={[styles.rightAction]}>Pin</Text>

                    </Animated.View>
                </Pressable> */}

                {/* button 2 */}
                <Pressable>
                    <Animated.View
                        style={[
                            styleAnimation2,
                            styles.buttonActionLeft,
                            { backgroundColor: '#00aa00', }
                        ]}
                    >

                        <Text style={styles.rightAction}>Archive</Text>
                    </Animated.View>
                </Pressable>
            </View>
        );
    }

    function RightAction(prog: SharedValue<number>, drag: SharedValue<number>, itemId: number) {

        const styleAnimation = useAnimatedStyle(() => {
            const archiveTranslateX = interpolate(
                drag.value,
                [-200, -100, 0], // Adjust the range based on swipe sensitivity
                [0, 100, 200], // Move the Archive button in
                'clamp',
            );

            return {
                transform: [{ translateX: archiveTranslateX }],
            };
        });

        const styleAnimation2 = useAnimatedStyle(() => {
            const deleteTranslateX = interpolate(
                drag.value,
                [-200, -100, 0],
                [0, 50, 100],
                'clamp',

            );

            return {
                transform: [{ translateX: deleteTranslateX }],
            };
        });

        return (
            <View style={{ flexDirection: 'row', width: 200 }} className="">
                <Pressable
                    onPress={() => alert('edit')}
                >
                    <Animated.View
                        style={[
                            styleAnimation,
                            styles.buttonActionRight,
                            { backgroundColor: '#0055ff', }
                        ]}
                    >
                        <Text style={[styles.rightAction]}>Edit</Text>
                    </Animated.View>
                </Pressable>
                <Pressable
                    onPress={() => onDelete(itemId)}
                >
                    <Animated.View
                        style={[
                            styleAnimation2,
                            styles.buttonActionRight,
                            { backgroundColor: 'red', }
                        ]}
                    >


                        <Text style={styles.rightAction}>Delete</Text>

                    </Animated.View>
                </Pressable>
            </View>
        );
    }


    const renderChatItem = ({ item, index }: { item: typeof data[0], index: number }) => {
        return (
            <Animated.View
                entering={SlideInLeft.delay(100 * index).duration(500)}

            >
                <Swipeable
                    ref={(ref) => (swipeableRefs.current[index] = ref)}
                    friction={1}
                    enabled={!isScrolling}
                    enableTrackpadTwoFingerGesture
                    rightThreshold={40}
                    overshootLeft={false}
                    overshootRight={false}
                    renderLeftActions={(prog, drag) => LeftAction(prog, drag)}
                    renderRightActions={(prog, drag) => RightAction(prog, drag, item.id)}
                    // renderLeftActions={LeftAction}
                    onSwipeableOpenStartDrag={() => {
                        closeOtherSwipeables(index)
                        handleSwipeableWillOpen(index);
                    }}
                    onSwipeableClose={() => setIsSwipe(false)}
                >
                    <Pressable
                        style={[styles.cardContainer]}
                    >
                        <View style={[styles.cardContent]}>
                            <View>
                                <Ionicons
                                    name="location"
                                    color={'#FF6500'}
                                    size={25}
                                />
                            </View>
                            <View style={{ width: '100%', paddingRight: 50 }}>
                                <Text style={styles.cardTitle} numberOfLines={2}>{item.addressLineOne}({item.postCode})</Text>
                                <Text style={styles.cardMessage} numberOfLines={1}>+{item.phoneCode}{item.phone}</Text>
                            </View>
                        </View>
                        <View className="w-30 min-w-30">
                            <Text
                                style={styles.cardTime}
                            >
                                {convertToReadableDate(item.updatedAt).date}
                            </Text>
                        </View>
                    </Pressable>
                </Swipeable>

            </Animated.View>
        )
    };

    const handlePress = () => router.push('/(app)/(main)/(tabs)/profile/address/add')

    async function onDelete(id: string | number) {
        try {
            mutate(id)
        } catch (error: any) {
            alert(error.message)
        }
    }

    useEffect(() => {
        console.log(JSON.stringify(data))
    }, [data])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <Stack.Screen
                name="(tabs)/profile/address"
                options={{
                    title: 'Addresses',
                    headerShown: true,
                    headerLargeTitle: true,
                    headerSearchBarOptions: {
                        hideNavigationBar: true,
                        shouldShowHintSearchIcon: true
                    },
                    headerLargeTitleStyle: {
                        color: '#FF6500'
                    },
                }}
            />
            <FlatList
                data={data}
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{
                    gap: 10,
                    paddingTop: Platform.OS === 'ios' ? top : top,
                    paddingBottom: Platform.OS === 'ios' ? bottom : top,
                }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderChatItem}
            />
            <Pressable onPress={handlePress} style={[styles.contentContainer]}>
                <View style={[styles.iconContainer]}>
                    <Octicons name='plus' size={30} color={'white'} />
                </View>
            </Pressable>

        </GestureHandlerRootView>
    )
}

export default Address

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        backgroundColor: '#FF6500',
        position: 'absolute',
        bottom: 30,
        right: 30,
        borderRadius: 999999
    },
    iconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#f8f9fa",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#e5e5e5',
        height: 100
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    cardMessage: {
        fontSize: 14,
        color: "#555",
        marginTop: 2,
    },
    cardTime: {
        textAlign: 'right',
        fontSize: 12,
        color: "#aaa",
    },
    buttonActionLeft: {
        justifyContent: 'center',
        height: '100%',
        width: 200
    },
    buttonActionRight: {
        justifyContent: 'center',
        height: '100%',
        width: 100
    },
    rightAction: {
        color: 'white',
        textAlign: 'center'
    },
})