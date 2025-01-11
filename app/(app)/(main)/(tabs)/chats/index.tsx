
import { Ionicons } from "@expo/vector-icons";
import {
    Href,
    router,
    Stack,
    useFocusEffect,
} from "expo-router";
import React from "react";
import {
    useCallback,
    useRef,
    useState
} from "react";
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
    Image,
    useWindowDimensions,
    TouchableOpacity,
    FlatList,
    Pressable
} from "react-native";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
    ScrollView
} from "react-native-gesture-handler";
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
    CurvedTransition,
    Easing,
    Extrapolation,
    FadeInDown,
    interpolate,
    LinearTransition,
    ReduceMotion,
    SharedValue,
    SlideInLeft,
    SlideOutDown,
    SlideOutLeft,
    useAnimatedStyle
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Mock chat data
const initialChatList = [
    {
        id: 1,
        name: 'Ben Johnson',
        avatar: "https://i.pinimg.com/736x/17/48/eb/1748eb9db3579151be1514e8e7652ff4.jpg",
        lastMessage: "Hey, are you free for a quick call?",
        lastMessageTime: "3:45 PM",
    },
    {
        id: 2,
        name: 'Robert Smith',
        avatar: "https://i.pinimg.com/736x/11/1e/81/111e8100d009eb9aea99b25c78f1fcca.jpg",
        lastMessage: "Can you review the code I sent?",
        lastMessageTime: "11:30 AM",
    },
    {
        id: 3,
        name: 'Emily Davis',
        avatar: "https://i.pinimg.com/736x/2f/88/d2/2f88d2f4554614badc368350a1457caa.jpg",
        lastMessage: "Let me know your thoughts on the design!",
        lastMessageTime: "Yesterday",
    },
    {
        id: 4,
        name: 'Michael Brown',
        avatar: "https://i.pinimg.com/736x/31/f5/09/31f5095514322024b16d42d042e0a4cc.jpg",
        lastMessage: "Let's catch up later today!",
        lastMessageTime: "2:30 PM",
    },
    {
        id: 5,
        name: 'Sarah Wilson',
        avatar: "https://i.pinimg.com/736x/d2/d3/84/d2d3843f1680ffc992021cd9e39d63dd.jpg",
        lastMessage: "Can you send me the updated document?",
        lastMessageTime: "10:15 AM",
    },
    {
        id: 6,
        name: 'David Lee',
        avatar: "https://i.pinimg.com/736x/4e/63/c2/4e63c2a2baceb291f93a84cf5ae94b59.jpg",
        lastMessage: "The meeting has been rescheduled to tomorrow.",
        lastMessageTime: "Yesterday",
    },
    {
        id: 7,
        name: 'Jessica Taylor',
        avatar: "https://i.pinimg.com/736x/72/6f/3e/726f3e6e65bcbd5e28748af6316254e6.jpg",
        lastMessage: "Don't forget about the event next week.",
        lastMessageTime: "9:00 AM",
    },
    {
        id: 8,
        name: 'Daniel Harris',
        avatar: "https://i.pinimg.com/736x/60/92/ed/6092ed16a8ad81540b0e38b65c70563b.jpg",
        lastMessage: "Thanks for your help on the project!",
        lastMessageTime: "7:45 PM",
    },
    {
        id: 9,
        name: 'Olivia Martinez',
        avatar: "https://i.pinimg.com/736x/86/b6/55/86b655ab8fb4476342bc4bd9539bf9e3.jpg",
        lastMessage: "I'll check the document and get back to you.",
        lastMessageTime: "Yesterday",
    },
];

