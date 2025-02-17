/* eslint-disable react-native/no-inline-styles */
import { View, Text, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { orderDetailProps, products } from '../constants/types/commonTypes';
import HandleOrderButtons from './HandleOrderButtons';
import UserOrderDetailsComponent from './UserOrderDetailsComponent';

const MyOrderComponent: React.FC<orderDetailProps> = (props) => {
    const { item, setUpdate, onNavigation } = props;

    const [isVisible, setIsVisible] = useState(false);
    const handleModal = () => {
        setIsVisible(!isVisible);
    };

    const handleCancelAlert = () => {
        Alert.alert('Are You sure want to cancel order', '', [
            {
                text: 'Back',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Cancel',
                // onPress: () => dispatch(deleteContact(item.id))
                onPress: () => handleOrderStatus(),

            },
        ]);
    };

    const handleOrderStatus = async () => {
        setUpdate(true);
        await firestore().collection('orders').doc(item.id).update({
            status: 'cancelled',
        });
    };

    return (
        <View style={{ padding: HEIGHT * 0.025, width: WIDTH * 0.9, alignSelf: 'center', marginBottom: HEIGHT * 0.02, gap: 5, backgroundColor: colors.commonWhite, borderRadius: 10 }}>
            {/* <Image source={coffee1} style={{ width: WIDTH * 0.2, height: HEIGHT * 0.1 }} /> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ textTransform: 'capitalize', fontWeight: '600', fontSize: 18 }}>coffee shop</Text>
                <Text style={{ color: colors.grayColor }}>{item.status}</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {item.products.map((product, index) => (
                    <ProductName product={product} key={index} />
                ))}
            </View>

            {item.status === 'processing' ?
                <HandleOrderButtons onPress1={handleCancelAlert} onPress2={onNavigation} text1={'Cancel Order'} text2={'Track'} /> :
                <HandleOrderButtons onPress1={handleModal} onPress2={handleModal} text1={'Discard'} text2={'View Details'} />
            }
            <Modal visible={isVisible} animationType="slide" transparent={true}>
                <View style={{
                    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100,
                }}>
                    <UserOrderDetailsComponent item={item} handleModal={handleModal} marginTop={HEIGHT * 0.16} />
                </View>
            </Modal>
        </View>
    );
};

export default MyOrderComponent;

const ProductName: React.FC<products> = (props) => {
    const { product } = props;
    return (
        <>
            <Text style={{ color: colors.grayColor }}>{product.name}</Text>
            <Text style={{ color: colors.grayColor }}>({product.quantity}), </Text>
        </>
    );
};
