import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, View, StyleSheet, StatusBar, TouchableWithoutFeedback, Image, Dimensions, Modal, Linking } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView, Pressable, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeOutDown, FadeOutUp, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType, CameraView, useCameraPermissions, CameraViewRef } from "expo-camera";
import React from "react";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function UserDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [facing, setFacing] = useState<CameraType>('back');
    const [visible, setVisible] = useState(true);
    const [image, setImage] = useState<string | null>(null);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [imagePermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions()
    const [isModalVisible, setModalVisible] = useState(false);

    const translateY = useSharedValue(SCREEN_HEIGHT);

    const openBottomSheet = () => {
        setBottomSheetVisible(true);
        translateY.value = withSpring(0, { damping: 20 });
    };

    const closeBottomSheet = () => {
        translateY.value = withSpring(SCREEN_HEIGHT, { damping: 20 });
        setTimeout(() => runOnJS(setBottomSheetVisible)(false), 500);
    };

    const gesture = Gesture.Pan()
        .onUpdate((e) => {
            translateY.value = Math.max(e.translationY, 0);
        })
        .onEnd((e) => {
            if (e.translationY > SCREEN_HEIGHT / 10) {
                runOnJS(closeBottomSheet)();
            } else {
                translateY.value = withSpring(0, { damping: 20 });
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const overlayStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateY.value,
            [0, SCREEN_HEIGHT],
            [0.5, 0]
        );
        return { opacity };
    });


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
                    closeBottomSheet();
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
                closeBottomSheet();
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
                    closeBottomSheet();
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
                closeBottomSheet();
            }
        }



    };

    const handleRequestPermission = async () => {
        // Request permission if the user clicks Allow
        const { status } = await requestPermission();
        if (status === 'granted') {
            // If permission is granted, launch the camera
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [16, 9],
                orderedSelection: true,
                presentationStyle: ImagePicker.UIImagePickerPresentationStyle.POPOVER,
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                closeBottomSheet();
            }
        } else if (status === 'denied') {
            // If permission is denied, open the app settings
            Linking.openSettings();
        }

        setModalVisible(false); // Close the custom modal after permission handling
    };


    useEffect(() => {
        setVisible(true);
    }, [])

    return (
        <View style={styles.safeArea}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                    <GestureHandlerRootView>

                        <ScrollView
                            style={styles.scrollContainer}
                            contentInset={{
                                bottom: Platform.OS === 'ios' ? 30 : undefined,
                            }}
                            contentContainerStyle={{
                                paddingBottom: Platform.OS === 'ios' ? 0 : 50
                            }}
                            nestedScrollEnabled
                        >
                            {visible && (
                                <Animated.View
                                    style={[styles.animateContainer]}
                                    entering={
                                        FadeInDown
                                            .delay(300)
                                            .duration(500)
                                            .withInitialValues({
                                                transform: [{ translateY: 400 }]
                                            })
                                    }

                                    exiting={
                                        FadeOutDown
                                            .delay(300)
                                            .duration(500)
                                    }
                                >
                                    <View
                                        style={{
                                            backgroundColor: 'white',
                                            padding: 20,
                                            borderRadius: 10
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 20,
                                                paddingBottom: 10
                                            }}
                                        >
                                            <Pressable
                                                onPress={openBottomSheet}
                                                style={{
                                                    height: 80,
                                                    width: 80,
                                                }}
                                            >

                                                {image ?
                                                    <Image
                                                        className="rounded-full border border-gray-300"
                                                        source={{ uri: image }}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                        }}
                                                        resizeMode="cover"
                                                        resizeMethod="scale"
                                                    />
                                                    :
                                                    <Image
                                                        className="rounded-full border-2 border-white"
                                                        source={require('@/assets/images/placholder/newsfeed/cat.jpg')}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                        }}
                                                        resizeMode="cover"
                                                        resizeMethod="scale"
                                                    />
                                                }
                                                <View
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        right: -7,
                                                        borderRadius: 9999,
                                                        borderWidth: 2,
                                                        borderColor: 'white',
                                                        backgroundColor: '#217af7',

                                                    }}
                                                >
                                                    <View

                                                        style={{
                                                            width: 26,
                                                            height: 26,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <Octicons
                                                            name="pencil"
                                                            color={'white'}
                                                            size={14}
                                                        />
                                                    </View>
                                                </View>
                                            </Pressable>
                                            <View
                                                style={{
                                                    flex: 1
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 16,

                                                    }}
                                                    className="font-medium"
                                                >
                                                    Enter your name and change your profile picture
                                                </Text>
                                            </View>
                                        </View>

                                        <View
                                            className="border-y border-gray-200"
                                            style={{
                                                paddingVertical: Platform.OS === 'ios' ? 20 : 8
                                            }}
                                        >
                                            <TextInput
                                                // onFocus={() => alert('start input')}
                                                value="Sok Chetra"
                                                style={{
                                                    fontSize: 18
                                                }}
                                            />
                                        </View>
                                    </View>

                                    <View>
                                        <Text
                                            style={{
                                                paddingHorizontal: Platform.OS === 'ios' ? 20 : 20,
                                                paddingBottom: 10,
                                                fontSize: 16,
                                                fontWeight: '500',
                                                color: '#717171'
                                            }}
                                        >
                                            Username
                                        </Text>
                                        <View
                                            style={{
                                                backgroundColor: 'white',
                                                paddingHorizontal: Platform.OS === 'ios' ? 20 : 20,
                                                paddingVertical: Platform.OS === 'ios' ? 20 : 5,
                                                borderRadius: 10
                                            }}
                                        >
                                            <TextInput
                                                // onFocus={() => alert('start input')}
                                                value="chetra.ztoa"
                                                style={{
                                                    fontSize: 18
                                                }}

                                            />
                                        </View>
                                    </View>
                                </Animated.View>
                            )}
                        </ScrollView>
                        {bottomSheetVisible && (
                            <>
                                <TouchableWithoutFeedback onPress={closeBottomSheet}>
                                    <Animated.View style={[styles.overlay, overlayStyle]} />
                                </TouchableWithoutFeedback>

                                <GestureDetector gesture={gesture}>
                                    <Animated.View style={[styles.bottomSheet, animatedStyle]}>
                                        <View style={styles.indicator} />
                                        <Pressable style={styles.optionButton} onPress={pickImage}>
                                            <Ionicons name="albums-outline" size={25} />
                                            <Text style={styles.optionText}>Select from Albums</Text>
                                        </Pressable>
                                        <Pressable style={styles.optionButton} onPress={takePhoto}>
                                            <Ionicons name="camera-outline" size={25} />
                                            <Text style={styles.optionText}>Take Photo</Text>
                                        </Pressable>
                                        <Modal
                                            transparent
                                            visible={isModalVisible}
                                            animationType="fade"
                                            onRequestClose={() => setModalVisible(false)}
                                        >
                                            <View style={styles.modalOverlay}>
                                                <View style={styles.modalContainer}>
                                                    <Text style={styles.modalTitle}>Permission Needed</Text>
                                                    <Text style={styles.modalMessage}>
                                                        This app needs camera access to take photos. Please allow access in your device settings.
                                                    </Text>
                                                    <View
                                                        style={{
                                                            width: '100%',
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between'
                                                        }}
                                                    >
                                                        <Pressable style={styles.allowButton} onPress={handleRequestPermission}>
                                                            <Text style={styles.modalButtonText}>Allow</Text>
                                                        </Pressable>
                                                        <Pressable style={styles.denyButton} onPress={() => setModalVisible(false)}>
                                                            <Text style={styles.modalButtonText}>Deny</Text>
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>
                                        {/* <CameraView facing={facing} style={{ flex: 1, }}>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    backgroundColor: 'transparent',
                                                    margin: 64,
                                                }}
                                            >
                                                <TouchableOpacity
                                                    onPress={toggleCameraFacing}
                                                    style={{
                                                        flex: 1,
                                                        alignSelf: 'flex-end',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Text style={{
                                                        fontSize: 24,
                                                        fontWeight: 'bold',
                                                        color: 'white',
                                                    }}>Flip Camera</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </CameraView> */}
                                    </Animated.View>
                                </GestureDetector>
                            </>
                        )}
                    </GestureHandlerRootView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    animateContainer: {
        flex: 1,
        position: 'relative',
        paddingHorizontal: 10,
        gap: 20
    },
    scrollContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: SCREEN_HEIGHT * 0.5,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    indicator: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    optionButton: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    allowButton: {
        backgroundColor: '#217af7',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    denyButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
})