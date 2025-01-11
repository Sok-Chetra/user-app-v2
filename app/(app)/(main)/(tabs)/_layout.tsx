import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Ionicons, FontAwesome6, Octicons, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const path = usePathname()

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarHideOnKeyboard: true,
                tabBarLabel: ({ focused, children, position, color }) =>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: '500',
                            color: focused ? '#217af7' : color
                        }}
                    >
                        {children}
                    </Text>
                ,

            }}>

            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) =>
                        <Ionicons size={28}
                            name={focused ? "home" : "home-outline"}
                            color={focused ? '#217af7' : color}
                        />,
                }}
            />
            <Tabs.Screen
                name="chats"
                options={{
                    title: 'Chats',
                    tabBarIcon: ({ color, focused }) => {
                        return (
                            <Ionicons
                                size={28}
                                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                                color={focused ? '#217af7' : color}
                            />
                        )
                    },
                    // tabBarStyle: {
                    //     height: path.startsWith('/chats/detail') ? 0 : 60
                    // }
                }}
            />
            <Tabs.Screen
                name="projects"
                options={{
                    title: 'Projects',
                    tabBarIcon: ({ color, focused }) => {
                        return (
                            <>
                                {focused ?
                                    <Entypo
                                        size={27}
                                        name={"archive"}
                                        color={focused ? '#217af7' : color}
                                    />
                                    :
                                    <Octicons
                                        size={24}
                                        name={"archive"}
                                        color={focused ? '#217af7' : color}
                                    />
                                }
                            </>
                        )
                    },
                    // tabBarStyle: {
                    //     transform: [{ translateY: path.startsWith('/projects/detail') ? 900 : 0 }]
                    // }
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) =>
                        <FontAwesome
                            size={focused ? 28 : 25}
                            name={focused ? "user" : "user-o"}
                            color={focused ? '#217af7' : color}
                        />,

                }}
            />
        </Tabs>
    );
}
