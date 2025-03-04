/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { RootStackParamList } from '../routes/AppNavigator';

interface cardProps {
    item: {
        id: number,
        title: string,
        count?: number,
        navigate: string
    }
}
const AdminCardRenderItem: React.FC<cardProps> = (props) => {
    const { item } = props;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    return (
        <Pressable style={{ width: WIDTH * 0.42, height: 150, backgroundColor: `${colors.brownColor}30`, borderRadius: 10, 
        padding: HEIGHT * 0.02, marginBottom: HEIGHT * 0.02,shadowColor: colors.commonBlack, 
        shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3, 
        borderColor: colors.brownColor, borderWidth: 0.5, marginLeft: WIDTH * 0.05 }} 
        onPress={() => navigation.navigate(item.navigate)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
                {/* <View style={{ backgroundColor: `${colors.brownColor}30`, width: WIDTH * 0.15, height: WIDTH * 0.15, alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                    <Image source={item.icon} tintColor={colors.brownColor} style={{ width: WIDTH * 0.09, height: WIDTH * 0.09 }} />
                </View> */}
            </View>
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.grayColor, position: 'absolute', bottom: WIDTH * 0.05, left: WIDTH * 0.05 }}>{item.count}</Text>
        </Pressable>
    );
};

export default AdminCardRenderItem;
