/* eslint-disable react-native/no-inline-styles */
import { Text, SafeAreaView, Image, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import { coffee1 } from '../../assets/images';
import { colors } from '../../constants/colors';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { heartFilledIcon, heartIcon } from '../../assets/icons';

const WishListScreen = () => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    return (
        <SafeAreaView>
            <HeaderComponent header="Favourites" />

            {/* render component  */}
            <View style={{ backgroundColor: colors.commonWhite, borderRadius: 10, width: WIDTH * 0.9, alignSelf: 'center', height: 120, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                {isSelected ?
                    <Pressable style={{ position: 'absolute', top: HEIGHT * 0.02, left: WIDTH * 0.05, zIndex: 1, backgroundColor: colors.lightGray, width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }} onPress={() => setIsSelected(!isSelected)}>
                        <Image source={heartFilledIcon} style={{ width: WIDTH * 0.05, height: WIDTH * 0.05 }} /></Pressable>
                    :
                    <Pressable style={{ position: 'absolute', top: HEIGHT * 0.02, left: WIDTH * 0.05, zIndex: 1, backgroundColor: colors.lightGray, width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }} onPress={() => setIsSelected(!isSelected)}>
                        <Image source={heartIcon} style={{ width: WIDTH * 0.05, height: WIDTH * 0.05 }} /></Pressable>
                }

                <Image source={coffee1} style={{ borderRadius: 10, height: 100, width: WIDTH * 0.35 }} />
                <View style={{ gap: HEIGHT * 0.005 }}>
                    <Text style={{ fontWeight: '600', fontSize: 18 }}>Coffee Mocha</Text>
                    <Text style={{ color: colors.grayColor }}>Esspresso</Text>
                    <Pressable><Text>Buy Now</Text></Pressable>
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.grayColor }}>$10</Text>
            </View>
            {/*  */}
        </SafeAreaView>
    );
};

export default WishListScreen;
