/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image } from 'react-native';
import React from 'react';

import { discountIcon, rightArrowIcon } from '../assets/icons';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';

const PaymentDetails = (props) => {
    const { totalPrice } = props;
    return (
        <View style={{marginBottom:HEIGHT*0.05}}>

            <View style={{ flexDirection: 'row', alignItems: 'center', height: HEIGHT * 0.07, width: WIDTH * 0.88, borderWidth: 1, borderRadius: WIDTH * 0.04, gap: WIDTH * 0.05, paddingHorizontal: WIDTH * 0.07, borderColor: '#F9F2ED', backgroundColor: colors.commonWhite }}>
                <Image source={discountIcon} />
                <Text>1 Discount is Applies</Text>
                <Image source={rightArrowIcon} style={{ position: 'absolute', right: WIDTH * 0.05 }} />
            </View>

            <Text style={{ marginVertical: HEIGHT * 0.02, fontWeight: '600', fontSize: HEIGHT * 0.02 }}>Payment Summary</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ gap: HEIGHT * 0.01 }}>
                    <Text>Price</Text>
                    <Text>Delivery Fee</Text>
                </View>
                <View style={{ gap: HEIGHT * 0.01 }}>
                    <Text style={{ fontWeight: '600', textAlign: 'right' }}>${totalPrice}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ textDecorationLine: 'line-through' }}>$2.0 </Text>
                        <Text style={{ fontWeight: '600' }}>$1.0</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PaymentDetails;
