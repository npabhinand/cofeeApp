/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Modal } from 'react-native';
import React, { useState } from 'react';
// import firestore from '@react-native-firebase/firestore';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
// import { backIcon, plusIcon } from '../assets/icons';
import { StockProps } from '../constants/types/commonTypes';
import AddStockComponent from './AddStockComponent';

const StockRenderItem: React.FC<StockProps> = (props) => {
    const { item, setLoading, loading } = props;
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <View style={{ width: WIDTH * 0.9, height: WIDTH * 0.25, backgroundColor: colors.commonWhite, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', borderRadius: 10, paddingHorizontal: WIDTH * 0.03, marginTop: HEIGHT * 0.015, gap: WIDTH * 0.05 }}>
                <Image source={{ uri: item.image }} style={{ width: WIDTH * 0.2, height: WIDTH * 0.2, borderRadius: 10 }} />

                <View>
                    <Text style={{ fontWeight: 'bold' }}>Product</Text>
                    <Text style={{ color: colors.grayColor }}>{item.product}</Text>
                </View>
                <View>
                    <Text>Stock</Text>
                    <Text style={{ color: colors.grayColor }}>{item.stock}</Text>
                </View>
                <Text style={{ color: colors.brownColor, fontSize: 15, position: 'absolute', bottom: 10, left: WIDTH * 0.4 }} onPress={() => setIsVisible(!isVisible)}>View Details</Text>

            </View>
            {/* Modal */}
            <Modal visible={isVisible} animationType="slide">
                <AddStockComponent item={item} setLoading={setLoading} loading={loading} edit={true} setIsVisible={setIsVisible} isVisible={isVisible} />
            </Modal>
        </>

    );
};

export default StockRenderItem;
