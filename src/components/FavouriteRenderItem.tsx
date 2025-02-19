/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore'

import { heartFilledIcon, heartIcon } from '../assets/icons';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';

const FavouriteRenderItem = (props) => {
    const { item, setLoading } = props;

    const [selected, setSelected] = useState<boolean>(item.isSelected);

    const removeFavourites = async () => {
        try {
            setLoading(true);
            await firestore().collection('favorite').doc(item.id).delete();
            setLoading(false);
            Alert.alert('Item successfully removed from favorites');
        } catch (error) {
            console.log(error, 'error while removing from favorites');
            setLoading(false);
        }
    };


    return (
        <View>
            <View style={{ backgroundColor: colors.commonWhite, borderRadius: 10, width: WIDTH * 0.9, alignSelf: 'center', height: 100, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                {selected ?
                    <Pressable style={{ position: 'absolute', top: HEIGHT * 0.02, left: WIDTH * 0.04, zIndex: 1, backgroundColor: colors.lightGray, width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }} onPress={removeFavourites}>
                        <Image source={heartFilledIcon} style={{ width: WIDTH * 0.045, height: WIDTH * 0.045 }} /></Pressable>
                    :
                    <Pressable style={{ position: 'absolute', top: HEIGHT * 0.02, left: WIDTH * 0.04, zIndex: 1, backgroundColor: colors.lightGray, width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }} onPress={() => setSelected(!selected)}>
                        <Image source={heartIcon} style={{ width: WIDTH * 0.045, height: WIDTH * 0.045 }} /></Pressable>
                }
                <Image source={{ uri: item.product.image }} style={{ borderRadius: 10, height: 80, width: WIDTH * 0.25 }} />
                <View style={{ gap: HEIGHT * 0.005 }}>
                    <Text style={{ fontWeight: '600', fontSize: 18 }}>{item.product.product}</Text>
                    <Text style={{ color: colors.grayColor }}>{item.product.coffeeType}</Text>
                    <Pressable><Text>Buy Now</Text></Pressable>
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.grayColor }}>₹{item.product.price}</Text>
            </View>
        </View>
    );
};

export default FavouriteRenderItem;
