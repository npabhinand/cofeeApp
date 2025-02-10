/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { minusIcon, plusIcon } from '../assets/icons';
// import { coffeeImageArray } from '../constants/data/dataArray';
import firestore from '@react-native-firebase/firestore';
import { CartProps } from '../constants/types/commonTypes';
import { useDispatch, useSelector } from 'react-redux';
import { selectedPrice, updateAddTotalPrice, updateSubTotalPrice } from '../redux/slice/priceTotalSlice';

const OrderComponent: React.FC<CartProps> = (props) => {
    const { item } = props;
    const dispatch = useDispatch();
    const [counter, setCounter] = useState<number>(item.quantity);
    const totalPrice = useSelector(selectedPrice);
    console.log('counter update', totalPrice);


    // const handleIncrease = useCallback(() => {
    //     setCounter((prevCounter: number) => {
    //         const newCounter = prevCounter + 1;
    //         dispatch(updateQuantity({ id: item.id, quantity: newCounter }));
    //         return newCounter;
    //     });
    // }, [dispatch, item.id]);

    // const handleDecrease = useCallback(() => {
    //     setCounter((prevCounter: number) => {
    //         if (prevCounter > 1) {
    //             const newCounter = prevCounter - 1;
    //             dispatch(updateQuantity({ id: item.id, quantity: newCounter }));
    //             return newCounter;
    //         }
    //         return prevCounter;
    //     });
    // }, [dispatch, item.id]);
    // const handleIncrease = async () => {
    //     console.log('loading');

    //     setCounter(prevCounter => {
    //         const newCounter = prevCounter + 1;


    //         dispatch(updateTotalPrice(parseInt(item.item.type.price) * newCounter));

    //         return newCounter;
    //     });
    // };

    const handleDecrease = async () => {
        if (counter > 1) {
            setCounter(counter - 1);
            dispatch(updateSubTotalPrice(parseInt(item.type.price, 10)));
            try {
                await firestore().collection('cartItem').doc(item.id).update({
                    quantity: counter,
                });
            } catch (error) {
                console.error('Failed to update quantity', error);
                Alert.alert('Failed to update quantity');
            }
        }
    };

    const handleIncrease = async () => {
        setCounter(counter + 1);
        dispatch(updateAddTotalPrice(parseInt(item.type.price, 10)));
        try {
            await firestore().collection('cartItem').doc(item.id).update({
                quantity: counter,
            });
        } catch (error) {
            console.error('Failed to update quantity', error);
            Alert.alert('Failed to update cart Item');
        }
    };


    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.03, paddingHorizontal: WIDTH * 0.07, backgroundColor: '#F9F9F9', height: HEIGHT * 0.1 }}>
                <Image
                    source={{ uri: item.image }}
                    style={{ height: WIDTH * 0.15, width: WIDTH * 0.15, borderRadius: WIDTH * 0.02 }}
                />
                <View style={{ width: WIDTH * 0.4 }}>
                    <Text style={{ fontSize: HEIGHT * 0.02, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ marginTop: HEIGHT * 0.005, color: colors.grayColor }}>$ {item.type.price}</Text>
                </View>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.04, position: 'absolute' }} > */}
                <Pressable style={{ width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: '50%', backgroundColor: colors.commonWhite, alignItems: 'center', justifyContent: 'center' }}
                    onPress={handleDecrease}><Image source={minusIcon} /></Pressable>
                <Text>{counter}</Text>
                <Pressable style={{ width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: '50%', backgroundColor: colors.commonWhite, alignItems: 'center', justifyContent: 'center' }}
                    onPress={handleIncrease}>
                    <Image source={plusIcon} style={{ tintColor: colors.commonBlack }} />
                </Pressable>
                {/* </View> */}
            </View >
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
