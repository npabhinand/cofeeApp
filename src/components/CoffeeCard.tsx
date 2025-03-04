/* eslint-disable react-native/no-inline-styles */
import { Text, Pressable, Image, View, Alert } from 'react-native';
import React, { useState } from 'react';
import firestore, { getCountFromServer } from '@react-native-firebase/firestore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { heartFilledIcon, heartIcon, plusIcon, starIcon, tickIcon } from '../assets/icons';
import { colors } from '../constants/colors';
import { coffeeProps } from '../constants/types/commonTypes';
import { addCartCount } from '../redux/slice/cartCountSlice';
import { addFavorite, deleteFavorite } from '../redux/slice/favoriteSlice';
import { addCart } from '../redux/slice/cartSlice';
import { selectedOrderType } from '../redux/slice/orderTypeSlice';
import { RootStackParamList } from '../routes/AppNavigator';

const CoffeeCard: React.FC<coffeeProps> = (props) => {
    const { item, userId,setLoading } = props;
    const orderType = useSelector(selectedOrderType);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch();

    const addFavourites = () => {

        dispatch(addFavorite({
            id: item.id,
            product: item.product.product,
            coffeeType: item.product.coffeeType,
            description: item.product.description,
            types: item.product.types,
            price: item.product.price,
            image: item.product.image,
            selected: true,
            orderType: orderType,
        }));
        setLoading(true);
    };

    const removeFavorite = async () => {
        dispatch(deleteFavorite(item.id));
    };

    
    const handleAddCart = async () => {
        try {
                dispatch(addCart({
                    name: item.product.product,
                    coffeeType: item.product.coffeeType,
                    description: item.product.description,
                    types: item.product.types,
                    price: item.product.price,
                    image: item.product.image,
                    quantity: 1,
                    itemId: item.id,
                    orderType: orderType,
                }))

                setLoading(true);
                Alert.alert('Product successfully added to cart');
                await firestore().collection('cartItem').add({
                    name: item.product.product,
                    coffeeType: item.product.coffeeType,
                    description: item.product.description,
                    types: item.product.types,
                    price: item.product.price,
                    userId: userId,
                    image: item.product.image,
                    quantity: 1,
                    itemId: item.id,
                    orderType: orderType,
                });
                
                const cartItemRef = firestore().collection('cartItem').where('userId', '==', userId);
                const snapshot = await getCountFromServer(cartItemRef);
                dispatch(addCartCount(snapshot.data().count));
                
                console.log('Added new cart item, cart count:', snapshot.data().count);
            
        } catch (error) {
            setLoading(true);
            console.log('Error occurred while handling cart items', error);
            console.log(item.product.types);
        }   
    };

    return (
        <Pressable style={{ backgroundColor: colors.commonWhite, marginTop: HEIGHT * 0.02, marginBottom: HEIGHT * 0.01, width: WIDTH * 0.42, height: HEIGHT * 0.3, borderRadius: 15, marginRight: WIDTH * 0.05 }} onPress={() => {
            navigation.navigate('ProductDetailScreen', {
                section: { item },
            });
        }}>

            {item?.selected ?
                <Pressable style={{ position: 'absolute', top: HEIGHT * 0.02, left: WIDTH * 0.05, zIndex: 1, backgroundColor: colors.lightGray, 
                width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }} onPress={removeFavorite}>
                    <Image source={heartFilledIcon} style={{ width: WIDTH * 0.05, height: WIDTH * 0.05 }} />
                </Pressable>
                :
                <Pressable style={{ position: 'absolute', top: HEIGHT * 0.02, left: WIDTH * 0.05, zIndex: 1, backgroundColor: colors.lightGray, width: WIDTH * 0.07, height: WIDTH * 0.07, borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }} onPress={addFavourites}>
                    <Image source={heartIcon} style={{ width: WIDTH * 0.05, height: WIDTH * 0.05 }} />
                </Pressable>
            }

            <Image source={{ uri: item.product.image }} style={{ width: WIDTH * 0.38, borderRadius: 15, height: HEIGHT * 0.16, position: 'absolute', 
                alignSelf: 'center', marginTop: HEIGHT * 0.01 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', right: WIDTH * 0.02, position: 'absolute', top: HEIGHT * 0.01, 
                backgroundColor: `${colors.commonBlack}30`, height: HEIGHT * 0.04, width: WIDTH * 0.15, borderTopRightRadius: 15, paddingLeft: HEIGHT * 0.015, borderBottomLeftRadius: 30 }}>
                <Image source={starIcon} style={{ height: HEIGHT * 0.015, marginRight: WIDTH * 0.02 }} />
                <Text style={{ color: colors.commonWhite, fontSize: 10 }}>4.8</Text>
            </View>
            <View style={{ marginTop: HEIGHT * 0.19, marginLeft: WIDTH * 0.03 }}>
                <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02, textTransform: 'capitalize' }}>{item.product.product}</Text>
                <Text style={{ marginTop: HEIGHT * 0.005, color: colors.grayColor, textTransform: 'capitalize' }}>{item.product.coffeeType}</Text>

                <View style={{ marginTop: HEIGHT * 0.005, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: WIDTH * 0.03 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02 }}>$ {item.product.price}</Text>
                    {item?.isAddedInCart?
                    <Image source={tickIcon} tintColor={colors.brownColor} style={{height:25,width:25}}/>:<Pressable style={{ backgroundColor: '#C67C4D', 
                    height: WIDTH * 0.08, width: WIDTH * 0.08, alignItems: 'center', justifyContent: 'center', borderRadius: WIDTH * 0.02 }} 
                    onPress={handleAddCart}>
                        <Image source={plusIcon} /></Pressable>}
                    
                </View>
            </View>
        </Pressable>
    );
};

export default CoffeeCard;
