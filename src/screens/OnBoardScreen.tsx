/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { background1 } from '../assets/images';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { useNavigation } from '@react-navigation/native';
import { onBoardScreenData } from '../constants/data/dataArray';
import { colors } from '../constants/colors';

const OnBoardScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: colors.commonBlack }}>
            <Image source={background1} style={{ width: WIDTH * 1.00, position: 'absolute' }} />

            <View style={{ marginTop: HEIGHT * 0.56, backgroundColor: `${colors.commonBlack}50` }}>

                <Text style={{ paddingHorizontal: WIDTH * 0.11, lineHeight: HEIGHT * 0.06, color: colors.commonWhite, fontSize: HEIGHT * 0.04, textAlign: 'center', fontWeight: 'bold' }}>{onBoardScreenData.title}</Text>
                <Text style={{ marginTop: HEIGHT * 0.02, color: colors.grayColor, textAlign: 'center', fontSize: HEIGHT * 0.02, paddingHorizontal: WIDTH * 0.08 }}>{onBoardScreenData.description}</Text>
                {/* </Image> */}
            </View>

            <Pressable onPress={() => navigation.navigate('HomeTabs')} style={{ position: 'absolute', bottom: HEIGHT * 0.06, alignSelf: 'center', width: WIDTH * 0.9, backgroundColor: colors.brownColor, height: HEIGHT * 0.07, alignItems: 'center', justifyContent: 'center', borderRadius: HEIGHT * 0.02, zIndex: 1 }}>
                <Text style={{ color: colors.commonWhite, fontWeight: 'bold' }}>Get Started</Text>
            </Pressable>
        </View>
    );
};

export default OnBoardScreen;
