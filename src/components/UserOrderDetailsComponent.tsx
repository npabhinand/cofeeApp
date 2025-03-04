/* eslint-disable react-native/no-inline-styles */
import { View, Text, ScrollView, FlatList, Alert, Image } from 'react-native';
import React from 'react';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { detailProps, orderComponentProps, productItem } from '../constants/types/commonTypes';
import HandleOrderButtons from './HandleOrderButtons';


const UserOrderDetailsComponent: React.FC<orderComponentProps> = (props) => {
    const { handleModal, item, userType, marginTop, setLoading } = props;
    
    const date = moment(item.orderTime).format('ddd,MM Do YY, h:mm:ss a');

    const orderDetails = [
        { label: 'Order Id', value: item.id },
        { label: 'Order Price', value: `$${item.totalPrice} ` },
        { label: 'Order Time', value: date },
        {label:'orderType', value:item.orderType}
       
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

        <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{ marginTop: marginTop, borderTopLeftRadius: 50, borderTopRightRadius: 50, width: WIDTH * 0.9, alignSelf: 'center' }}>
            <View style={{ alignSelf: 'center', width: WIDTH, paddingHorizontal: WIDTH * 0.05, justifyContent: 'center', backgroundColor: colors.commonWhite, paddingBottom: HEIGHT * 0.03, borderRadius: 20 }}>
                <View style={{ flexDirection: 'row', marginTop: HEIGHT * 0.03, alignItems: 'center', justifyContent: 'space-between', marginBottom: HEIGHT * 0.01 }}>

                    <Text style={{ fontWeight: '600', fontSize: 19, color: colors.grayColor }}>Order No - {item.id}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.grayColor }} onPress={handleModal}>X</Text>

                </View>
                <Text style={{ color: colors.brownColor, textAlign:'center', fontSize: 18, fontWeight: '600' }}>{item.status}</Text>


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
                {userType === 'admin' && item.status === 'processing' ?
                    <HandleOrderButtons onPress1={handleCancelAlert} onPress2={handleAcceptAlert} text1={'Cancel Order'} text2={'Accept Order'} /> : null}
            </View>
        </ScrollView>

    );
};

export default UserOrderDetailsComponent;


const ProductComponent: React.FC<productItem> = (props) => {
    const { product } = props;
    return (
        <View style={{ borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center', borderColor: colors.brownColor, paddingBottom: HEIGHT * 0.01, marginTop: HEIGHT * 0.02, paddingHorizontal: WIDTH * 0.02 }} >

            <Image
                source={{ uri: product.item.image }}
                style={{ height: WIDTH * 0.18, width: WIDTH * 0.2, borderRadius: 12, marginRight: WIDTH * 0.05, backgroundColor: colors.lightGray }} />
            <View style={{ flex: 1, justifyContent: 'space-between', marginVertical: HEIGHT * 0.02 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.commonBlack, textTransform: 'capitalize' }}>{product.item.name}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: HEIGHT * 0.01 }}>
                    <Text style={{ color: colors.brownColor, fontSize: HEIGHT * 0.02 }}>
                        ${product.item.price}
                    </Text>
                    {/* <Text style={{ color: colors.brownColor, fontWeight: '600', fontSize: HEIGHT * 0.018 }}>View Details</Text> */}
                    <Text style={{ color: colors.grayColor, fontSize: HEIGHT * 0.018 }}>{product.item.quantity} items</Text>
                </View>
            </View>
        </View>
    )
}

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





