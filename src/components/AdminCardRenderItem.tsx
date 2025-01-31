/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

interface cardProps {
    item: {
        id: number,
        title: string,
        icon: number,
        count: number,
        navigate: string
    }

}
const AdminCardRenderItem: React.FC<cardProps> = (props) => {
    const { item } = props;
    const navigation = useNavigation();

    return (
        <Pressable style={{ width: WIDTH * 0.45, height: HEIGHT * 0.2, backgroundColor: colors.commonWhite, borderRadius: 10, padding: HEIGHT * 0.02, margin: WIDTH * 0.02, shadowColor: colors.commonBlack, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 }} onPress={() => navigation.navigate(item.navigate)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text>{item.title}</Text>
                <View style={{ backgroundColor: `${colors.brownColor}30`, width: WIDTH * 0.09, height: WIDTH * 0.09, alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                    <Image source={item.icon} tintColor={colors.brownColor} />
                </View>
            </View>
            <Text style={{ fontSize: 20, fontWeight: '600', marginTop: HEIGHT * 0.05 }}>{item.count}</Text>
        </Pressable>
    );
};

export default AdminCardRenderItem;
