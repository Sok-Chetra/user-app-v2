import FirstType from "@/components/animated/buttons/float-action/FirstType";
import SeconType from "@/components/animated/buttons/float-action/SeconType";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import {
    Href,
    router,
    Stack,
    useFocusEffect,
    useRouter
} from "expo-router";
import React from "react";
import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
    FlatList,
    Pressable,
} from "react-native";
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
    Extrapolation,
    FadeInDown,
    interpolate,
    SharedValue,
    SlideInDown,
    SlideInLeft,
    SlideOutDown,
    SlideOutUp,
    useAnimatedStyle
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Question = {
    id: string;
    name: string;
    answerQuestions: any[];
    createdAt: string;
    updatedAt: string;
}

export type Job = {
    id: string;
    ownerId: string;
    title: string;
    description: string;
    status: string;
    code: string;
    startDate: string;
    completeDate: string;
    abandoneDate: string;
    categoryId: string;
    addressId: string;
    questionId: string;
    question?: Question | null,
    createdAt: string;
    updatedAt: string;
}

const statusColors = {
    "in_progress": "green",
    "pending": "orange",
    "under_review": "blue",
    "completed": "gray",
    "approved": "teal",
    "rejected": "red",
};

export type Status = "in_progress" | "pending" | "under_review" | "completed" | "approved" | "rejected";

// Mock chat data
export const ProjectList: Job[] = [
    {
        id: 'project_1',
        ownerId: 'owner_1',
        title: 'Website Redesign',
        description: 'Redesign the company website for better user experience and SEO optimization.',
        status: 'in_progress',
        code: 'WD2024',
        startDate: '2024-01-15',
        completeDate: '',
        abandoneDate: '',
        categoryId: 'cat_2',
        addressId: 'addr_1',
        questionId: 'ques_5',
        createdAt: '2023-12-01T08:00:00Z',
        updatedAt: '2023-12-05T15:30:00Z',
    },
    {
        id: 'project_2',
        ownerId: 'owner_2',
        title: 'Mobile App Development',
        description: 'Develop a cross-platform mobile app for e-commerce.',
        status: 'pending',
        code: 'APP2024',
        startDate: '2024-03-01',
        completeDate: '',
        abandoneDate: '',
        categoryId: 'cat_3',
        addressId: 'addr_2',
        questionId: 'ques_6',
        createdAt: '2023-12-10T10:00:00Z',
        updatedAt: '2023-12-11T12:00:00Z',
    },
    {
        id: 'project_3',
        ownerId: 'owner_3',
        title: 'Data Migration',
        description: 'Migrate the existing database to a cloud-based solution.',
        status: 'completed',
        code: 'DM2023',
        startDate: '2023-06-01',
        completeDate: '2023-09-15',
        abandoneDate: '',
        categoryId: 'cat_4',
        addressId: 'addr_3',
        questionId: 'ques_7',
        createdAt: '2023-05-15T14:00:00Z',
        updatedAt: '2023-09-20T09:00:00Z',
    },
    {
        id: 'project_4',
        ownerId: 'owner_4',
        title: 'Marketing Campaign',
        description: 'Plan and execute a digital marketing campaign for product launch.',
        status: 'in_progress',
        code: 'MK2024',
        startDate: '2024-01-01',
        completeDate: '',
        abandoneDate: '',
        categoryId: 'cat_5',
        addressId: 'addr_4',
        questionId: 'ques_8',
        createdAt: '2023-12-01T16:00:00Z',
        updatedAt: '2023-12-10T18:30:00Z',
    },
    {
        id: 'project_5',
        ownerId: 'owner_5',
        title: 'AI Chatbot Integration',
        description: 'Integrate an AI-powered chatbot for customer support.',
        status: 'in_progress',
        code: 'AI2023',
        startDate: '2023-10-01',
        completeDate: '',
        abandoneDate: '',
        categoryId: 'cat_6',
        addressId: 'addr_5',
        questionId: 'ques_9',
        createdAt: '2023-09-01T09:00:00Z',
        updatedAt: '2023-10-05T12:00:00Z',
    },
    {
        id: 'project_6',
        ownerId: 'owner_6',
        title: 'Inventory Management System',
        description: 'Build an inventory management system for a retail chain.',
        status: 'pending',
        code: 'IMS2024',
        startDate: '2024-01-10',
        completeDate: '',
        abandoneDate: '',
        categoryId: 'cat_7',
        addressId: 'addr_6',
        questionId: 'ques_10',
        createdAt: '2023-11-20T11:30:00Z',
        updatedAt: '2023-12-01T14:00:00Z',
    },
    {
        id: 'project_7',
        ownerId: 'owner_7',
        title: 'Cybersecurity Audit',
        description: 'Conduct a comprehensive cybersecurity audit for the company.',
        status: 'completed',
        code: 'CS2023',
        startDate: '2023-03-01',
        completeDate: '2023-05-20',
        abandoneDate: '',
        categoryId: 'cat_8',
        addressId: 'addr_7',
        questionId: 'ques_11',
        createdAt: '2023-02-15T13:00:00Z',
        updatedAt: '2023-05-25T16:30:00Z',
    },
    {
        id: 'project_8',
        ownerId: 'owner_8',
        title: 'Customer Feedback Analysis',
        description: 'Analyze customer feedback to identify trends and improve services.',
        status: 'pending',
        code: 'CFA2024',
        startDate: '2024-01-10',
        completeDate: '',
        abandoneDate: '',
        categoryId: 'cat_9',
        addressId: 'addr_8',
        questionId: 'ques_12',
        createdAt: '2023-12-05T08:00:00Z',
        updatedAt: '2023-12-10T10:00:00Z',
    },
    {
        id: 'project_9',
        ownerId: 'owner_9',
        title: 'Employee Training Program',
        description: 'Design a training program for new employees.',
        status: 'in_progress',
        code: 'TP2024',
        startDate: '2024-01-10',
        completeDate: '',
        abandoneDate: '',
        categoryId: 'cat_10',
        addressId: 'addr_9',
        questionId: 'ques_13',
        createdAt: '2023-11-30T07:00:00Z',
        updatedAt: '2023-12-01T09:30:00Z',
    },
    {
        id: 'project_10',
        ownerId: 'owner_10',
        title: 'Employee Training Program',
        description: 'Design a training program for new employees.',
        status: 'in_progress',
        code: 'TP2024',
        startDate: '2024-01-10',
        completeDate: '',
        abandoneDate: '',
        categoryId: 'cat_10',
        addressId: 'addr_9',
        questionId: 'ques_13',
        createdAt: '2023-11-30T07:00:00Z',
        updatedAt: '2023-12-01T09:30:00Z',
    },
    {
        id: 'project_11',
        ownerId: 'owner_11',
        title: 'Employee Training Program',
        description: 'Design a training program for new employees.',
        status: 'in_progress',
        code: 'TP2024',
        startDate: '2024-01-10',
        completeDate: '',
        abandoneDate: '',
        categoryId: 'cat_10',
        addressId: 'addr_9',
        questionId: 'ques_13',
        createdAt: '2023-11-30T07:00:00Z',
        updatedAt: '2023-12-01T09:30:00Z',
    },
    {
        id: 'project_12',
        ownerId: 'owner_12',
        title: 'Employee Training Program',
        description: 'Design a training program for new employees.',
        status: 'in_progress',
        code: 'TP2024',
        startDate: '2024-01-10',
        completeDate: '',
        abandoneDate: '',
        categoryId: 'cat_10',
        addressId: 'addr_9',
        questionId: 'ques_13',
        createdAt: '2023-11-30T07:00:00Z',
        updatedAt: '2023-12-01T09:30:00Z',
    },
    {
        id: 'project_13',
        ownerId: 'owner_13',
        title: 'Employee Training Program',
        description: 'Design a training program for new employees.',
        status: 'in_progress',
        code: 'TP2024',
        startDate: '2024-01-10',
        completeDate: '',
        abandoneDate: '',
        categoryId: 'cat_10',
        addressId: 'addr_9',
        questionId: 'ques_13',
        createdAt: '2023-11-30T07:00:00Z',
        updatedAt: '2023-12-01T09:30:00Z',
    },
];

