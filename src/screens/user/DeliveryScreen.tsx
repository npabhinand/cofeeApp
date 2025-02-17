/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { deliveryBoy, map, route } from '../../assets/images';
import { backIcon, deliveryIcon, driverIcon, gpsIcon, locationIcon, phoneIcon } from '../../assets/icons';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import { DeliveryData } from '../../constants/data/dataArray';


const DeliveryScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, paddingHorizontal: WIDTH * 0.05 }}>
            <Image source={map} style={{ position: 'absolute', alignSelf: 'center', flex: 1 }} />

            <View style={{ marginTop: HEIGHT * 0.075, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Pressable style={{ backgroundColor: colors.lightGray, width: WIDTH * 0.12, height: WIDTH * 0.12, alignItems: 'center', justifyContent: 'center', borderRadius: WIDTH * 0.03 }} onPress={() => navigation.goBack()}><Image source={backIcon} /></Pressable>
                <Pressable style={{ backgroundColor: colors.lightGray, width: WIDTH * 0.12, height: WIDTH * 0.12, alignItems: 'center', justifyContent: 'center', borderRadius: WIDTH * 0.03 }}><Image source={gpsIcon} /></Pressable>
            </View>

            <Image source={route} style={{ top: 165, left: WIDTH * 0.22, position: 'absolute' }} />
            <Image source={locationIcon} style={{ marginTop: 110, marginLeft: WIDTH * 0.15 }} />
            <Pressable style={{ marginLeft: WIDTH * 0.56, marginTop: HEIGHT * 0.1, backgroundColor: colors.commonWhite, width: WIDTH * 0.1, height: WIDTH * 0.1, borderRadius: '50%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={driverIcon} />
            </Pressable>



            {/* delivery Details */}
            <View style={{ position: 'absolute', bottom: 0, height: HEIGHT * 0.42, width: WIDTH * 1, backgroundColor: '#fff' }}>

                <View style={{ borderBottomColor: colors.lightGray, borderBottomWidth: 5, width: WIDTH * 0.12, marginTop: HEIGHT * 0.02, alignSelf: 'center', borderRadius: 20 }} />

                <Text style={{ textAlign: 'center', marginTop: HEIGHT * 0.02, fontWeight: '600', fontSize: 18 }}>10 minutes left</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: HEIGHT * 0.005 }}>
                    <Text style={{ color: colors.grayColor, fontSize: 12 }}>Delivery to </Text>
                    <Text style={{ fontSize: 12 }}>J1.kpg Sutoyo</Text>

                </View>
                {/*  line */}
                <View style={{ flexDirection: 'row', gap: WIDTH * 0.03, alignSelf: 'center' }}>
                    {[1, 2, 3, 4].map((item, index) => (
                        <View key={index} style={{ borderBottomColor: item === 4 ? colors.lightGray : colors.greenColor, borderBottomWidth: 4, width: WIDTH * 0.2, marginTop: HEIGHT * 0.03, alignSelf: 'center', borderRadius: 20 }} />
                    ))}
                </View>

                <View style={{ overflow: 'hidden', flexDirection: 'row', alignItems: 'center', width: 0.9 * WIDTH, alignSelf: 'center', borderWidth: 0.5, padding: 8, marginTop: HEIGHT * 0.02, gap: WIDTH * 0.04, borderColor: '#A2A2A2', borderRadius: 10 }}>
                    <View style={{ borderWidth: 0.4, height: WIDTH * 0.15, width: WIDTH * 0.15, borderColor: '#A2A2A2', borderRadius: 10 }}>
                        <Image source={deliveryIcon} style={{ height: WIDTH * 0.15, width: WIDTH * 0.15 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: HEIGHT * 0.005 }}>Delivered your order</Text>
                        <Text style={{ fontSize: 13, color: colors.grayColor, marginRight: WIDTH * 0.2, lineHeight: WIDTH * 0.05 }}>{DeliveryData.description}</Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', width: 0.9 * WIDTH, alignSelf: 'center', marginTop: HEIGHT * 0.02, borderRadius: 10, justifyContent: 'space-between' }}>
                    <Image source={deliveryBoy} style={{ height: WIDTH * 0.15, width: WIDTH * 0.15 }} />
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: HEIGHT * 0.005 }}>Delivered your order</Text>
                        <Text style={{ fontSize: 13, color: colors.grayColor, marginRight: WIDTH * 0.2 }}>Personal Courier</Text>
                    </View>
                    <View style={{ borderWidth: 0.4, height: WIDTH * 0.12, width: WIDTH * 0.12, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={phoneIcon} />
                    </View>
                </View>
            </View>
        </View >
    );
};


export default DeliveryScreen;
