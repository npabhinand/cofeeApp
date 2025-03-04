/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import firestore, { getCountFromServer } from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { deleteIcon, minusIcon, plusIcon } from '../assets/icons';
import { CartProps } from '../constants/types/commonTypes';
import { selectedPrice, updateAddTotalPrice, updateSubTotalPrice } from '../redux/slice/priceTotalSlice';
import { DecreaseCartQuantity, deleteCart, IncreaseCartQuantity } from '../redux/slice/cartSlice';
import { selectedOrderType } from '../redux/slice/orderTypeSlice';
import { selectedUserData } from '../redux/slice/userDataSlice';
import { addCartCount } from '../redux/slice/cartCountSlice';

const OrderComponent: React.FC<CartProps> = (props) => {
    const { item } = props;
    const dispatch = useDispatch();
    const db=firestore();
    const totalPrice = useSelector(selectedPrice);
    const orderType = useSelector(selectedOrderType);
    const userData = useSelector(selectedUserData);
    const { id } = userData[0];

    const [counter, setCounter] = useState<number>(item.quantity);
    

    const handleDecrease = async () => {
        if (counter > 1) {
            setCounter(counter - 1);
            dispatch(updateSubTotalPrice(parseInt(item.price, 10)));
            dispatch(DecreaseCartQuantity(item.itemId));
            try {
                await db.collection('cartItem')
                    .where('itemId', '==', item.itemId)
                    .where('orderType', '==', orderType)
                    .get()
                    .then(querySnapshot => {
                        if (!querySnapshot.empty) {
                            querySnapshot.forEach(documentSnapshot => {
                                documentSnapshot.ref.update({
                                    quantity: counter - 1,
                                });
                            });
                        } else {
                            console.log('No matching documents.');
                        }
                    });
            } catch (error) {
                console.error('Failed to update quantity', error);
                Alert.alert('Failed to update quantity');
            }
    };
}

    const handleIncrease = async () => {
        setCounter(counter + 1);
        dispatch(updateAddTotalPrice(parseInt(item.price, 10)));
        dispatch(IncreaseCartQuantity({itemId:item.itemId,orderType:orderType}));
        try {
            await db.collection('cartItem')
                .where('itemId', '==', item.itemId)
                .where('orderType', '==', orderType)
                .get()
                .then(querySnapshot => {
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach(documentSnapshot => {
                            documentSnapshot.ref.update({
                                quantity: counter + 1,
                            });
                        });
                    } else {
                        console.log('No matching documents.');
                    }
                });
        } catch (error) {
            console.error('Failed to update quantity', error);
            Alert.alert('Failed to update quantity');
        }
    };

    const handleButtonDelete = async (itemId: string) => {

        console.log(orderType,'>>>>')
        console.log(itemId)
        console.log(id,'userIsd')
        try {
    
            const cartQuerySnapshot = await db.collection('cartItem')
                .where('orderType', '==', orderType)
                .where('userId', '==', id)
                .where('itemId', '==', itemId)
                .get();
            if (!cartQuerySnapshot.empty) {
                cartQuerySnapshot.forEach(async (doc) => {
                    console.log(doc.id)
                    await db.collection('cartItem').doc(doc.id).delete();
                    console.log(`Deleted document with ID: ${doc.id}`);
                });
                dispatch(deleteCart({itemId: itemId, orderType: orderType}));
                const cartItemRef = db.collection('cartItem').where('userId', '==', id);
                const snapshot = await getCountFromServer(cartItemRef);
                dispatch(addCartCount(snapshot.data().count));
            } else {
                console.log('No matching documents found');
            }
        } catch (error) {
            console.error('Failed to delete cart item:', error);
        }
    };
    

      const handleDeleteAlert = (rowKey: string) => {
            Alert.alert('Are You sure want to delete Cart Item', '', [
                {
                    text: 'Cancel',
                    onPress: () => { console.log('Cancel Pressed') },
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => handleButtonDelete(rowKey),
    
                },
            ]);
        };

    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.02, backgroundColor: '#F9F9F9', height: HEIGHT * 0.1 }}>
                <Image
                    source={{ uri: item.image }}
                    style={{ height: WIDTH * 0.15, width: WIDTH * 0.15, borderRadius: WIDTH * 0.02 }}
                />
                <View style={{ width: WIDTH * 0.45 }}>
                    <Text style={{ fontSize: HEIGHT * 0.02, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ marginTop: HEIGHT * 0.005, color: colors.grayColor }}>$ {item.price}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.04, }} >
                <Pressable style={{ width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: '50%', backgroundColor: colors.commonWhite, alignItems: 'center', justifyContent: 'center' }}
                    onPress={handleDecrease}><Image source={minusIcon} /></Pressable>
                <Text>{counter}</Text>
                <Pressable style={{ width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: '50%', backgroundColor: colors.commonWhite, alignItems: 'center', justifyContent: 'center' }}
                    onPress={handleIncrease}>
                    <Image source={plusIcon} style={{ tintColor: colors.commonBlack }} />
                </Pressable>
                </View>
               
            </View >

            <Pressable style={{alignSelf:'flex-end',justifyContent:'center',flexDirection:'row',alignItems:'center',borderWidth:0.5,padding:5,
                width:WIDTH*0.22,borderRadius:5}} onPress={()=>handleDeleteAlert(item.itemId)}>
            <Image source={deleteIcon}/>
                    <Text>Remove</Text>
            </Pressable>
            <View
                style={{
                    borderBottomColor: `${colors.brownColor}15`,
                    borderBottomWidth: 5,
                    width: WIDTH * 1.0,
                    marginVertical: HEIGHT * 0.01,
                    alignSelf: 'center',
                    // marginHorizontal: WIDTH * 0.05,
                }}
            />
        </>
    );
};

export default OrderComponent;
