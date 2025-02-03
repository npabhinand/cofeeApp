/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, TextInput, Image, Pressable, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { backIcon } from '../assets/icons';
import { colors } from '../constants/colors';
import firebase from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import { productProp } from '../constants/types/commonTypes';



const AddProductComponent: React.FC<productProp> = (props) => {
    const { setModalVisible, item, setUpdate, update } = props;
    const [formData, setFormData] = useState({
        product: item?.product || '',
        coffeeType: item?.coffeeType || '',
        description: item?.description || '',
        smallPrice: item?.type[0]?.price || undefined,
        mediumPrice: item?.type[1]?.price || undefined,
        largePrice: item?.type[2]?.price || undefined,
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
                        type: [{ size: 'S', price: formData.smallPrice },
                        { size: 'M', price: formData.mediumPrice },
                        { size: 'L', price: formData.largePrice }],
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
                    type: [{ size: 'S', price: formData.smallPrice },
                    { size: 'M', price: formData.mediumPrice },
                    { size: 'L', price: formData.largePrice }],
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
    console.log('id--', item?.id);
    return (
        <SafeAreaView style={{ paddingHorizontal: WIDTH * 0.05, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: HEIGHT * 0.1 }}>
                <View style={{ flexDirection: 'row', paddingHorizontal: WIDTH * 0.1, marginVertical: HEIGHT * 0.01 }}>
                    <Pressable onPress={() => setModalVisible(false)}>
                        <Image source={backIcon} />
                    </Pressable>
                    <Text style={{ fontWeight: '600', fontSize: HEIGHT * 0.02, marginLeft: WIDTH * 0.3 }}>Add Product</Text>
                </View>

                {Object.keys(formData).map((key) => (
                    <View key={key} style={{ marginHorizontal: WIDTH * 0.05, marginTop: HEIGHT * 0.02 }}>
                        <Text style={{ marginBottom: HEIGHT * 0.005, fontSize: 16 }}>{key}</Text>
                        <TextInput
                            placeholder={`Type here`} style={{ height: key === 'description' ? HEIGHT * 0.15 : HEIGHT * 0.055, borderWidth: 1, borderRadius: 5, paddingLeft: WIDTH * 0.03, borderColor: errors[key] ? colors.redColor : colors.commonBlack, }}
                            multiline={key === 'description'} value={formData[key]} onChangeText={(text) => handleTextChange(text, key)} keyboardType={key === 'smallPrice' || key === 'mediumPrice' || key === 'largePrice' ? 'numeric' : 'default'} />
                    </View>
                ))}

                <View style={{ marginHorizontal: WIDTH * 0.05, marginTop: HEIGHT * 0.02 }}>
                    <Text style={{ marginBottom: HEIGHT * 0.005, fontSize: 16 }}>Product Image</Text>
                    <Pressable onPress={handleImagePick} style={{ borderWidth: 1, borderRadius: 5, padding: WIDTH * 0.03, backgroundColor: colors.lightGray }}><Text>Select Image</Text>
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
