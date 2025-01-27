/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { minusIcon, plusIcon } from '../assets/icons';

interface CartProps {
    item: {
        id: number;
        name: string;
        coffeeType: string;
        description: string;
        type: { size: string; price: number; }[],
        rating: number;
        img: number;
        quantity: number;
    }
}
const OrderComponent: React.FC<CartProps> = (props) => {
    const { item } = props;
    const [counter, setCounter] = useState<number>(1);
    const handleIncrease = () => {
        setCounter(counter + 1);
    };

    const handleDecrease = () => {
        if (counter > 1) {
            setCounter(counter + 1);
        }
    };
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.04 }}>
                <Image source={item.img} style={{ height: WIDTH * 0.15, width: WIDTH * 0.15, borderRadius: WIDTH * 0.02 }} />
                <View style={{ width: WIDTH * 0.4 }}>
                    <Text>{item.name}</Text>
                    <Text style={{ marginTop: HEIGHT * 0.005, color: colors.grayColor }}>{item.coffeeType}</Text>
                </View>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.04, position: 'absolute' }} > */}
                <Pressable style={{ width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: '50%', backgroundColor: colors.commonWhite, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => handleIncrease}><Image source={minusIcon} /></Pressable>
                <Text>{counter}</Text>
                <Pressable style={{ width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: '50%', backgroundColor: colors.commonWhite, alignItems: 'center', justifyContent: 'center' }}
                    onPress={handleDecrease}>
                    <Image source={plusIcon} style={{ tintColor: colors.commonBlack }} />
                </Pressable>
                {/* </View> */}
            </View>
            <View
                style={{
                    borderBottomColor: `${colors.brownColor}15`,
                    borderBottomWidth: 5,
                    width: WIDTH * 1.0,
                    marginVertical: HEIGHT * 0.02,
                    alignSelf: 'center',
                    // marginHorizontal: WIDTH * 0.05,
                }}
            />
        </>
    );
};

export default OrderComponent;
