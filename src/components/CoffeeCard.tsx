/* eslint-disable react-native/no-inline-styles */
import { Text, Pressable, Image, View, Alert } from 'react-native';
import React from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { plusIcon, starIcon } from '../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/slice/cartSlice';
// import { getFirestore } from '@react-native-firebase/firestore';


interface coffeeProps {
    item: {
        id: number;
        name: string;
        coffeeType: string;
        description: string;
        type: { size: string; price: number; }[],
        rating: number;
        img: number;
    },

}

const CoffeeCard: React.FC<coffeeProps> = (props) => {
    const { item } = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();


    // In your handleAddCart function
    const handleAddCart = () => {
        // const firestore = getFirestore();
        // firestore.collection('coffeeItem')
        //     .add({
        //         item,
        //     })
        //     .then(() => {
        //         console.log('User added!');
        //     })
        //     .catch(error => {
        //         console.error("Error adding document: ", error);
        //     });

        dispatch(addCart({
            id: item.id,
            name: item.name,
            coffeeType: item.coffeeType,
            description: item.description,
            type: {
                size: item.type[0].size,
                price: item.type[0].price,
            },
            rating: item.rating,
            img: item.img,
            quantity: 1,
        }));
        Alert.alert('Successfully Added To cart');
    };


    return (
        <Pressable style={{ backgroundColor: colors.commonWhite, marginTop: HEIGHT * 0.02, marginBottom: HEIGHT * 0.01, width: WIDTH * 0.42, height: HEIGHT * 0.3, borderRadius: 15, marginLeft: WIDTH * 0.04 }} onPress={() => {
            navigation.navigate('ProductDetailScreen', {
                section: { item },
            });
        }}>
            <Image source={item.img} style={{ width: WIDTH * 0.38, borderRadius: 15, height: WIDTH * 0.38, position: 'absolute', alignSelf: 'center', marginTop: HEIGHT * 0.01 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', right: WIDTH * 0.02, position: 'absolute', top: HEIGHT * 0.01, backgroundColor: `${colors.commonBlack}30`, height: HEIGHT * 0.04, width: WIDTH * 0.15, borderTopRightRadius: 15, paddingLeft: HEIGHT * 0.015, borderBottomLeftRadius: 30 }}>
                <Image source={starIcon} style={{ height: HEIGHT * 0.015, marginRight: WIDTH * 0.02 }} />
                <Text style={{ color: colors.commonWhite, fontSize: 10 }}>{item.rating}</Text>
            </View>
            <View style={{ marginTop: HEIGHT * 0.19, marginLeft: WIDTH * 0.03 }}>
                <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02 }}>{item.name}</Text>
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
