/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Modal, Image } from 'react-native';
import React, { useState } from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import moment from 'moment';
import OrderDetailsComponent from './OrderDetailsComponent';
import { rightArrowIcon } from '../assets/icons';
import { orderDetailProps } from '../constants/types/commonTypes';

const OrderDetailsRenderItem: React.FC<orderDetailProps> = (props) => {
    const { item } = props;
    // const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(false);
    const date = moment(item.orderTime).format('ddd,MM Do YY, h:mm:ss a');
    const handleModal = () => {
        setIsVisible(!isVisible);
    };

    const orderArray = [
        { name: 'track Order', value: item.id, icon: <Pressable onPress={handleModal}><Image source={rightArrowIcon} tintColor={colors.brownColor} /></Pressable> },
        { name: 'order Price', value: `₹${item.TotalPrice} ` },
        { name: 'order Time', value: date },
        { name: 'profit', value: `₹${item.profit}` },
    ];
    return (
        <Pressable style={{ backgroundColor: colors.commonWhite, width: WIDTH * 0.9, height: 120, alignSelf: 'center', padding: HEIGHT * 0.01, borderRadius: 12, marginBottom: HEIGHT * 0.02, shadowColor: colors.commonWhite, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 }}>
            {orderArray.map((details, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: WIDTH * 0.01, marginBottom: HEIGHT * 0.01 }}>
                    <Text style={{ color: colors.brownColor, fontSize: 16, fontWeight: '600', marginRight: 10, width: WIDTH * 0.25, textTransform: 'capitalize' }}>
                        {details.name}
                    </Text>
                    <Text style={{ fontSize: 15, color: colors.grayColor, marginRight: 10 }}>{details.value}</Text>
                    {details.icon}

                </View>
            ))}

            {/* Modal */}
            <Modal visible={isVisible} animationType="slide" transparent={true}>
                <OrderDetailsComponent item={item} handleModal={handleModal} />
            </Modal>
        </Pressable >

    );
};

export default OrderDetailsRenderItem;
