import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Ionicons, Octicons, Fontisto, AntDesign } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
    StyleSheet,
    View,
    Text,
    Platform,
    StatusBar,
    FlatList,
    Pressable,
    Modal,
    TouchableOpacity,
    useWindowDimensions
} from 'react-native';
import { Image } from 'expo-image';
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ImageCard from '@/components/cards/ImageCard';
import FeedMorePhotoBottomSheet from '@/components/animated/bottom-sheet/BottomSheetFlatList';
import BottomSheet, { BottomSheetMethods } from '@/components/animated/bottom-sheet/BottomSheet';
import BottomSheetScrollView from '@/components/animated/bottom-sheet/BottomSheetScrollView';
import BottomSheetFlatList from '@/components/animated/bottom-sheet/BottomSheetFlatList';

export interface Post {
    id: number;
    author: string;
    avatar_url: any;
    caption: string;
    images: any[]; // Modify to accept an array of images
}

export type Card = {
    id: number;
    title: string;
    backgroundColor: string;
}

// Mock data generator
const initialFeed = [
    {
        id: 1,
        author: `CHOCHOI`,
        avatar_url: 'https://i.pinimg.com/736x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg',
        caption: `A breathtaking depiction of nature's tranquility—rolling hills bathed in golden sunlight, a meandering river reflecting the azure sky, and towering mountains standing as timeless sentinels. This serene landscape invites viewers to escape into its beauty and embrace the harmony of the natural world.`,
        images: [
            'https://i.pinimg.com/736x/51/a7/c3/51a7c3da6375b096f7e10bbfbcaf7d48.jpg',
            'https://i.pinimg.com/736x/d9/a5/d4/d9a5d4863aa70f04f471c08023b18458.jpg',
            'https://i.pinimg.com/736x/39/57/07/3957072c8cdf625e996031ef4410c6e3.jpg',
            'https://i.pinimg.com/736x/66/fa/26/66fa268ce38c1f143068d47d2a71f539.jpg',
            'https://i.pinimg.com/736x/9e/3c/a9/9e3ca9d741e3cc8e6ad44f6143294789.jpg',
            'https://i.pinimg.com/736x/92/14/b2/9214b2ff0346763093a820d0375989d3.jpg',
        ],
    },
    {
        id: 2,
        author: `User 2`,
        avatar_url: 'https://i.pinimg.com/736x/f4/c7/1c/f4c71c4050c8b01d4ec39ab4185bd23a.jpg',
        caption: `A majestic wildlife scene brought to life—an eagle soars gracefully above a dense forest, its keen eyes scanning the terrain below. In the meadow, a herd of deer grazes peacefully, while a curious fox peeks out from the underbrush. This illustration captures the vibrant energy and delicate balance of the animal kingdom in its natural habitat.`,
        images: [
            'https://i.pinimg.com/736x/e9/0e/de/e90ede8c03ed18b2a28109351162d386.jpg',
            'https://i.pinimg.com/736x/a6/3a/61/a63a6165ca1bc7a4bc3220d09588a9df.jpg',
            'https://i.pinimg.com/736x/ba/d4/f4/bad4f406353aebf88e8f99b2ead7c5e5.jpg',
            'https://i.pinimg.com/736x/30/54/69/3054694b977e4f8fe0615e412aab1409.jpg',
            'https://i.pinimg.com/736x/d6/6e/89/d66e89887988cf951780521659a28b95.jpg',
            'https://i.pinimg.com/736x/54/a3/7c/54a37cb8687c8501433f3a632444f29b.jpg',
        ],
    },
    {
        id: 3,
        author: `User 3`,
        avatar_url: 'https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg',
        caption: `A vibrant portrayal of everyday life—people of all ages going about their routines in a bustling city. In the foreground, a couple enjoys a leisurely stroll through a park, while a street vendor serves fresh produce to passersby. Children play joyfully nearby, and cyclists glide through tree-lined streets. This illustration celebrates the dynamic, diverse lifestyles that shape our modern communities and the shared experiences that connect us all.`,
        images: [
            'https://i.pinimg.com/736x/6c/a8/90/6ca890224b2c687bf6b67e70881c03ea.jpg',
            'https://i.pinimg.com/736x/67/a5/f8/67a5f8edeffc10a25fb252079019af7c.jpg',
            'https://i.pinimg.com/736x/9f/69/cd/9f69cd984bc7c1761715f12a62125966.jpg',
            'https://i.pinimg.com/736x/b5/5c/ce/b55cce13a4464ca2c7a8f9c59fd8c2bd.jpg',
            'https://i.pinimg.com/736x/70/87/b7/7087b70b566e4b2559c3611139b9b844.jpg',
            'https://i.pinimg.com/736x/97/6f/7a/976f7a71e5d3a934614599bd0298fa17.jpg',
        ],
    },
]
export default function HomeScreen() {
    const { width: SCREEN_WIDTH } = useWindowDimensions()
    const TAB_HEIGHT = useBottomTabBarHeight();
    const [images, setImages] = useState<any[]>([]);
    const [data, setData] = useState<Post[]>([]);
    const [visibleData, setVisibleData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const bottomSheetRef = useRef<BottomSheetMethods>(null)
    const animatedValue = useSharedValue(0)
    const translateX = useSharedValue(0)

    const pan = Gesture
        .Pan()
        .onUpdate(e => {
            console.log(e.translationX)
            translateX.value = e.translationX
        })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: translateX.value
            }]
        }
    })

    const expandHandler = useCallback(() => {
        bottomSheetRef.current?.expand()
        setModalVisible(true);
    }, [])

    const closeHandler = useCallback(() => {
        bottomSheetRef.current?.close()
    }, [])

    // Initial data loading
    useEffect(() => {
        const allImages = initialFeed.flatMap(post => post.images);
        setImages(allImages);
        setData(initialFeed);
        setVisibleData(initialFeed.slice(0, 5));
    }, []);

    // Fetch more data on scroll
    const fetchMoreData = () => {
        if (loading) return;

        setLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const currentLength = visibleData.length;
            const nextItems = data.slice(currentLength, currentLength + 5);
            setVisibleData((prevData) => [...prevData, ...nextItems]);
            setLoading(false);
        }, 1000);
    };

    // Handle image click to open modal with all images
    const handleImageClick = (images: any[], post: Post) => {
        setSelectedImages(images);
        setSelectedPost(post);
        expandHandler()
    };

    // Render item for FlatList
    const renderItem = ({ item, index }: { item: any, index: number }) => {
        const imagesToDisplay = item.images.slice(0, 4); // Only show the first 4 images
        const showMoreButton = item.images.length > 4;
        const imageLength = item.images.length
        const imageItem = item.image
        const MAX_SHOW = 3

        return (
            <View style={styles.feedCard}>

                {/* Feed Header */}
                <View style={styles.feedHeader}>
                    {imagesToDisplay.length <= 4 && (
                        <FlatList
                            data={imagesToDisplay}
                            keyExtractor={(image, index) => index.toString()}
                            renderItem={(image) => (
                                <View style={styles.imageContainer}>
                                    <View>
                                        <Image
                                            source={image.item}
                                            style={styles.feedImage}
                                        />
                                        {image.index === 3 && showMoreButton &&

                                            <View className='absolute left-0 right-0 '>
                                                <Pressable
                                                    style={styles.moreButton}
                                                    className='backdrop-blur-lg bg-white/60'
                                                    onPress={() => handleImageClick(item.images, item)}
                                                >
                                                    <Text style={styles.moreButtonText}>+ {imageLength - 4} more</Text>
                                                </Pressable>
                                            </View>
                                        }
                                    </View>

                                </View>
                            )}
                            numColumns={2}
                            contentContainerStyle={styles.imageList}
                        />
                    )}
                </View>

                {/* Feed Content */}
                <View style={styles.feedContent}>
                    <View style={styles.profileContainer}>
                        <View style={styles.profileUserImageContainer}>
                            <Image
                                source={item.avatar_url} // Show the first image as profile pic
                                style={styles.profileUserImage}
                            />
                        </View>
                        <Text style={styles.authorName}>{item.author}</Text>
                    </View>
                    <View style={styles.captionContainer}>
                        <Text style={styles.captionText}>{item.caption}</Text>
                    </View>
                </View>
                {/* Feed Footer */}
                <View style={styles.feedFooter}>
                    <Pressable style={styles.footerButton}>
                        <Octicons size={20} name="thumbsup" />
                        <Text style={styles.footerText}>Like</Text>
                    </Pressable>
                    <Pressable style={styles.footerButton}>
                        <Fontisto size={20} name="hipchat" />
                        <Text style={styles.footerText}>Comment</Text>
                    </Pressable>
                    <Pressable style={styles.footerButton}>
                        <Octicons size={20} name="share" />
                        <Text style={styles.footerText}>Share</Text>
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <GestureHandlerRootView style={styles.feedContainer}>
            <FlatList
                contentContainerStyle={styles.scrollContainer}
                data={visibleData}
                keyExtractor={({ id }) => id.toString()}
                renderItem={renderItem}
                onEndReached={fetchMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => loading && <Text style={styles.loadingText}>Loading more...</Text>}
            />

            <BottomSheetFlatList
                setModalVisible={setModalVisible}
                isModalVisible={isModalVisible}
                ref={bottomSheetRef}
                snapTo='95%'
                backgroundColor={'white'}
                backDropColor='black'
                data={selectedImages}
                ListHeaderComponent={() => {

                    return (
                        <>
                            {selectedPost && (
                                <View
                                    style={{
                                        paddingHorizontal: Platform.OS === 'ios' ? 5 : 10,
                                        gap: 20
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 20
                                        }}
                                    >
                                        <View style={styles.profileUserImageContainer}>
                                            <Image
                                                source={selectedPost.avatar_url} // Show the first image as profile pic
                                                style={styles.profileUserImage}

                                            />
                                        </View>
                                        <Text style={styles.authorName}>{selectedPost.author}</Text>
                                    </View>
                                    <View style={{ paddingBottom: 30 }}>
                                        <Text style={styles.captionText}>{selectedPost.caption}</Text>
                                    </View>
                                </View>
                            )}
                        </>
                    )
                }}
                renderItem={({ item, index }) => {

                    return (
                        <View
                            style={{
                                borderBottomWidth: 1,
                                borderColor: '#e5e5e5',
                            }}
                        >
                            <Image
                                key={index}
                                source={{ uri: item }}
                                style={[
                                    styles.modalImage,
                                    {
                                        width: SCREEN_WIDTH,
                                        objectFit: 'cover'
                                    }
                                ]}
                                contentPosition={'center'}
                            />
                            <View style={styles.feedFooter}>
                                <Pressable style={styles.footerButton}>
                                    <Octicons size={20} name="thumbsup" />
                                    <Text style={styles.footerText}>Like</Text>
                                </Pressable>
                                <Pressable style={styles.footerButton}>
                                    <Fontisto size={20} name="hipchat" />
                                    <Text style={styles.footerText}>Comment</Text>
                                </Pressable>
                                <Pressable style={styles.footerButton}>
                                    <Octicons size={20} name="share" />
                                    <Text style={styles.footerText}>Share</Text>
                                </Pressable>
                            </View>
                        </View>
                    )
                }}
            />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    feedContainer: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollContainer: {
        paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight! + 30,
    },
    feedCard: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        backgroundColor: 'white',
    },
    feedHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        backgroundColor: 'white',
    },
    imageList: {
        flexDirection: 'row'
    },
    imageContainer: {
        width: '50%', // 2 images per row
        padding: 5,
    },
    feedImage: {
        width: '100%',
        height: 150, // Adjust the height as per your needs
        marginBottom: 5,
    },
    moreButton: {
        justifyContent: 'center',
        height: 150
    },
    moreButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 600,
        color: '#006bff',
    },
    feedContent: {
        gap: 20,
        padding: 15,
    },
    feedFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 70,
        alignItems: 'center',
    },
    profileContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    profileUserImageContainer: {

        height: 60,
        width: 60,
    },
    profileUserImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        objectFit: 'cover',

    },
    authorName: {
        fontSize: Platform.OS === 'ios' ? 20 : 18,
        fontWeight: '600',
    },
    captionContainer: {

    },
    captionText: {
        fontSize: 16,
        fontWeight: '400',
    },
    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    footerText: {
        fontSize: 16,
        fontWeight: '500',
    },
    loadingText: {
        textAlign: 'center',
        paddingVertical: 30,
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        height: 300,
    },
    closeButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20,
        right: Platform.OS === 'ios' ? 15 : 10,
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 50,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
