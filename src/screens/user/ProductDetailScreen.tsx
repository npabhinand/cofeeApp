/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { backIcon, beansIcon, deliveryIcon, heartIcon, milkCanIcon, rateIcon } from '../../assets/icons';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/colors';
import { coffeeProps, ProductDetailScreenProps } from '../../constants/types/commonTypes';
// import { useDispatch } from 'react-redux';
// import { addCart } from '../../redux/slice/cartSlice';


const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route }) => {
    const { section } = route.params;
    // const dispatch = useDispatch();
    const [showMore, setShowMore] = useState(false);
    const navigation = useNavigation();
    const [isSelected, setIsSelected] = useState<number>(1);

    const handleAddItem = () => {
        // dispatch(addCart({
        //     id: section.item.id,
        //     name: section.item.name,
        //     coffeeType: section.item.item.coffeeType,
        //     description: section.item.item.description,
        //     type: {
        //         size: section.item.item.type[isSelected].size,
        //         price: section.item.item.type[isSelected].price,
        //     },
        //     rating: section.item.item.rating,
        //     img: section.item.item.img,
        //     quantity: 1,
        // }));
        // Alert.alert('Successfully Added To cart');
        // navigation.navigate('HomeTabs');
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteColor }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: WIDTH * 0.1, marginTop: HEIGHT * 0.03, marginBottom: HEIGHT * 0.02 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={backIcon} />
                </Pressable>
                <Text style={{ fontWeight: '600', fontSize: HEIGHT * 0.02 }}>Detail</Text>
                <Pressable>
                    <Image source={heartIcon} />
                </Pressable>
            </View>
            <View style={{ paddingHorizontal: WIDTH * 0.06, marginTop: HEIGHT * 0.02 }}>
                <Image source={{ uri: section.item.image }} style={{ width: WIDTH * 0.9, height: HEIGHT * 0.24, borderRadius: WIDTH * 0.04 }} />
                <Text style={{ fontWeight: 'bold', fontSize: HEIGHT * 0.02, marginTop: HEIGHT * 0.02 }}>{section.item.product}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: colors.grayColor, marginTop: HEIGHT * 0.01 }}>{section.item.coffeeType}</Text>

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
                    <Text style={{ fontSize: HEIGHT * 0.02, fontWeight: '600' }}>{section.item.rating}</Text>
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
                    {section.item.description.length > 120 ? (
                        showMore ? (
                            <View style={{}}>
                                <Text style={{ color: colors.grayColor, fontSize: 14 }}>{section.item.description}</Text>
                                <Text style={{ color: colors.brownColor, fontWeight: 'bold' }} onPress={() => setShowMore(!showMore)}>Read Less</Text>
                            </View>
                        ) : (
                            <View>
                                <Text style={{ color: colors.grayColor, fontSize: 14 }}>
                                    {`${section.item.description.slice(0, 120)}... `}
                                </Text>
                                <Text style={{ color: colors.brownColor, fontWeight: 'bold' }} onPress={() => setShowMore(!showMore)}>Read More</Text>
                            </View>
                        )
                    ) : (
                        <Text style={{ color: colors.grayColor, fontSize: 14 }}>{section.item.description}</Text>
                    )}
                </View>
                {/*  */}
                {/* size buttons */}
                <Text style={{ marginTop: HEIGHT * 0.035, fontWeight: '600', fontSize: HEIGHT * 0.02, marginBottom: HEIGHT * 0.015 }}>Size</Text>

                <View style={{ marginTop: HEIGHT * 0.01, flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                    {section.item.type.map((size, index) => (
                        <Pressable key={index} style={[{
                            width: WIDTH * 0.25, height: HEIGHT * 0.05, backgroundColor: isSelected === index ? `${colors.brownColor}10` : colors.commonWhite, borderWidth: 0.5, borderRadius: WIDTH * 0.03, borderColor: isSelected === index ? colors.brownColor : `${colors.grayColor}60`, justifyContent: 'center', alignItems: 'center',
                        }]} onPress={() => setIsSelected(index)}>
                            <Text style={{ color: isSelected === index ? colors.brownColor : colors.commonBlack }}>{size.size}</Text>
                        </Pressable>
                    ))}

                </View>
            </View>
            <View style={{ backgroundColor: colors.commonWhite, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: HEIGHT * 0.01, paddingHorizontal: WIDTH * 0.06, height: HEIGHT * 0.13, width: WIDTH * 1, borderTopLeftRadius: HEIGHT * 0.03, borderTopRightRadius: HEIGHT * 0.03, paddingTop: HEIGHT * 0.02 }}>
                <View>
                    <Text style={{ marginBottom: HEIGHT * 0.01, color: colors.grayColor }}>Price</Text>
                    <Text style={{ color: colors.brownColor, fontSize: HEIGHT * 0.02, fontWeight: 'bold' }}>$ {section.item.type[isSelected].price}</Text>
                </View>
                <Pressable style={{ width: WIDTH * 0.6, height: HEIGHT * 0.07, backgroundColor: colors.brownColor, borderRadius: WIDTH * 0.03, justifyContent: 'center', alignItems: 'center' }} onPress={handleAddItem}><Text style={{ color: colors.commonWhite, fontWeight: 'bold' }} >Buy Now</Text></Pressable>

            </View>
        </SafeAreaView >
    );
};

export default ProductDetailScreen;
