/* eslint-disable react-native/no-inline-styles */
import { View, Text, ScrollView, FlatList, Alert } from 'react-native';
import React from 'react';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { detailProps, orderComponentProps } from '../constants/types/commonTypes';
import ProductComponent from './ProductCompnent';
import HandleOrderButtons from './HandleOrderButtons';


const OrderDetailsComponent: React.FC<orderComponentProps> = (props) => {
    const { handleModal, marginTop, item, setLoading } = props;
    const { name, userId, address, phone } = item.address;

    const date = moment(item.orderTime).format('ddd,MM Do YY, h:mm:ss a');

    const orderDetails = [
        { label: 'Order Id', value: item.id },
        { label: 'Order Price', value: `$${item.totalPrice} ` },
        { label: 'Order Time', value: date },
        { label: 'Status', value: item.status },
    ];
    const addressDetails = [
        { label: 'Name', value: name },
        { label: 'orderType', value: item.orderType },
        { label: 'UserId', value: userId },
        { label: 'Address', value: address },
        { label: 'Phone', value: phone },
    ];

    const handleCancelAlert = () => {
        Alert.alert('Are You sure want to cancel order', '', [
            {
                text: 'Back',
                onPress: () => { handleModal; },
                style: 'cancel',
            },
            {
                text: 'Cancel',
                onPress: () => { handleCancelOrder(); handleModal; },

            },
        ]);
    };

    const handleAcceptAlert = () => {
        Alert.alert('Are You sure want to accept order', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Accept',
                // onPress: () => dispatch(deleteContact(item.id))
                onPress: () => handleAcceptOrder(),

            },
        ]);
    };

    const handleCancelOrder = async () => {

        try {
            setLoading(true);
            await firestore().collection('orders').doc(item.id).update({
                status: 'cancelled',
            });
            setLoading(false);
        } catch (error) {
            console.log('error while loading data', error);
            setLoading(false);
        }
    };

    const handleAcceptOrder = async () => {

        try {
            setLoading(true);
            await firestore().collection('orders').doc(item.id).update({
                status: 'delivered',
            });
            setLoading(false);
        } catch (error) {
            console.log('error while updating data', error);
            setLoading(false);
        }
    };

    return (

        <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{ marginTop: marginTop, backgroundColor: colors.commonWhite, borderTopLeftRadius: 50, borderTopRightRadius: 50, paddingBottom: HEIGHT * 0.2 }}>
            <View style={{ alignSelf: 'center', width: WIDTH, paddingHorizontal: WIDTH * 0.05 }}>
                <View style={{ flexDirection: 'row', marginTop: HEIGHT * 0.03, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: '600', fontSize: 19, marginVertical: HEIGHT * 0.02, color: colors.grayColor }}>Delivery Address</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.grayColor }} onPress={handleModal}>X</Text>
                </View>

                {addressDetails.map((detail, index) => (
                    <AddressDetailComponent key={index} detail={detail} />
                ))}

                <FlatList
                    data={item.products}
                    scrollEnabled={false}
                    keyExtractor={(product, index) => index.toString()}
                    renderItem={product => (
                        <ProductComponent product={product} />
                    )}
                />

                <Text style={{ fontWeight: '600', fontSize: 19, marginVertical: HEIGHT * 0.02, color: colors.grayColor }}>Payment Details</Text>

                {orderDetails.map((detail, index) => (
                    <OrderDetails key={index} detail={detail} />
                ))}

                <HandleOrderButtons onPress1={handleCancelAlert} onPress2={handleAcceptAlert} text1={'Cancel Order'} text2={'Accept Order'} />
            </View>
        </ScrollView>

    );
};

export default OrderDetailsComponent;


const AddressDetailComponent: React.FC<detailProps> = (props) => {
    const { detail } = props;
    return (
        <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: HEIGHT * 0.01 }} >
            <Text style={{ color: colors.brownColor, fontSize: 16, fontWeight: '600', marginRight: 10, width: WIDTH * 0.3 }}>{detail?.label}</Text>
            <Text style={{ fontSize: 15, fontWeight: '500', color: colors.commonBlack, width: WIDTH * 0.6 }}>{detail?.value}</Text>
        </View>
    );
};

const OrderDetails: React.FC<detailProps> = (props) => {
    const { detail } = props;
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: HEIGHT * 0.01 }}>
            <Text style={{ color: colors.brownColor, fontSize: 16, fontWeight: '600', marginRight: 10, width: WIDTH * 0.3 }}>
                {detail.label}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '500', color: colors.commonBlack, textAlign: 'left' }}>{detail.value}</Text>
        </View>
    );
};





