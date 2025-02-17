/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Modal, Image } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import OrderDetailsComponent from './OrderDetailsComponent';
import { rightArrowIcon } from '../assets/icons';
import { addressProps, orderComponentProps } from '../constants/types/commonTypes';
import { useSelector } from 'react-redux';
import { selectedUserData } from '../redux/slice/userDataSlice';

const OrderDetailsRenderItem: React.FC<orderComponentProps> = (props) => {
    const { item, setLoading, showItem } = props;
    const userData = useSelector(selectedUserData);
    const { userType } = userData[0];

    const [isVisible, setIsVisible] = useState(false);

    const date = moment(item.orderTime).format('ddd,MM Do YY, h:mm:ss a');
    const handleModal = () => {
        setIsVisible(!isVisible);
    };

    const orderArray = [
        { name: 'Order Id', value: item.id, icon: <Pressable onPress={handleModal}><Image source={rightArrowIcon} tintColor={colors.brownColor} /></Pressable> },
        { name: 'order Time', value: date },
        { name: 'order Price', value: `₹${item.TotalPrice} ` },
        { name: 'profit', value: `₹${item.profit}` },
    ];
    const orderArrayWithoutProfit = [
        { name: 'Order Id', value: item.id, icon: <Pressable onPress={handleModal}><Image source={rightArrowIcon} tintColor={colors.brownColor} /></Pressable> },
        { name: 'order Time', value: date },
        { name: 'order Price', value: `₹${item.TotalPrice} ` },
        { name: 'status', value: item.status },
    ];

    return (
        <>
            {item ? (
                <Pressable style={{ backgroundColor: colors.commonWhite, width: WIDTH * 0.9, height: 120, alignSelf: 'center', padding: HEIGHT * 0.02, borderRadius: 12, marginBottom: HEIGHT * 0.02, shadowColor: colors.commonWhite, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5, marginVertical: HEIGHT * 0.01 }}>
                    {item.profit === undefined || showItem === 'price' ?
                        (
                            orderArrayWithoutProfit.map((details, index) => (
                                <OrderDetails details={details} key={index} />
                            ))
                        ) :
                        (
                            orderArray.map((details, index) => (
                                <OrderDetails details={details} key={index} />
                            ))
                        )
                    }

                    {/* Modal */}
                    <Modal visible={isVisible} animationType="slide" transparent={true}>
                        {/* <View style={{ flex: 1 }}> */}
                        <OrderDetailsComponent item={item} handleModal={handleModal} marginTop={HEIGHT * 0.4} userType={userType} setLoading={setLoading} />
                        {/* </View> */}
                    </Modal>
                </Pressable>
                // { }
            ) : <View>
                <Text style={{ marginTop: HEIGHT * 0.5 }}>No Orders</Text>
            </View>
            }
        </>
    );
};

export default OrderDetailsRenderItem;



const OrderDetails: React.FC<addressProps> = (props) => {
    const { details } = props;
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: WIDTH * 0.01, marginBottom: HEIGHT * 0.005 }}>
            <Text style={{ color: colors.brownColor, fontSize: 16, fontWeight: '600', marginRight: 10, width: WIDTH * 0.25, textTransform: 'capitalize' }}>
                {details.name}
            </Text>
            <Text style={{ fontSize: 15, color: colors.grayColor, marginRight: 10 }}>{details.value}</Text>
            {details.icon}
        </View>
    );
};

