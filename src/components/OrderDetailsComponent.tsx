/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import React from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import moment from 'moment';
import { orderDetailProps } from '../constants/types/commonTypes';

const OrderDetailsComponent: React.FC<orderDetailProps> = (props) => {
    const { item, handleModal } = props;
    const date = moment(item.orderTime).format('ddd,MM Do YY, h:mm:ss a');
    const orderArray = [
        { name: 'Track Order', value: item.id },
        { name: 'Order Price', value: `$${item.TotalPrice} ` },
        { name: 'Order Time', value: date },
    ];
    const addressDetails = [
        { label: 'Name', value: item.address[0].name },
        { label: 'UserId', value: item.address[0].userId },
        { label: 'Address', value: item.address[0].address },
        { label: 'Phone', value: item.address[0].phone },
    ];

    return (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <Pressable style={{ flex: 1 }} onPress={handleModal}>

                <View style={{ width: WIDTH * 1, alignSelf: 'center', marginTop: HEIGHT * 0.4, paddingBottom: HEIGHT * 0.05, backgroundColor: colors.commonWhite, paddingHorizontal: WIDTH * 0.05, borderTopLeftRadius: 50, borderTopRightRadius: 50, shadowColor: colors.commonBlack, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.39, shadowRadius: 8.30, elevation: 8 }}>
                    <View style={{ flexDirection: 'row', marginTop: HEIGHT * 0.03, alignItems: 'center', gap: WIDTH * 0.1, justifyContent: 'space-between' }}>

                        <Text style={{ fontWeight: '600', fontSize: 19, marginVertical: HEIGHT * 0.02, color: colors.grayColor }}>Delivery Address</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.grayColor }} onPress={handleModal}>X</Text>
                    </View>
                    {/*  */}
                    {addressDetails.map((detail, index) => (
                        <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: HEIGHT * 0.01 }} key={index}>
                            <Text style={{ color: colors.brownColor, fontSize: 16, fontWeight: '600', marginRight: 10, width: WIDTH * 0.3 }}>{detail.label}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: colors.commonBlack, width: WIDTH * 0.6 }}>{detail.value}</Text>
                        </View>))}
                    {item.products.map((product, index: number) => (
                        <View key={index} style={{ borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center', borderColor: colors.brownColor, paddingBottom: HEIGHT * 0.01, marginTop: HEIGHT * 0.02 }} >

                            <Image
                                source={{ uri: product.image }}
                                style={{ height: WIDTH * 0.2, width: WIDTH * 0.2, borderRadius: 12, marginRight: WIDTH * 0.05, backgroundColor: colors.lightGray }} />
                            <View style={{ flex: 1, justifyContent: 'space-between', marginVertical: HEIGHT * 0.02 }}>
                                <Text style={{ fontSize: HEIGHT * 0.022, fontWeight: 'bold', color: colors.commonBlack }}>{product.name}</Text>
                                <Text style={{ color: colors.brownColor, fontSize: HEIGHT * 0.02 }}>
                                    ${product.price}
                                </Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: HEIGHT * 0.01 }}>
                                    <Text style={{ color: colors.brownColor, fontWeight: '600', fontSize: HEIGHT * 0.018 }}>View Details</Text>
                                    <Text style={{ color: colors.grayColor, fontSize: HEIGHT * 0.018 }}>{product.quantity} items</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                    <Text style={{ fontWeight: '600', fontSize: 19, marginVertical: HEIGHT * 0.02, color: colors.grayColor }}>Payment Details</Text>

                    {orderArray.map((details, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: HEIGHT * 0.01 }}>
                            <Text style={{ color: colors.brownColor, fontSize: 16, fontWeight: '600', marginRight: 10, width: WIDTH * 0.3 }}>
                                {details.name}
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: colors.commonBlack, textAlign: 'left' }}>{details.value}</Text>
                        </View>
                    ))}

                </View>
                {/* <Pressable style={{ width: WIDTH * 0.9, height: HEIGHT * 0.06, backgroundColor: colors.brownColor, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', bottom: HEIGHT * 0.04, borderRadius: 10 }} onPress={() => setIsVisible(!isVisible)}><Text style={{ color: colors.commonWhite, fontSize: 15 }}>Hide Details</Text></Pressable> */}
            </Pressable>
        </ScrollView>
    );
};

export default OrderDetailsComponent;