export const OwnersList = [
    { id: 'owner_1', name: 'Alice Johnson', avatar: 'https://i.pinimg.com/736x/15/b0/c5/15b0c5283d65f81adb69c09aac684554.jpg' },
    { id: 'owner_2', name: 'Bob Smith', avatar: 'https://i.pinimg.com/736x/25/f6/6e/25f66e08ee01e563086bb5723b40ae1b.jpg' },
    { id: 'owner_3', name: 'Charlie Brown', avatar: 'https://i.pinimg.com/736x/3e/b6/46/3eb646a40aed7887a36bc387b3bb9710.jpg' },
    { id: 'owner_4', name: 'Diana Prince', avatar: 'https://i.pinimg.com/736x/94/6d/5f/946d5f045ebfe1f62ef394e3a35e4d63.jpg' },
    { id: 'owner_5', name: 'Ethan Hunt', avatar: 'https://i.pinimg.com/736x/8e/6c/53/8e6c53843b1b9961b9b9831323613e1b.jpg' },
    { id: 'owner_6', name: 'Fiona Gallagher', avatar: 'https://i.pinimg.com/736x/b8/82/83/b882836fa749f501aefa935d19e19977.jpg' },
    { id: 'owner_7', name: 'George Lucas', avatar: 'https://i.pinimg.com/736x/aa/06/d7/aa06d77cd048b867f5d0b40362e62a76.jpg' },
    { id: 'owner_8', name: 'Hannah Montana', avatar: 'https://i.pinimg.com/736x/f9/09/cb/f909cb561c94235ad18b96d7c94409f6.jpg' },
    { id: 'owner_9', name: 'Ian Fleming', avatar: 'https://i.pinimg.com/736x/96/16/7f/96167fbee9bcb5a9cd2685e0950d483f.jpg' },
    { id: 'owner_10', name: 'Julia Roberts', avatar: 'https://i.pinimg.com/736x/1f/40/57/1f4057957f2bb3a03cf8f28610c1a6f9.jpg' },
];

