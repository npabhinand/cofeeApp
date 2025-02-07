/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const OrderDetailsRenderItem = (props) => {
    const { item } = props;
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(false);
    const date = moment(item.orderTime).format("ddd,MM Do YY, h:mm:ss a");
    const orderArray = [
        { name: 'orderId', value: item.id },
        { name: 'Order Price', value: `$${item.TotalPrice} ` },
        { name: 'Order Time', value: date },
    ];
    const addressDetails = [
        { label: 'name', value: item.address[0].name },
        { label: 'userId', value: item.address[0].userId },
        { label: 'address', value: item.address[0].address },
        { label: 'phone', value: item.address[0].phone },
    ];

    return (
        <Pressable style={{ backgroundColor: colors.commonWhite, width: WIDTH * 0.9, alignSelf: 'center', padding: 15, borderRadius: 12, marginBottom: HEIGHT * 0.02, shadowColor: colors.commonWhite, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 }}>
            <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 19, marginBottom: HEIGHT * 0.01, color: colors.grayColor }}>Order Details</Text>
            {orderArray.map((details, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: WIDTH * 0.02, marginBottom: HEIGHT * 0.015 }}>
                    <Text style={{ color: colors.brownColor, fontSize: 16, fontWeight: '600', marginRight: 10, width: WIDTH * 0.3, }}>
                        {details.name}
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '500', color: colors.commonBlack }}>{details.value}</Text>
                </View>
            ))}
            {/*  */}
            <Text style={{ textAlign: 'center', fontWeight: '600', color: colors.brownColor }} onPress={() => setIsVisible(!isVisible)}>Show Order Details</Text>

            {/*  */}
            <Modal visible={isVisible}>
                <View style={{ width: WIDTH * 0.9, alignSelf: 'center', marginTop: HEIGHT * 0.05 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.03, marginVertical: HEIGHT * 0.02 }}>Order Details</Text>
                    {/* {orderArray.map((details, index) => ( */}
                    {/* <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: WIDTH * 0.02, marginBottom: HEIGHT * 0.015 }}>
                            <Text style={{ color: colors.brownColor, fontSize: 16, fontWeight: '600', marginRight: 10, width: WIDTH * 0.3, }}>
                                {details.name}
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: colors.commonBlack }}>{details.value}</Text>
                        </View> */}
                    <Text style={{ marginTop: HEIGHT * 0.01, fontSize: 18, fontWeight: '600', marginBottom: HEIGHT * 0.01 }}>Delivery Address</Text>
                    {/*  */}
                    {addressDetails.map((detail, index) => (
                        <View style={{ flexDirection: 'row', rowGap: HEIGHT * 0.01 }} key={index}>
                            <Text style={{ color: colors.brownColor, fontSize: 16, fontWeight: '600', marginRight: 10, width: WIDTH * 0.3 }}>{detail.label}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: colors.commonBlack, width: WIDTH * 0.6, }}>{detail.value}</Text>
                        </View>))}
                    {/*  */}


                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ marginRight: WIDTH * 0.1, gap: HEIGHT * 0.01 }}>
                            <Text style={{ color: colors.brownColor }}>Order Id</Text>
                            <Text style={{ color: colors.brownColor }}>Order price</Text>
                            <Text style={{ color: colors.brownColor }}>Order Time</Text>
                        </View>
                        <View style={{ marginRight: WIDTH * 0.1, gap: HEIGHT * 0.01 }}>
                            <Text>{item.id}</Text>
                            <Text>${item.TotalPrice}</Text>
                            <Text>{date}</Text>
                        </View>
                    </View> */}
                    {/* ))} */}
                    {item.products.map((product, index: number) => (
                        <View key={index} style={{ borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', borderColor: colors.brownColor, paddingBottom: HEIGHT * 0.015, marginTop: HEIGHT * 0.02 }}>

                            <Image
                                source={{ uri: product.image }}
                                style={{ height: WIDTH * 0.28, width: WIDTH * 0.28, borderRadius: 12, marginRight: WIDTH * 0.05, backgroundColor: colors.lightGray }} />
                            <View style={{ flex: 1, justifyContent: 'space-between', gap: HEIGHT * 0.01, marginVertical: HEIGHT * 0.02 }}>
                                <Text style={{ fontSize: HEIGHT * 0.022, fontWeight: 'bold', color: colors.commonBlack }}>{product.name}</Text>
                                <Text style={{ color: colors.brownColor, fontSize: HEIGHT * 0.02 }}>
                                    ${product.type.price}
                                </Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: HEIGHT * 0.01 }}>
                                    <Text style={{ color: colors.brownColor, fontWeight: '600', fontSize: HEIGHT * 0.018, }} onPress={() => navigation.navigate('')}>View Details</Text>
                                    <Text style={{ color: colors.grayColor, fontSize: HEIGHT * 0.018 }}>{product.quantity} items</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                    <Text style={{ fontWeight: '600', fontSize: 19, marginVertical: HEIGHT * 0.02, color: colors.grayColor }}>Payment Details</Text>

                    {orderArray.map((details, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: HEIGHT * 0.01 }}>
                            <Text style={{ color: colors.brownColor, fontSize: 16, fontWeight: '600', marginRight: 10, width: WIDTH * 0.3, }}>
                                {details.name}
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: colors.commonBlack, textAlign: 'left' }}>{details.value}</Text>
                        </View>
                    ))}
                </View>
                <Pressable style={{ width: WIDTH * 0.9, height: HEIGHT * 0.06, backgroundColor: colors.brownColor, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: HEIGHT * 0.04, borderRadius: 10 }} onPress={() => setIsVisible(!isVisible)}><Text style={{ color: colors.commonWhite, fontSize: 15 }}>Hide Details</Text></Pressable>
            </Modal>
        </Pressable >

    );
};

export default OrderDetailsRenderItem;
