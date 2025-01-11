
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import { Href, router, useFocusEffect, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import {
    useCallback,
    useEffect,
    useState
} from "react";
import { Dimensions, ImageSourcePropType, Platform, StatusBar, StyleSheet, Text, View, Pressable } from "react-native";
import { Image } from 'expo-image';
import {
    Composer,
    GiftedChat,
    IMessage,
    InputToolbar,
    MessageImage,
    Send
} from "react-native-gifted-chat";
import Animated, { Easing, FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeOut, FadeOutLeft, FadeOutRight, FadeOutUp, ReduceMotion, SlideInDown, SlideInRight, SlideOutDown, SlideOutRight, SlideOutUp, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import React from "react";
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from "expo-camera";
import * as Crypto from 'expo-crypto';
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Mock user data
const users = [
    {
        _id: 1,
        name: 'Ben Johnson',
        avatar: "https://i.pinimg.com/736x/17/48/eb/1748eb9db3579151be1514e8e7652ff4.jpg",
    },
    {
        _id: 2,
        name: 'Robert Smith',
        avatar: "https://i.pinimg.com/736x/11/1e/81/111e8100d009eb9aea99b25c78f1fcca.jpg",
    },
    {
        _id: 3,
        name: 'Emily Davis',
        avatar: "https://i.pinimg.com/736x/2f/88/d2/2f88d2f4554614badc368350a1457caa.jpg",
    },
    {
        _id: 4,
        name: 'Michael Brown',
        avatar: "https://i.pinimg.com/736x/31/f5/09/31f5095514322024b16d42d042e0a4cc.jpg",
    },
    {
        _id: 5,
        name: 'Sarah Wilson',
        avatar: "https://i.pinimg.com/736x/d2/d3/84/d2d3843f1680ffc992021cd9e39d63dd.jpg",
    },
    {
        _id: 6,
        name: 'David Lee',
        avatar: "https://i.pinimg.com/736x/4e/63/c2/4e63c2a2baceb291f93a84cf5ae94b59.jpg",
    },
    {
        _id: 7,
        name: 'Jessica Taylor',
        avatar: "https://i.pinimg.com/736x/72/6f/3e/726f3e6e65bcbd5e28748af6316254e6.jpg",
    },
    {
        _id: 8,
        name: 'Daniel Harris',
        avatar: "https://i.pinimg.com/736x/60/92/ed/6092ed16a8ad81540b0e38b65c70563b.jpg",
    },
    {
        _id: 9,
        name: 'Olivia Martinez',
        avatar: "https://i.pinimg.com/736x/86/b6/55/86b655ab8fb4476342bc4bd9539bf9e3.jpg",
    },
];

// Mock chat data
const chatData: Record<number, IMessage[]> = {
    1: [
        {
            _id: 1,
            text: "Hey, are you free for a quick call?",
            createdAt: new Date(2023, 10, 15, 15, 45), // Example time
            user: users[0],
        },
        {
            _id: 2,
            text: "",
            createdAt: new Date(2023, 10, 15, 15, 45), // Example time
            user: users[0],
            image: 'https://i.pinimg.com/474x/15/34/92/153492d5cc36e23919920d27ab4b08cc.jpg'
        },
    ],
    2: [
        {
            _id: 2,
            text: "Can you review the code I sent?",
            createdAt: new Date(2023, 10, 15, 11, 30),
            user: users[1],
        },
    ],
    3: [
        {
            _id: 3,
            text: "Let me know your thoughts on the design!",
            createdAt: new Date(2023, 10, 14, 18, 0), // Example older date
            user: users[2],
        },
    ],
    4: [
        {
            _id: 4,
            text: "Let's catch up later today!",
            createdAt: new Date(2023, 10, 15, 14, 30),
            user: users[3],
        },
    ],
    5: [
        {
            _id: 5,
            text: "Can you send me the updated document?",
            createdAt: new Date(2023, 10, 15, 10, 15),
            user: users[4],
        },
    ],
    6: [
        {
            _id: 6,
            text: "The meeting has been rescheduled to tomorrow.",
            createdAt: new Date(2023, 10, 14, 9, 0), // Example older date
            user: users[5],
        },
    ],
    7: [
        {
            _id: 7,
            text: "Don't forget about the event next week.",
            createdAt: new Date(2023, 10, 15, 9, 0),
            user: users[6],
        },
    ],
    8: [
        {
            _id: 8,
            text: "Thanks for your help on the project!",
            createdAt: new Date(2023, 10, 15, 19, 45),
            user: users[7],
        },
    ],
    9: [
        {
            _id: 9,
            text: "I'll check the document and get back to you.",
            createdAt: new Date(2023, 10, 14, 15, 0), // Example older date
            user: users[8],
        },
    ],
};



// Function to fetch messages by user ID
const fetchMessagesByUserId = (userId: number | string): IMessage[] => {
    return chatData[Number(userId)] || [];
};

const screenWidth = Dimensions.get("window").width;

const animationConfig = {
    duration: 300, // Set the desired duration
    easing: Easing.inOut(Easing.quad),
    reduceMotion: ReduceMotion.System,
};

export default function ChatDetail() {
    const [image, setImage] = useState<string | null>(null);
    const [visible, setVisible] = useState(true);
    const { id } = useLocalSearchParams<{ id: string }>();
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState<IMessage[]>([]); // Fetch initial messages for user ID 1
    const [permission, requestPermission] = useCameraPermissions();
    const [imagePermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions()
    const data = fetchMessagesByUserId(id);
    const { bottom } = useSafeAreaInsets()
    // Get the screen width
    const inputWidth = useSharedValue(screenWidth); // Default width for input field
    const actionViewWidth = useSharedValue(95);
    const sendButtonTranslateX = useSharedValue(50);
    const actionViewTranslateX = useSharedValue(50);

    const userName = data[0]?.user.name || 'User';
    const userImage = data[0]?.user.avatar
    const userId = data[0]?.user._id

    useEffect(() => {
        setMessages(fetchMessagesByUserId(id))
    }, [id])

    const handleNavigationWithAnimation = (route: Href) => {
        setVisible(false);
        setTimeout(() => {
            router.push(route);
        }, 600);
    };

    const onSend = useCallback((newMessages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessages)
        );
    }, []);
    const handleInputTextChange = (text: string) => {
        setInputText(text);
        const isInputEmpty = text.length === 0; // Check if text is empty
        const isImageEmpty = !image; // Check if image is null or empty
        const textLength = text.length;

        // Update animations based on input and image state
        inputWidth.value = withTiming(isInputEmpty && isImageEmpty ? screenWidth : screenWidth, animationConfig);
        actionViewWidth.value = withTiming(isInputEmpty && isImageEmpty ? 95 : 50, animationConfig);
        sendButtonTranslateX.value = withTiming(isInputEmpty && isImageEmpty ? 100 : 0, animationConfig);
        actionViewTranslateX.value = withTiming(isInputEmpty && isImageEmpty ? 0 : 100, animationConfig);

    };

    useEffect(() => {
        const isImageEmpty = !image; // Check if image is null or empty
        const isInputEmpty = inputText.length === 0; // Check if input text is empty

        // Update animations based on input and image state
        inputWidth.value = withTiming(isInputEmpty && isImageEmpty ? screenWidth : screenWidth, animationConfig);
        actionViewWidth.value = withTiming(isInputEmpty && isImageEmpty ? 95 : 50, animationConfig);
        sendButtonTranslateX.value = withTiming(isInputEmpty && isImageEmpty ? 100 : 0, animationConfig);
        actionViewTranslateX.value = withTiming(isInputEmpty && isImageEmpty ? 0 : 100, animationConfig);
    }, [image, inputText]);


    const handleNavigateBack = () => {
        setVisible(false);
        setTimeout(() => {
            router.back();
        }, 600);
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        if (imagePermission?.status !== 'granted') {
            const res = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (res.granted) {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ["images"],  // Ensure it focuses on images
                    allowsEditing: false,
                    aspect: [4, 3],
                    quality: 1,
                });

                if (!result.canceled) {
                    setImage(result.assets[0].uri);  // Set image if taken successfully
                }
            }
            // Show the custom permission modal if permission is not granted


        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images', 'videos'],
                allowsEditing: false,
                aspect: [4, 3],
                videoQuality: ImagePicker.UIImagePickerControllerQualityType.High,
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        }

    };

    const takePhoto = async () => {
        if (permission?.status !== 'granted') {
            const res = await ImagePicker.requestCameraPermissionsAsync()
            if (res.granted) {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ["images"],  // Ensure it focuses on images
                    allowsEditing: false,
                    aspect: [4, 3],
                    quality: 1,
                });

                if (!result.canceled) {
                    setImage(result.assets[0].uri);  // Set image if taken successfully
                }
            }
        } else {
            // Launch camera if permission is already granted
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ["images"],  // Ensure it focuses on images
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);  // Set image if taken successfully
            }
        }



    };

    const inputAnimatedStyle = useAnimatedStyle(() => ({
        width: inputWidth.value,
    }));

    const actionViewAnimatedStyle = useAnimatedStyle(() => ({
        width: actionViewWidth.value,
        transform: [{ translateX: actionViewTranslateX.value }],
    }));

    const sendButtonAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: sendButtonTranslateX.value }],
    }));

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white'
            }}
        >
            {visible &&
                <Animated.View
                    style={{
                        flex: 1,
                    }}
                    entering={
                        SlideInDown
                            .delay(100)
                            .duration(500)
                            .withInitialValues({
                                transform: [{ translateY: 400 }]
                            })
                    }

                    exiting={
                        SlideOutDown
                            .delay(100)
                            .duration(500)
                            .withInitialValues({
                                transform: [{ translateY: -400 }]
                            })

                    }
                >
                    <GiftedChat
                        messages={messages}
                        onSend={(messages: any) => onSend(messages)}
                        scrollToBottom
                        isCustomViewBottom
                        keyboardShouldPersistTaps="never"
                        infiniteScroll
                        alwaysShowSend={inputText.length !== 0 || image ? true : false}
                        renderUsernameOnMessage
                        initialText=" "
                        renderMessageImage={(props) => <MessageImage {...props} imageStyle={{
                            width: 300,
                            height: 300,
                            objectFit: 'cover'
                        }} />}
                        onInputTextChanged={handleInputTextChange}
                        user={{
                            _id: 9999,
                            name: 'Chetra',
                            avatar: 'https://i.pinimg.com/736x/b9/05/ee/b905ee4c20c628207dd7f607f03fa556.jpg'
                        }}
                        listViewProps={{
                            marginTop: 0,
                            paddingTop: Platform.OS === 'ios' ? 10 : undefined,
                            backgroundColor: 'white'
                        }}
                        renderInputToolbar={(props) =>
                            <Animated.View
                                style={inputAnimatedStyle}
                            >
                                <InputToolbar
                                    {...props}
                                    containerStyle={{
                                        paddingBottom: Platform.OS === 'ios' ? bottom + 30 : bottom + 20,
                                        paddingTop: 10,

                                    }}
                                />
                            </Animated.View>
                        }
                        renderActions={(props) => (
                            <Pressable
                                {...props}
                                onPress={() => {
                                    pickImage()
                                }}
                                style={{
                                    height: '100%',
                                    width: 50,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Entypo
                                    name="attachment"
                                    size={25}
                                />
                            </Pressable>
                        )}
                        renderChatFooter={() => {
                            if (image) {
                                return (
                                    <View
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            width: '100%',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            paddingHorizontal: 10,
                                        }}
                                    >
                                        <Image
                                            source={{ uri: image }}
                                            contentFit="contain"
                                            style={{
                                                backgroundColor: 'gray',
                                                width: 100,
                                                height: 100,
                                            }}
                                        />
                                    </View>
                                )
                            }
                        }}
                        renderSend={(props) => {
                            // alert(inputText.length === 0 && !image ? 'camera' : 'sender')
                            return (
                                <>
                                    {inputText.length === 0 && !image ? (
                                        <Animated.View
                                            style={[actionViewAnimatedStyle, {
                                                height: '100%',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 10,
                                            }]}
                                        >
                                            <Pressable onPress={() => takePhoto()}>
                                                <Ionicons name="camera-outline" size={30} />
                                            </Pressable>
                                            <Pressable onPress={() => alert('Pressed Mic!')}>
                                                <MaterialCommunityIcons name="microphone-outline" size={30} />
                                            </Pressable>
                                        </Animated.View>
                                    ) : (

                                        <Send
                                            {...props}
                                            onSend={() => {
                                                const UUID = Crypto.randomUUID();
                                                const newMessages: any = {
                                                    _id: UUID,
                                                    text: inputText,
                                                    createdAt: new Date(),
                                                    user: {
                                                        _id: 9999,
                                                        name: 'Chetra',
                                                        avatar: 'https://i.pinimg.com/736x/b9/05/ee/b905ee4c20c628207dd7f607f03fa556.jpg'
                                                    },
                                                    image: image,
                                                    file: {
                                                        url: 'https://i.pinimg.com/736x/b9/05/ee/b905ee4c20c628207dd7f607f03fa556.jpg'
                                                    }
                                                }
                                                onSend(newMessages)
                                                setImage('')
                                                setInputText('')
                                            }
                                            }
                                            containerStyle={[
                                                {
                                                    position: 'relative',
                                                    height: '100%',
                                                    width: 50,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }
                                            ]}
                                        >
                                            <Animated.View
                                                style={sendButtonAnimatedStyle}
                                            >
                                                <FontAwesome
                                                    name="send"
                                                    size={20}
                                                />
                                            </Animated.View>

                                        </Send>
                                    )
                                    }
                                </>
                            )
                        }}
                        renderComposer={(props) => (

                            <Composer
                                {...props}
                                placeholderTextColor="black"
                                text="ok2"
                                placeholder="Send a message"

                                textInputProps={{

                                    style: [
                                        {
                                            flex: 1,
                                            borderWidth: 1,
                                            borderRadius: 15,
                                            paddingVertical: 12,
                                            paddingHorizontal: 15
                                        }
                                    ],
                                    value: inputText
                                }}
                            />
                        )}
                        scrollToBottomStyle={{
                            backgroundColor: 'white'
                        }}
                        scrollToBottomComponent={() => {
                            return (
                                <MaterialIcons name="keyboard-double-arrow-down" size={25} />
                            )
                        }}
                    />
                </Animated.View>
            }
        </View>
    );
}