export const formatStatus = (status: string): string => {
    const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'to', 'of', 'on', 'by', 'with'];
    return status
        .trim()
        .toLowerCase()  // Normalize to lowercase
        .replace(/_/g, " ")  // Replace underscores with spaces
        .split(" ")  // Split the string into words
        .map((word, index) => {
            // Capitalize first word or any non-exception word
            if (index === 0 || !exceptions.includes(word)) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word;  // Keep exceptions lowercase
        })
        .join(" ");  // Join the words back together
};

export const getStatusColor = (status: Status): string => {
    // Normalize status and return corresponding color
    return statusColors[status] || "black";
};

export default function ProjectsScreen() {
    const [visible, setVisible] = useState(true);
    const [isScrolling, setIsScroll] = useState(false)
    const { setOptions } = useNavigation()
    const TABBAR_HEIGHT = useBottomTabBarHeight()
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
                <Animated.View
                    style={[
                        styleAnimation,
                        styles.buttonAction,
                        { backgroundColor: '#6c564c', }
                    ]}
                >
                    <Pressable>
                        <Text style={[styles.rightAction]}>Pin</Text>
                    </Pressable>
                </Animated.View>
                <Animated.View
                    style={[
                        styleAnimation2,
                        styles.buttonAction,
                        { backgroundColor: '#00aa00', }
                    ]}
                >

                    <Text style={styles.rightAction}>Archive</Text>
                </Animated.View>
            </View>
        );
    }

    function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {

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
                <Animated.View
                    style={[
                        styleAnimation,
                        styles.buttonAction,
                        { backgroundColor: '#0055ff', }
                    ]}
                >
                    <Text style={[styles.rightAction]}>Edit</Text>
                </Animated.View>
                <Animated.View
                    style={[
                        styleAnimation2,
                        styles.buttonAction,
                        { backgroundColor: 'red', }
                    ]}
                >

                    <Pressable
                        onPress={() => alert('Deleted')}
                    >
                        <Text style={styles.rightAction}>Delete</Text>
                    </Pressable>
                </Animated.View>
            </View>
        );
    }


    const handleNavigationWithAnimation = (id: string) => {
        setVisible(false);
        setTimeout(() => {
            router.push(`/(screens)/projects/detail/${id}` as Href);
        }, 600);
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const renderChatItem = ({ item, index }: { item: typeof ProjectList[0], index: number }) => {
        const borderColor = getRandomColor();
        return (
            <Animated.View
                entering={SlideInLeft.delay(100 * index).duration(500)}
                exiting={SlideOutDown.delay(300).duration(500)}
            >

                <Pressable
                    onPress={() => handleNavigationWithAnimation(item.id)}
                    style={[styles.cardContainer, { borderLeftColor: borderColor }]}
                >
                    {/* <View style={styles.avatarContainer}>
                            <Animated.Image
                                source={{ uri: item.avatar }}
                                style={styles.avatar}
                                entering={FadeInDown.delay(100 * item.id).duration(300)}
                            />
                        </View> */}
                    <View style={styles.cardContent}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5
                            }}
                        >
                            <Ionicons
                                name="pin"
                                color={borderColor}
                                size={20}
                            />
                            <Text
                                style={{
                                    fontWeight: 400,
                                    color: '#555'
                                }}
                            >
                                {formatStatus(item.addressId)}
                            </Text>
                        </View>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardMessage} numberOfLines={1}>{item.description}</Text>
                    </View>
                    <View className="w-24 gap-5">
                        <Text
                            style={[
                                styles.cardTime,
                                {
                                    color: getStatusColor(item.status as Status),
                                    fontWeight: 600,
                                }
                            ]}
                        >
                            {formatStatus(item.status)}
                        </Text>
                        <Text
                            style={styles.cardTime}
                        >
                            {item.startDate}
                        </Text>
                    </View>
                </Pressable>
            </Animated.View>
        )
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <GestureDetector gesture={tapGesture}>
                <>
                    <Stack.Screen
                        name="(tabs)/projects"
                        options={{
                            title: 'Projects',
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
                        data={ProjectList}
                        contentInsetAdjustmentBehavior="automatic"
                        contentContainerStyle={{
                            gap: 10,
                            paddingTop: Platform.OS === 'ios' ? top : top,
                            paddingBottom: Platform.OS === 'ios' ? bottom : top,
                        }}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderChatItem}
                    />
                    <SeconType />
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
    scrollContainer: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 60 : StatusBar.currentHeight,
    },
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#f8f9fa",
        borderBottomWidth: 1,
        borderLeftWidth: 3,
        borderTopWidth: 1,
        borderColor: '#e5e5e5',
    },
    avatarContainer: {
        marginRight: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    cardContent: {
        flex: 1,
        gap: 10
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
    swipeable: {
        backgroundColor: 'white'
    },
    buttonAction: {

        justifyContent: 'center',
        height: '100%',
        width: 100
    }
});
