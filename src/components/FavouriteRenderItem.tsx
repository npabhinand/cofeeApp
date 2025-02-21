/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';


import { heartFilledIcon, heartIcon } from '../assets/icons';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { useDispatch } from 'react-redux';
import { deleteFavorite } from '../redux/slice/favoriteSlice';

const FavouriteRenderItem = (props) => {
    const { item } = props;

    const dispatch = useDispatch();

    const removeFavorites = async () => {
        dispatch(deleteFavorite(item.id));
    };


    return (

        <View style={{ backgroundColor: colors.commonWhite, borderRadius: 10, width: WIDTH * 0.9, alignSelf: 'center', height: 100, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: HEIGHT * 0.01 }}>

            {item.selected &&
                <Pressable style={{ position: 'absolute', top: HEIGHT * 0.02, left: WIDTH * 0.04, zIndex: 1, backgroundColor: colors.lightGray, width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }} onPress={removeFavorites}>
                    <Image source={heartFilledIcon} style={{ width: WIDTH * 0.045, height: WIDTH * 0.045 }} /></Pressable>

            }
            <Image source={{ uri: item.image }} style={{ borderRadius: 10, height: 80, width: WIDTH * 0.25 }} />
            <View style={{ gap: HEIGHT * 0.005 }}>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>{item.product}</Text>
                <Text style={{ color: colors.grayColor }}>{item.coffeeType}</Text>
                <Pressable><Text>Buy Now</Text></Pressable>
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.grayColor }}>₹{item.price}</Text>
        </View>
    );
};

export default FavouriteRenderItem;
