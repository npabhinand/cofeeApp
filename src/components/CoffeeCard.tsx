/* eslint-disable react-native/no-inline-styles */
import { Text, Pressable, Image, View, Alert } from 'react-native';
import React from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { plusIcon } from '../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';
import firestore, { getCountFromServer } from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { addCartCount } from '../redux/slice/cartCountSlice';
import { coffeeProps } from '../constants/types/commonTypes';


// import { addCart } from '../redux/slice/cartSlice';





const CoffeeCard: React.FC<coffeeProps> = (props) => {
    const { item, userId } = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    console.log('--', userId);
    // In your handleAddCart function
    const handleAddCart = async () => {
        try {
            await firestore().collection('cartItem')
                .add({
                    name: item.product,
                    coffeeType: item.coffeeType,
                    description: item.description,
                    type: {
                        size: item.type[0].size,
                        price: item.type[0].price,
                    },
                    userId: userId,
                    // rating: item.rating,
                    image: item.image,
                    quantity: 1,
                });
            const cartItemRef = firestore().collection('cartItem');
            const snapshot = await getCountFromServer(cartItemRef);
            // setCartCount(snapshot.data().count);
            dispatch(addCartCount(snapshot.data().count));
            console.log('dispatch', snapshot.data().count);
        } catch (error) {
            console.log('error while adding to carts Items');
        }


        Alert.alert('Successfully Added To cart');
    };

    return (
        <Pressable style={{ backgroundColor: colors.commonWhite, marginTop: HEIGHT * 0.02, marginBottom: HEIGHT * 0.01, width: WIDTH * 0.42, height: HEIGHT * 0.3, borderRadius: 15, marginLeft: WIDTH * 0.04 }} onPress={() => {
            navigation.navigate('ProductDetailScreen', {
                section: { item },
            });
        }}>
            <Image source={{ uri: item.image }} style={{ width: WIDTH * 0.38, borderRadius: 15, height: WIDTH * 0.38, position: 'absolute', alignSelf: 'center', marginTop: HEIGHT * 0.01 }} />

            {/* <View style={{ flexDirection: 'row', alignItems: 'center', right: WIDTH * 0.02, position: 'absolute', top: HEIGHT * 0.01, backgroundColor: `${colors.commonBlack}30`, height: HEIGHT * 0.04, width: WIDTH * 0.15, borderTopRightRadius: 15, paddingLeft: HEIGHT * 0.015, borderBottomLeftRadius: 30 }}>
                <Image source={starIcon} style={{ height: HEIGHT * 0.015, marginRight: WIDTH * 0.02 }} />
                <Text style={{ color: colors.commonWhite, fontSize: 10 }}>{item?.rating}</Text>
            </View> */}
            <View style={{ marginTop: HEIGHT * 0.19, marginLeft: WIDTH * 0.03 }}>
                <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02 }}>{item.product}</Text>
                <Text style={{ marginTop: HEIGHT * 0.005, color: colors.grayColor }}>{item.coffeeType}</Text>

                <View style={{ marginTop: HEIGHT * 0.005, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: WIDTH * 0.03 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02 }}>$ {item.type[0].price}</Text>
                    <Pressable style={{ backgroundColor: '#C67C4D', height: WIDTH * 0.08, width: WIDTH * 0.08, alignItems: 'center', justifyContent: 'center', borderRadius: WIDTH * 0.02 }} onPress={handleAddCart}>
                        <Image source={plusIcon} />
                    </Pressable>
                </View>

            </View>
        </Pressable>
    );
};


export default CoffeeCard;
