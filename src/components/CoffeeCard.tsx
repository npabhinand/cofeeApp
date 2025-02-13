/* eslint-disable react-native/no-inline-styles */
import { Text, Pressable, Image, View, Alert } from 'react-native';
import React from 'react';
import firestore, { getCountFromServer } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { plusIcon, starIcon } from '../assets/icons';
import { colors } from '../constants/colors';
import { addCartCount } from '../redux/slice/cartCountSlice';
import { coffeeProps } from '../constants/types/commonTypes';


const CoffeeCard: React.FC<coffeeProps> = (props) => {
    const { item, userId, setLoading } = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleAddCart = async () => {
        try {
            const carts = [];
            setLoading(true);
            await firestore()
                .collection('cartItem')
                .where('userId', '==', userId)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        carts.push({ ...doc.data(), id: doc.id });
                    });
                });
            // setCartItems(carts);

            const existingProduct = carts.find(items => items.productId === item.id);
            if (existingProduct) {
                await firestore()
                    .collection('cartItem')
                    .doc(existingProduct.id)
                    .update({
                        quantity: existingProduct.quantity + 1,
                    });

                const cartItemRef = firestore().collection('cartItem').where('userId', '==', userId);
                const snapshot = await getCountFromServer(cartItemRef);
                dispatch(addCartCount(snapshot.data().count));
                console.log('Updated cart count', snapshot.data().count);
                setLoading(false);
            } else {
                await firestore().collection('cartItem').add({
                    name: item.product,
                    coffeeType: item.coffeeType,
                    description: item.description,
                    types: item.types,
                    price: item.price,
                    userId: userId,
                    image: item.image,
                    quantity: 1,
                    productId: item.id,
                    profit: item.profit,
                });

                const cartItemRef = firestore().collection('cartItem').where('userId', '==', userId);
                const snapshot = await getCountFromServer(cartItemRef);
                dispatch(addCartCount(snapshot.data().count));
                setLoading(false);
                console.log('Added new cart item, cart count:', snapshot.data().count);
            }

            Alert.alert('Product successfully added to cart');
        } catch (error) {
            console.log('Error occurred while handling cart items', error);
        }
        setLoading(false);
    };


    return (
        <Pressable style={{ backgroundColor: colors.commonWhite, marginTop: HEIGHT * 0.02, marginBottom: HEIGHT * 0.01, width: WIDTH * 0.42, height: HEIGHT * 0.3, borderRadius: 15, marginRight: WIDTH * 0.05 }} onPress={() => {
            navigation.navigate('ProductDetailScreen', {
                section: { item },
            });
        }}>
            <Image source={{ uri: item.image }} style={{ width: WIDTH * 0.38, borderRadius: 15, height: HEIGHT * 0.16, position: 'absolute', alignSelf: 'center', marginTop: HEIGHT * 0.01, }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', right: WIDTH * 0.02, position: 'absolute', top: HEIGHT * 0.01, backgroundColor: `${colors.commonBlack}30`, height: HEIGHT * 0.04, width: WIDTH * 0.15, borderTopRightRadius: 15, paddingLeft: HEIGHT * 0.015, borderBottomLeftRadius: 30 }}>
                <Image source={starIcon} style={{ height: HEIGHT * 0.015, marginRight: WIDTH * 0.02 }} />
                <Text style={{ color: colors.commonWhite, fontSize: 10 }}>4.8</Text>
            </View>
            <View style={{ marginTop: HEIGHT * 0.19, marginLeft: WIDTH * 0.03 }}>
                <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02, textTransform: 'capitalize' }}>{item.product}</Text>
                <Text style={{ marginTop: HEIGHT * 0.005, color: colors.grayColor, textTransform: 'capitalize' }}>{item.coffeeType}</Text>

                <View style={{ marginTop: HEIGHT * 0.005, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: WIDTH * 0.03 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02 }}>$ {item.price}</Text>
                    <Pressable style={{ backgroundColor: '#C67C4D', height: WIDTH * 0.08, width: WIDTH * 0.08, alignItems: 'center', justifyContent: 'center', borderRadius: WIDTH * 0.02 }} onPress={handleAddCart}>
                        <Image source={plusIcon} />
                    </Pressable>
                </View>

            </View>
        </Pressable>
    );
};


export default CoffeeCard;
