/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image } from 'react-native';
import React from 'react';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { banner } from '../assets/images';
import { colors } from '../constants/colors';

const PromoComponent = () => {
    return (
        <View style={{ backgroundColor: colors.promoBackground, height: HEIGHT * 0.18, width: WIDTH * 0.9, marginLeft: WIDTH * 0.05, borderRadius: WIDTH * 0.05, overflow: 'hidden' }}>
            <Image source={banner} style={{ position: 'absolute', width: '100%', top: HEIGHT * 0.01 }} />
            <View style={{ marginTop: HEIGHT * 0.015, marginLeft: WIDTH * 0.07 }}>
                <View style={{ backgroundColor: colors.redButtonColor, width: WIDTH * 0.18, height: HEIGHT * 0.04, marginBottom: HEIGHT * 0.01, alignItems: 'center', borderRadius: WIDTH * 0.02, justifyContent: 'center' }}>
                    <Text style={{ color: colors.commonWhite, fontWeight: 'bold', fontSize: HEIGHT * 0.02 }}>Promo</Text>
                </View>
                <View style={{ backgroundColor: colors.commonBlack, marginVertical: HEIGHT * 0.017, paddingLeft: WIDTH * 0.005, width: WIDTH * 0.52 }}>
                    <Text style={{ fontSize: HEIGHT * 0.042, color: '#fff', fontWeight: 'bold', marginTop: -HEIGHT * 0.018 }}>Buy one get </Text>
                </View>
                <View style={{ backgroundColor: colors.commonBlack, width: WIDTH * 0.39, height: HEIGHT * 0.03, paddingLeft: WIDTH * 0.005 }}>
                    <Text style={{ fontSize: HEIGHT * 0.042, color: '#fff', fontWeight: 'bold', marginTop: -HEIGHT * 0.018 }}>one FREE</Text>
                </View>
            </View>

        </View>
    );
};

export default PromoComponent;
