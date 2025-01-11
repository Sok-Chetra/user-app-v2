import React, {
    useRef,
    useState
} from 'react'
import {
    CameraView,
    CameraType,
    useCameraPermissions,
} from 'expo-camera';
import {
    Button,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import Animated, { FadeIn, FadeOut, SlideInLeft, SlideOutRight, useAnimatedStyle, useSharedValue, withTiming, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PickTakePhoto = () => {
    const { bottom } = useSafeAreaInsets()
    const [tookImage, setTookImage] = useState('')
    const [selectedImage, setSelectedImage] = useState('')
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null)

    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const imageStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withTiming(scale.value, { duration: 300 }) }],
        opacity: withTiming(opacity.value, { duration: 300 }),
    }));

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withTiming(scale.value, { duration: 300 }) }],
        opacity: withTiming(opacity.value, { duration: 300 }),
    }));

    const handleTakePicture = () => {
        cameraRef.current?.takePictureAsync({
            quality: 1,
            onPictureSaved: (picture) => {
                setTookImage(picture.uri);
                // Trigger animation for showing the image
                scale.value = 1;
                opacity.value = 1;
            },
        });
    };

    const handleClearImage = () => {
        setTookImage('');
        // Trigger animation for hiding the image
        scale.value = 0.9;
        opacity.value = 1;
    }

    const toggleCameraFacing = () => {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: false,
            aspect: [4, 3],
            videoQuality: ImagePicker.UIImagePickerControllerQualityType.High,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }


    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                mode='picture'
                flash='auto'
                enableTorch={false}
                zoom={0}
                autofocus='on'
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
                onBarcodeScanned={(result) => console.log(result.data)}
                focusable
                videoQuality='1080p'
                pointerEvents='box-only'
                ref={cameraRef}
            />
            <View
                style={{
                    height: Platform.OS === 'ios' ? 150 : 100,
                    backgroundColor: 'black',
                    paddingBottom: bottom,
                }}
            >

                <View
                    style={{
                        paddingTop: 10,
                        flexDirection: 'row',
                        paddingHorizontal: 10
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >

                        {!tookImage ?
                            <Animated.View
                                style={iconStyle}
                            >
                                <TouchableOpacity
                                    onPress={pickImage}
                                >
                                    <Ionicons
                                        name='images'
                                        size={35}
                                        color={'white'}
                                    />
                                </TouchableOpacity>
                            </Animated.View>
                            : (
                                <Animated.View
                                    style={imageStyle}
                                >
                                    <LinearGradient
                                        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
                                        style={{
                                            backgroundColor: '#959595',
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            elevation: 5, // Adds shadow for depth on Android
                                            shadowColor: '#000', // Adds shadow for iOS
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.2,
                                            shadowRadius: 4,
                                            overflow: 'hidden',
                                            borderWidth: 1,
                                            borderColor: 'white'
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={handleClearImage}
                                        >
                                            <Image
                                                source={{ uri: tookImage }}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: 10,
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </Animated.View>
                            )
                        }
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleTakePicture}
                        >
                            <MaterialCommunityIcons
                                name='circle-slice-8'
                                style={styles.icon}
                                size={75}
                            />

                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={toggleCameraFacing}
                        >
                            <LinearGradient
                                colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
                                style={styles.iconBackground}
                            >
                                <MaterialIcons
                                    name='flip-camera-android'
                                    style={styles.icon}
                                    size={25}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style={styles.buttonContainer}>
                    <View
                        style={{
                            width: 80,
                            height: 80,
                            backgroundColor: 'lightgray'
                        }}
                    >

                    </View>
                    <View
                        style={{
                            paddingTop: 5
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignItems: 'center'

                            }}
                            onPress={() => cameraRef.current?.takePictureAsync({
                                quality: 1,
                                onPictureSaved: ((picture) => {
                                    setTookImage(picture.uri)
                                })
                            })}
                        >
                            <LinearGradient
                                colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}

                            >
                                <MaterialCommunityIcons
                                    name='circle-slice-8'
                                    style={styles.icon}
                                    size={75}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraFacing}
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
                            style={styles.iconBackground}
                        >
                            <MaterialIcons
                                name='flip-camera-android'
                                style={styles.icon}
                                size={35}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        alignItems: 'flex-start',

    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    iconBackground: {
        backgroundColor: 'gray',
        borderRadius: 9999,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Adds shadow for depth on Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    icon: {
        color: '#FFF', // White icon color
    },
});

export default PickTakePhoto