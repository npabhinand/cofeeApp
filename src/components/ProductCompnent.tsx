/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image } from 'react-native';
import React from 'react';
import { productItem } from '../constants/types/commonTypes';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';

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
    );
};
export default ProductComponent;
