/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Modal, Image } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import OrderDetailsComponent from './OrderDetailsComponent';
import { rightArrowIcon } from '../assets/icons';
import { addressProps, orderComponentProps } from '../constants/types/commonTypes';


const OrderDetailsRenderItem: React.FC<orderComponentProps> = (props) => {
    const { item, setLoading,loading, showItem } = props;

    const [isVisible, setIsVisible] = useState(false);
    const date = moment(item.orderTime).format('ddd, MM Do YY, h:mm:ss a');

    const handleModal = () => {
        setIsVisible(!isVisible);
    };

    const orderArray = [
        { name: 'Order Id', value: item.id, icon: <Pressable onPress={handleModal}><Image source={rightArrowIcon} tintColor={colors.brownColor} /></Pressable> },
        { name: 'Order Time', value: date },
        { name: 'Order Price', value: `₹${item.totalPrice}` },
        { name: 'Profit', value: `₹${item.profit}` },
    ];

    const orderArrayWithoutProfit = [
        { name: 'Order Id', value: item.id, icon: <Pressable onPress={handleModal}><Image source={rightArrowIcon} tintColor={colors.brownColor} /></Pressable> },
        { name: 'Order Time', value: date },
        { name: 'Order Price', value: `₹${item.totalPrice}` },
        { name: 'Status', value: item.status },
    ];

    const orderArrayWithoutPrice = [
        { name: 'Order Id', value: item.id, icon: <Pressable onPress={handleModal}><Image source={rightArrowIcon} tintColor={colors.brownColor} /></Pressable> },
        { name: 'Order Time', value: date },
        { name: 'Profit', value: `₹${item.profit}` },
        { name: 'Status', value: item.status },
    ];

    const renderOrderDetails = (orders) => (
        orders.map((details, index) => (
            <OrderDetails details={details} key={index} />
        ))
    );

    return (
        <>
            {item ? (
                <Pressable style={{ backgroundColor: colors.commonWhite, width: WIDTH * 0.9, height: 120, alignSelf: 'center', padding: HEIGHT * 0.02, borderRadius: 12, marginBottom: HEIGHT * 0.02, shadowColor: colors.commonWhite, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5, marginVertical: HEIGHT * 0.01 }}>
                    {item.profit === undefined || showItem === 'price' ?
                        renderOrderDetails(orderArrayWithoutProfit) :
                        showItem === 'profit' ?
                            renderOrderDetails(orderArrayWithoutPrice) :
                            renderOrderDetails(orderArray)
                    }

                    <Modal visible={isVisible} animationType="slide" transparent={true}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                            <OrderDetailsComponent item={item} handleModal={handleModal} marginTop={HEIGHT * 0.3} setLoading={setLoading} loading={loading}/>
                        </View>
                    </Modal>
                </Pressable>
            ) : (
                <View>
                    <Text style={{ marginTop: HEIGHT * 0.5 }}>No Orders</Text>
                </View>
            )}
        </>
    );
};

export default OrderDetailsRenderItem;



const OrderDetails: React.FC<addressProps> = ({ details }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: WIDTH * 0.01, marginBottom: HEIGHT * 0.005 }}>
        <Text style={{ color: colors.brownColor, fontSize: 16, fontWeight: '600', marginRight: 10, width: WIDTH * 0.25, textTransform: 'capitalize' }}>
            {details.name}
        </Text>
        <Text style={{ fontSize: 15, color: colors.grayColor, marginRight: 10 }}>{details.value}</Text>
        {details.icon}
    </View>
);

