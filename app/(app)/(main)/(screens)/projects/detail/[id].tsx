import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { formatStatus, getStatusColor, Job, OwnersList, ProjectList, Status } from "../../../(tabs)/projects";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";

const fetchOwnerById = (ownerId: string) => {
    return OwnersList.find((owner) => owner.id === ownerId);
};

const fetchProjectById = (projectId: string) => {
    return ProjectList.find((project: Job) => project.id === projectId);
};

export default function ProjectDetail() {
    const [visible, setVisible] = useState(true);
    const { id } = useLocalSearchParams<{ id: string }>();

    const project = id ? fetchProjectById(id) : undefined;
    const owner = project ? fetchOwnerById(project.ownerId) : undefined;

    // useFocusEffect(
    //     useCallback(() => {
    //         setVisible(true);
    //     }, [])
    // );
    return (
        <GestureHandlerRootView
            style={styles.safeView}
        >
            <View
                style={{
                    justifyContent: 'flex-start',
                    height: 160,
                    paddingHorizontal: 15
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}
                    >
                        <View
                            style={{
                                alignItems: 'center', // Center content horizontally within this box
                                paddingVertical: 10, // Optional padding for spacing
                                flexDirection: 'row',
                                gap: 10
                            }}
                        >
                            <Image
                                source={{ uri: owner?.avatar }}
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 9999,
                                    backgroundColor: 'lightgray', // Fallback color
                                    objectFit: 'cover',
                                }}
                            />
                            <View>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        marginTop: 8,
                                        fontSize: 18,
                                        fontWeight: 600,
                                        color: 'black'
                                    }}
                                >
                                    {owner?.name}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: 500,
                                        color: '#919191'
                                    }}
                                >
                                    Owner
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            gap: 10
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'right',
                                fontSize: 16,
                                fontWeight: 600,
                                color: 'black'
                            }}
                        >
                            #{project?.code}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5,
                                justifyContent: 'flex-end'
                            }}
                        >
                            <View
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: 999999,
                                    backgroundColor: project?.status ? getStatusColor(project?.status as Status) : 'white'
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: 'right',
                                    color: project?.status ? getStatusColor(project?.status as Status) : 'white',
                                    fontWeight: 500
                                }}
                            >
                                {formatStatus(project?.status as Status)}
                            </Text>
                        </View>
                    </View>
                </View>
                {/* <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            fontSize: 40,
                            fontWeight: 500
                        }}
                    >
                        {project?.title}
                    </Text>
                </View> */}
            </View>

            <View
                style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: '#217af7',
                    overflow: 'hidden',
                    flex: 1,
                }}
            >
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: 20,
                        paddingHorizontal: 15,
                        paddingBottom: 20,

                    }}
                >
                    <View
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 32,
                                fontWeight: 500,
                                color: '#EEEEEE'
                            }}
                        >
                            {project?.title}
                        </Text>

                    </View>
                    <View
                        style={{
                            marginTop: 50
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#F0EBE3',
                                    fontWeight: 500
                                }}
                            >
                                Start Data:
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                    fontWeight: 500
                                }}
                            >
                                2024-09-25
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: "white",
    }
})