export default function ChatsScreen() {
    const [openSwipeableIndex, setOpenSwipeableIndex] = useState<number | null>(null);
    const [chatList, setChatList] = useState(initialChatList);
    const [visible, setVisible] = useState(true);
    const [isScrolling, setIsScroll] = useState(false)
    const [isSwiping, setIsSwipe] = useState(false)
    const swipeableRefs = useRef<(SwipeableMethods | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { height: SCREEN_HEIGHT } = useWindowDimensions()
    const { bottom, top } = useSafeAreaInsets()

    const tapGesture = Gesture.Rotation()
        .runOnJS(true)
        .onStart(() => { setIsScroll(true) })
        .onEnd(() => setIsScroll(false))

    function LeftAction(prog: SharedValue<number>, drag: SharedValue<number>) {

        const styleAnimation = useAnimatedStyle(() => {
            const archiveTranslateX = interpolate(
                drag.value,
                [0, 50, 75], // Input range: from 0 to 150, with an intermediate point at 75
                [-20, -5, 0],// Move the Archive button in
                Extrapolation.CLAMP,
            );


            return {
                transform: [{ translateX: archiveTranslateX }],
            };
        });

        const styleAnimation2 = useAnimatedStyle(() => {
            const deleteTranslateX = interpolate(
                drag.value,
                [0, 150, 200], // Input range for smooth transition
                [-100, -25, 0],
                Extrapolation.CLAMP,
            );

            return {
                transform: [{ translateX: deleteTranslateX }],
            };
        });

        return (
            <View style={{ flexDirection: 'row', width: 200 }}>
                <Pressable>
                    <Animated.View
                        style={[
                            styleAnimation,
                            styles.buttonAction,
                            { backgroundColor: '#6c564c', }
                        ]}
                    >

                        <Text style={[styles.rightAction]}>Pin</Text>

                    </Animated.View>
                </Pressable>
                <Pressable>
                    <Animated.View
                        style={[
                            styleAnimation2,
                            styles.buttonAction,
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
                Extrapolation.CLAMP,
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
                Extrapolation.CLAMP,

            );

            return {
                transform: [{ translateX: deleteTranslateX }],
            };
        });

        return (
            <View style={{ flexDirection: 'row', width: 200 }} className="">
                {/* <Pressable
                    onPress={() => alert('edit')}
                >
                    <Animated.View
                        style={[
                            styleAnimation,
                            styles.buttonAction,
                            { backgroundColor: '#0055ff', }
                        ]}
                    >
                        <Text style={[styles.rightAction]}>Edit</Text>
                    </Animated.View>
                </Pressable> */}
                <Pressable
                    onPress={() => handleDeleteChat(itemId)}
                >
                    <Animated.View
                        style={[
                            styleAnimation2,
                            styles.buttonAction,
                            { backgroundColor: 'red', }
                        ]}
                    >


                        <Text style={styles.rightAction}>Delete</Text>

                    </Animated.View>
                </Pressable>
            </View>
        );
    }


    const handleNavigationWithAnimation = (id: number) => {
        setVisible(false);
        setTimeout(() => {
            router.push(`/(screens)/chats/detail/${id}` as Href);
        }, 600);
    };

    const handleDeleteChat = (id: number) => {
        // Remove chat from the list by filtering out the chat with the given id
        setChatList(prevList => prevList.filter(chat => chat.id !== id));
    };

    const closeCurrentSwipeable = (index: number) => {
        const swipeable = swipeableRefs.current[index];
        if (swipeable) {
            swipeable.close();
        }
    };

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

    const renderChatItem = ({ item, index }: { item: typeof chatList[0], index: number }) => (

        <Animated.View
            entering={
                SlideInLeft
                    .delay(100 * index)
                    .duration(500)
            }
            exiting={
                SlideOutLeft
                    .delay(200)
                    .duration(500)
            }
        >

            <Swipeable
                ref={(ref) => (swipeableRefs.current[index] = ref)}
                friction={1}
                enabled={!isScrolling}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                overshootLeft={false}
                overshootRight={false}
                renderRightActions={(prog, drag) => RightAction(prog, drag, item.id)}
                // renderLeftActions={LeftAction}
                onSwipeableOpenStartDrag={() => {
                    closeOtherSwipeables(index)
                    handleSwipeableWillOpen(index);
                }}
                onSwipeableClose={() => setIsSwipe(false)}
            >
                <Pressable
                    onPress={() => {
                        handleNavigationWithAnimation(item.id);
                        closeAllSwipeables()
                    }}
                    disabled={isSwiping}
                    style={styles.cardContainer}
                >
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: item.avatar }}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.cardContent}>
                        <Text style={styles.tradeCode} numberOfLines={1}>UK000{item.id}</Text>
                        <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.cardMessage} numberOfLines={1}>{item.lastMessage}</Text>
                    </View>
                    <View className="w-20">
                        <Text style={styles.cardTime}>{item.lastMessageTime}</Text>
                    </View>

                </Pressable>
            </Swipeable>
        </Animated.View>
        // <TestItem />
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <GestureDetector gesture={tapGesture}>
                <>
                    <Stack.Screen
                        name="(tabs)/chats"
                        options={{
                            title: 'Chats',
                            headerShown: true,
                            headerLargeTitle: true,
                            headerSearchBarOptions: {
                                hideNavigationBar: true,
                                shouldShowHintSearchIcon: true
                            },
                            headerLargeTitleStyle: {
                                color: 'red'
                            },
                        }}
                    />
                    <FlatList
                        data={initialChatList}
                        contentInsetAdjustmentBehavior="automatic"
                        contentContainerStyle={{
                            gap: 10,
                            paddingTop: Platform.OS === 'ios' ? top : top,
                            paddingBottom: Platform.OS === 'ios' ? bottom : top,
                        }}
                        // renderItem={({ item, index }) => (
                        //     <Animated.View
                        //         entering={FadeInDown.delay(200 * index)}
                        //     >
                        //         <TouchableOpacity
                        //             onPress={() => router.push(`/(main)/(screens)/${item.id}`)}
                        //             style={{
                        //                 backgroundColor: 'gray',
                        //                 flexDirection: 'row',
                        //                 gap: 10,
                        //                 height: 100
                        //             }}
                        //         >

                        //             {/* <Animated.Image
                        //                         sharedTransitionTag={item.name}
                        //                         source={{ uri: item.image }}
                        //                         style={{
                        //                             width: 100,
                        //                             height: 100,
                        //                             objectFit: 'contain'
                        //                         }}
                        //                     /> */}
                        //             <Text>
                        //                 {item.name} {item.id}
                        //             </Text>


                        //         </TouchableOpacity>
                        //     </Animated.View>
                        // )}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderChatItem}
                    />
                </>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
    },
    animateContainer: {
        flex: 1,
        position: "relative",
    },
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#f8f9fa",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#e5e5e5',
    },
    avatarContainer: {
        marginRight: 15,
        width: 55,
        height: 55
    },
    avatar: {
        borderRadius: 99999,
        width: '100%',
        height: '100%'
    },
    cardContent: {
        flex: 1,
        gap: 3
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
    rightAction: {
        color: 'white',
        textAlign: 'center'
    },
    separator: {
        width: '100%',
        borderTopWidth: 1,
    },
    buttonAction: {

        justifyContent: 'center',
        height: '100%',
        width: 200
    },
    tradeCode: {
        fontWeight: 500
    }
});
