/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, TextInput, Image, Pressable, ScrollView, Alert, Button, FlatList } from 'react-native';
import React, { useState } from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { backIcon, deleteIcon } from '../assets/icons';
import { colors } from '../constants/colors';
import firebase from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import { productProp } from '../constants/types/commonTypes';
import AttributeInputText from './AttributeInputText';



const AddProductComponent: React.FC<productProp> = (props) => {
    const { setModalVisible, item, setUpdate, update } = props;
    // const [showSize, setShowSize] = useState(false);
    // const [showSugar, setShowSugar] = useState(false);
    // const [showFlavors, setShowFlavors] = useState(false);
    const [numAttributes, setNumAttributes] = useState<[]>([]);
    const [formData, setFormData] = useState({
        product: item?.product || '',
        coffeeType: item?.coffeeType || '',
        description: item?.description || '',
        // smallPrice: item?.type[0]?.price || undefined,
        // mediumPrice: item?.type[1]?.price || undefined,
        // largePrice: item?.type[2]?.price || undefined,
    });
    const [image, setImage] = useState<string>(item?.image || '');
    const [errors, setErrors] = useState<any>({});

    const handleTextChange = (text: string, key: string) => {
        if (key === 'smallPrice' || key === 'mediumPrice' || key === 'largePrice') {
            // Ensure prices are numeric
            text = text.replace(/[^0-9]/g, '');
        }
        setFormData((prev) => ({ ...prev, [key]: text }));
    };

    const handleSubmit = async () => {
        let newErrors: any = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = `${key} is required`;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            if (item?.id) {
                try {
                    await firebase().collection('coffeeItem').doc(item.id).update({
                        product: formData.product,
                        coffeeType: formData.coffeeType,
                        description: formData.description,
                        // type: [{ size: 'S', price: formData.smallPrice },
                        // { size: 'M', price: formData.mediumPrice },
                        // { size: 'L', price: formData.largePrice }],
                        image: image,
                    });
                    Alert.alert('Coffee Item updated Successfully');
                } catch (error) {
                    console.error('Error updating Coffee Item to Firestore:', error);
                    Alert.alert('Failed to update Coffee Item');
                }
            } else {
                await firebase().collection('coffeeItem').add({
                    product: formData.product,
                    coffeeType: formData.coffeeType,
                    description: formData.description,
                    // type: [{ size: 'S', price: formData.smallPrice },
                    // { size: 'M', price: formData.mediumPrice },
                    // { size: 'L', price: formData.largePrice }],
                    image: image,
                });
                Alert.alert('Product Added Successfully');
            }
        } catch (error) {
            console.log(`${error} occurred`);
        }

        setUpdate(!update);
        setModalVisible(false);
    };

    const handleImagePick = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.5, includeBase64: true }, (response) => {
            if (response.assets && response.assets[0]) {
                const base64String = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
                setImage(base64String);
            }
        });
    };


    const addAttribute = () => {
        setNumAttributes([...numAttributes, { placeholder: 'Add Attribute' }]);
    };
    return (
        <SafeAreaView style={{ paddingHorizontal: WIDTH * 0.05, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: WIDTH * 0.05, marginBottom: HEIGHT * 0.1 }}>
                <View style={{ flexDirection: 'row', marginVertical: HEIGHT * 0.01 }}>
                    <Pressable onPress={() => setModalVisible(false)}>
                        <Image source={backIcon} />
                    </Pressable>
                    <Text style={{ fontWeight: '600', fontSize: HEIGHT * 0.02, marginLeft: WIDTH * 0.3 }}>Add Product</Text>
                </View>

                {Object.keys(formData).map((key) => (
                    <View key={key} style={{ marginTop: HEIGHT * 0.02 }}>
                        <Text style={{ marginBottom: HEIGHT * 0.005, fontSize: 16 }}>{key}</Text>
                        <TextInput
                            placeholder={'Type here'} style={{ height: key === 'description' ? HEIGHT * 0.15 : HEIGHT * 0.055, borderWidth: 0.5, borderRadius: 5, paddingLeft: WIDTH * 0.03, borderColor: errors[key] ? colors.redColor : colors.commonBlack }}
                            multiline={key === 'description'} value={formData[key]} onChangeText={(text) => handleTextChange(text, key)} keyboardType={key === 'smallPrice' || key === 'mediumPrice' || key === 'largePrice' ? 'numeric' : 'default'} />
                    </View>
                ))}

                <Text style={{ color: colors.brownColor, fontSize: HEIGHT * 0.03, marginVertical: HEIGHT * 0.01 }}>Attributes</Text>
                <View style={{ gap: HEIGHT * 0.01 }}>
                    <Pressable onPress={() => setNumAttributes(val => val + 1)} style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: colors.brownColor, alignItems: 'center', width: WIDTH * 0.2, height: HEIGHT * 0.056, borderRadius: 10 }}><Text style={{ color: colors.commonWhite }}>Add</Text></Pressable>

                    <FlatList keyExtractor={({ id, index }) => index} data={numAttributes}
                        scrollEnabled={false}
                        renderItem={({ item }) => (<AttributeInputText item={item} />)} />
                    <Pressable style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: colors.brownColor, alignItems: 'center', width: WIDTH * 0.4, height: HEIGHT * 0.056, borderRadius: 10 }}><Text style={{ color: colors.commonWhite }}>Finalise Attributes</Text></Pressable>
                    {/* {AttributeArray.map((attributes)=>(
                        <Pressable key={} style={{ backgroundColor: colors.brownColor, height: HEIGHT * 0.05, width: WIDTH * 0.2, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={() => setShowSize(!showSize)}><Text style={{ color: colors.commonWhite, fontWeight: '600' }} ></Text></Pressable>
                    ))} */}

                    {/* {showSize ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.03 }}>
                            <TextInput placeholder="Add Size" style={{ borderWidth: 0.5, height: HEIGHT * 0.056, borderRadius: 10, width: WIDTH * 0.3, paddingLeft: WIDTH * 0.05 }} />
                            <TextInput placeholder="Add price" style={{ borderWidth: 0.5, height: HEIGHT * 0.056, borderRadius: 10, width: WIDTH * 0.3, paddingLeft: WIDTH * 0.05 }} />
                            <Pressable style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: colors.brownColor, alignItems: 'center', width: WIDTH * 0.2, height: HEIGHT * 0.056, borderRadius: 10 }}><Text style={{ color: colors.commonWhite }}>Add</Text></Pressable>
                        </View> : <>
                        </>}


                    <Pressable onPress={() => setShowSugar(!showSugar)} style={{ backgroundColor: colors.brownColor, height: HEIGHT * 0.05, width: WIDTH * 0.2, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}><Text style={{ color: colors.commonWhite, fontWeight: '600' }} >Sugar</Text></Pressable>
                    {showSugar ?

                        <FlatList
                            data={sugarSelectionArray}
                            scrollEnabled={false}
                            numColumns={2}
                            keyExtractor={(sugar) => sugar.id.toString()}
                            renderItem={(sugar) => (
                                <Pressable style={{ height: HEIGHT * 0.05, width: WIDTH * 0.25, borderRadius: 10, alignItems: 'center', justifyContent: 'center', margin: WIDTH * 0.02, backgroundColor: `${colors.brownColor}90` }}><Text style={{ color: colors.commonWhite }}>{sugar.item.name}</Text></Pressable>
                            )}
                            contentContainerStyle={{ justifyContent: 'flex-end' }} />

                        : <>
                        </>}

                    <Pressable style={{ backgroundColor: colors.brownColor, height: HEIGHT * 0.05, width: WIDTH * 0.2, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={() => setShowFlavors(!showFlavors)}><Text style={{ color: colors.commonWhite, fontWeight: '600' }} >Flavors</Text></Pressable>
                    <View style={{ display: 'flex', gap: 10, marginTop: HEIGHT * 0.01 }}>
                        {showFlavors ?
                            <FlatList
                                data={flavorsArray}
                                scrollEnabled={false}
                                numColumns={3}
                                keyExtractor={(flavor) => flavor.id.toString()}
                                renderItem={(flavor) => (
                                    <Pressable style={{ height: HEIGHT * 0.05, width: WIDTH * 0.22, borderRadius: 10, alignItems: 'center', justifyContent: 'center', margin: WIDTH * 0.02, backgroundColor: `${colors.brownColor}90` }}><Text style={{ color: colors.commonWhite }}>{flavor.item.name}</Text></Pressable>
                                )}
                                contentContainerStyle={{ justifyContent: 'flex-end' }} />

                            : <>
                            </>}
                    </View> */}

                </View>
                {/*<View style={{ marginTop: HEIGHT * 0.01, flexDirection: 'row' }}>
                    <Pressable style={{ backgroundColor: colors.brownColor, height: HEIGHT * 0.056, width: WIDTH * 0.2, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: HEIGHT * 0.01 }}><Text style={{ fontWeight: '600', color: colors.commonWhite, }}>Add</Text></Pressable>
                </View> */}
                <View style={{ marginTop: HEIGHT * 0.02 }}>
                    <Text style={{ marginBottom: HEIGHT * 0.005, fontSize: 16 }}>Product Image</Text>
                    <Pressable onPress={handleImagePick} style={{ borderWidth: 0.2, borderRadius: 5, padding: WIDTH * 0.03, backgroundColor: colors.lightGray }}><Text>Select Image</Text>
                    </Pressable>
                    {image && (
                        <Image source={{ uri: image }}
                            style={{ width: WIDTH * 0.8, height: HEIGHT * 0.2, marginTop: HEIGHT * 0.02, borderRadius: 10 }} />)}
                </View>

            </ScrollView>
            <Pressable
                style={{ position: 'absolute', height: HEIGHT * 0.07, width: WIDTH * 0.9, bottom: HEIGHT * 0.04, backgroundColor: colors.brownColor, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={handleSubmit}>
                <Text style={{ fontWeight: '600', color: colors.whiteColor, fontSize: 18 }}>Add Product</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default AddProductComponent;
