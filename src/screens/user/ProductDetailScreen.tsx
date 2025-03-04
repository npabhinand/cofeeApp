/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import firestore, { getCountFromServer } from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { backIcon, beansIcon, deliveryIcon, heartFilledIcon, heartIcon, milkCanIcon, rateIcon, tickIcon } from '../../assets/icons';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import { ProductDetailScreenProps } from '../../constants/types/commonTypes';
import { selectedUserData } from '../../redux/slice/userDataSlice';
import { addCartCount } from '../../redux/slice/cartCountSlice';
import { selectedOrderType } from '../../redux/slice/orderTypeSlice';
import { addCart } from '../../redux/slice/cartSlice';
import { addFavorite, deleteFavorite } from '../../redux/slice/favoriteSlice';
import { RootStackParamList } from '../../routes/AppNavigator';


const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route }) => {
    const { section } = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const userData = useSelector(selectedUserData);
    const orderType = useSelector(selectedOrderType);
    const userId = userData[0].id;
    
    // const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [isSelected,setIsSelected]=useState(section.item?.selected|| false);

    console.log('itemId',section.item.id,'>>>>>',orderType,'>>>>',);
    const handleAddItem = async () => {
        try {
            // setLoading(true);
            // const carts: any = [];
            // await firestore()    
            //     .collection('cartItem')
            //     .where('userId', '==', userId)
            //     .get()
            //     .then(querySnapshot => {
            //         querySnapshot.forEach(doc => {
            //             carts.push({ ...doc.data(), id: doc.id });
            //         });
            //     });
            // // setCartItems(carts);

            // const existingProduct = carts.find(item => item.itemId === section.item.id && item.orderType.trim() === orderType);
            // if (existingProduct) {
            //     await firestore()
            //         .collection('cartItem')
            //         .doc(existingProduct.id)
            //         .update({
            //             quantity: existingProduct.quantity + 1,
            //         });

            //     const cartItemRef = firestore().collection('cartItem').where('userId', '==', userId);
            //     const snapshot = await getCountFromServer(cartItemRef);
            //     dispatch(addCartCount(snapshot.data().count));
            //     console.log('Updated cart count', snapshot.data().count);
            // } else {
                dispatch(addCart({
                    name: section.item.product.product,
                    coffeeType: section.item.product.coffeeType,
                    description: section.item.product.description,
                    types: section.item.product.types,
                    price: section.item.product.price,
                    image: section.item.product.image,
                    quantity: 1,
                    itemId: section.item.id,
                    orderType: orderType,
                }));
                navigation.navigate('OrderScreen');
                await firestore().collection('cartItem').add({
                    name: section.item.product.product,
                    coffeeType: section.item.product.coffeeType,
                    description: section.item.product.description,
                    price: section.item.product.price,
                    types:section.item.product.types,
                    userId: userId,
                    image: section.item.product.image,
                    quantity: 1,
                    itemId: section.item.id,
                    orderType: orderType,
                });
                

                const cartItemRef = firestore().collection('cartItem').where('userId', '==', userId);
                const snapshot = await getCountFromServer(cartItemRef);
                dispatch(addCartCount(snapshot.data().count));
                console.log('Added new cart item, cart count:', snapshot.data().count);
            // }
            // setLoading(false);
            // Alert.alert('Item successfully added to cart');
            
        } catch (error) {
            console.log('Error occurred while handling cart items', error);
            // setLoading(false);
        }
    };


     const addFavourites = () => {
    
            dispatch(addFavorite({
                id: section.item.id,
                product: section.item.product.product,
                coffeeType: section.item.product.coffeeType,
                description: section.item.product.description,
                types: section.item.product.types,
                price: section.item.product.price,
                image: section.item.product.image,
                selected: true,
                orderType: orderType,
            }));
            (true);
            // setIsSelected
            setIsSelected(true);
        };

         const removeFavorite = async () => {
                dispatch(deleteFavorite(section.item.id));
                setIsSelected(false);
            };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteColor }}>
           
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: WIDTH * 0.05, marginTop: HEIGHT * 0.03, marginBottom: HEIGHT * 0.02 }}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={backIcon} />
                        </Pressable>
                        <Text style={{ fontWeight: '600', fontSize: 18 }}>Detail</Text>
                         {/* icon */}
                        <Pressable onPress={isSelected ?removeFavorite:addFavourites}>
                           <Image source={isSelected?heartFilledIcon:heartIcon} style={{ width: WIDTH * 0.05, height: WIDTH * 0.05 }} />
                        </Pressable>

                    </View>
                    <View style={{ paddingHorizontal: WIDTH * 0.05, marginTop: HEIGHT * 0.02, paddingBottom: HEIGHT * 0.15 }}>
                        <Image source={{ uri: section.item.product.image }} style={{ width: WIDTH * 0.9, height: HEIGHT * 0.24, borderRadius: WIDTH * 0.04 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02, marginTop: HEIGHT * 0.02, textTransform: 'capitalize' }}>{section.item.product.product}</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.grayColor, marginTop: HEIGHT * 0.01 }}>{section.item.product.coffeeType}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.04 }}>
                                <View style={{ backgroundColor: `${colors.grayColor}10`, height: WIDTH * 0.12, width: WIDTH * 0.12, borderRadius: WIDTH * 0.04, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={deliveryIcon} />
                                </View>
                                <View style={{ backgroundColor: `${colors.grayColor}10`, height: WIDTH * 0.12, width: WIDTH * 0.12, borderRadius: WIDTH * 0.04, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={beansIcon} />
                                </View>
                                <View style={{ backgroundColor: `${colors.grayColor}10`, height: WIDTH * 0.12, width: WIDTH * 0.12, borderRadius: WIDTH * 0.04, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={milkCanIcon} />
                                </View>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.01 }}>
                            <Image source={rateIcon} />
                            <Text style={{ fontSize: HEIGHT * 0.02, fontWeight: '600' }}>4.8</Text>
                            <Text style={{ fontSize: HEIGHT * 0.015, color: colors.grayColor }}>(230)</Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: `${colors.grayColor}60`,
                                borderBottomWidth: 0.5,
                                marginTop: HEIGHT * 0.02,
                                marginHorizontal: WIDTH * 0.05,
                            }}
                        />
                        <Text style={{ marginVertical: HEIGHT * 0.018, fontWeight: '600', fontSize: HEIGHT * 0.02 }}>Description</Text>
                        {/*  */}
                        <View>
                            {section.item.product.description.length > 120 ? (
                                showMore ? (
                                    <View style={{}}>
                                        <Text style={{ color: colors.grayColor, fontSize: 14 }}>{section.item.product.description}</Text>
                                        <Text style={{ color: colors.brownColor, fontWeight: 'bold' }} onPress={() => setShowMore(!showMore)}>Read Less</Text>
                                    </View>
                                ) : (
                                    <View>
                                        <Text style={{ color: colors.grayColor, fontSize: 14 }}>
                                            {`${section.item.product.description.slice(0, 120)}... `}
                                        </Text>
                                        <Text style={{ color: colors.brownColor, fontWeight: 'bold' }} onPress={() => setShowMore(!showMore)}>Read More</Text>
                                    </View>
                                )
                            ) : (
                                <Text style={{ color: colors.grayColor, fontSize: 14 }}>{section.item.product.description}</Text>
                            )}
                        </View>
                        
                        <View style={{ marginTop: HEIGHT * 0.01, flexDirection: 'row', flexWrap: 'wrap', gap: HEIGHT * 0.01 }}>
                            {section.item.product.types !== undefined && Object.keys(section.item.product.types).map((key) => (
                                <View key={key} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: `${colors.grayColor}90`, padding: 10, borderRadius: 10 }}>
                                    <Text style={{ color: colors.commonWhite, textTransform: 'capitalize' }}>{key}: </Text>
                                    <Text style={{ color: colors.commonWhite }}>{section.item.product.types[key]}</Text>
                                    {/* </Pressable> */}
                                </View>
                            ))}

                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: colors.commonWhite, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: HEIGHT * 0.01, paddingHorizontal: WIDTH * 0.05, height: HEIGHT * 0.13, width: WIDTH * 1, borderTopLeftRadius: HEIGHT * 0.03, borderTopRightRadius: HEIGHT * 0.03, paddingTop: HEIGHT * 0.02 }}>
                    <View>
                        <Text style={{ marginBottom: HEIGHT * 0.01, color: colors.grayColor }}>Price</Text>
                        <Text style={{ color: colors.brownColor, fontSize: HEIGHT * 0.02, fontWeight: 'bold' }}>$ {section.item.product.price}</Text>
                    </View>
                    {/* {section.item?.isAddedInCart? */}
                    {/* // <Image source={tickIcon} tintColor={colors.brownColor} style={{height:25,width:25}}/> */}
                     <Pressable style={{ width: WIDTH * 0.6, height: HEIGHT * 0.07, backgroundColor: colors.brownColor, borderRadius: WIDTH * 0.03, 
                        justifyContent: 'center', alignItems: 'center' }} 
                        onPress={handleAddItem}>
                            <Text style={{ color: colors.commonWhite, fontWeight: 'bold' }} >Buy Now</Text>
                    </Pressable> 
                    {/* } */}
                   

                </View>
          
        </SafeAreaView >

    );
};

export default ProductDetailScreen;
