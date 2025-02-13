/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable } from 'react-native';
import React, { useState } from 'react';

import HeaderComponent from '../../components/HeaderComponent';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { colors } from '../../constants/colors';

const Orders = () => {
    const [isSelected, setIsSelected] = useState<number>(1);
    const buttonNames = [
        { id: 1, name: 'New Orders', },
        { id: 2, name: 'Delivered' },
        { id: 3, name: 'Cancelled' }
    ]
    return (
        <SafeAreaView>
            <HeaderComponent header={'Orders'} />

            <View style={{ paddingHorizontal: WIDTH * 0.05 }}>
                <View style={{ flexDirection: 'row' }}>
                    {buttonNames.map((button) => (
                        <Pressable key={button.id} onPress={() => setIsSelected(button.id)}
                            style={[{ width: WIDTH * 0.3, height: HEIGHT * 0.056, alignItems: 'center', justifyContent: 'center' },
                            isSelected === button.id && { backgroundColor: colors.brownColor },
                            ]}><Text style={[isSelected === button.id && { color: colors.commonWhite }]}>{button.name}</Text></Pressable>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Orders;
