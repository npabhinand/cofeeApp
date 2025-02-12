/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';

const YourOrderComponent = () => {
    return (
        <View style={{ padding: 10, width: WIDTH * 0.9, alignSelf: 'center', marginTop: HEIGHT * 0.01, gap: 5, backgroundColor: colors.commonWhite, borderRadius: 10 }}>
            {/* <Image source={coffee1} style={{ width: WIDTH * 0.2, height: HEIGHT * 0.1 }} /> */}
            <Text>coffee shops</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: colors.grayColor }}>addresss kazhakoottam, tvm</Text>
                <Text>Delivered</Text>
            </View>
            <Text style={{ color: colors.grayColor }}>₹100</Text>
            <View style={{ borderColor: colors.brownColor, borderWidth: 0.5 }} />
            <Text>Coffee Mocha(2)</Text>
            <Text>espresso(1)</Text>
        </View>
    );
};

export default YourOrderComponent;
