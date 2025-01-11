import { icons } from 'lucide-react-native';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

interface IconProps {
    name: string; // Accept name as a string
    color?: string;
    size?: number;
}

const DEFAULT_ICON = 'CircleAlert'; // Set the default icon name

const Icon: React.FC<IconProps> = ({ name, color = 'black', size }) => {
    // Type assertion to ensure the name is a valid key
    const LucideIcon = icons[name as keyof typeof icons] || icons[DEFAULT_ICON];

    return (
        <View>
            <LucideIcon color={color} size={size} />
        </View>
    );
};

export default Icon;