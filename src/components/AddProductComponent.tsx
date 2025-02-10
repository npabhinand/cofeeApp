/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, TextInput, Image, Pressable, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { backIcon, deleteIcon } from '../assets/icons';
import { colors } from '../constants/colors';
import firebase from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import { productProp } from '../constants/types/commonTypes';

const AddProductComponent: React.FC<productProp> = (props) => {
    const { setModalVisible, item, setUpdate, update } = props;
    const [attributes, setAttributes] = useState([
        { id: Date.now(), placeholder: 'Add Attribute', value: '' }
    ]);
    const [formData, setFormData] = useState({
        product: item?.product || '',
        coffeeType: item?.coffeeType || '',
        description: item?.description || '',
    });
    const [image, setImage] = useState<string>(item?.image || '');
    const [errors, setErrors] = useState<any>({});

    const handleTextChange = (text: string, key: string) => {
        if (key === 'smallPrice' || key === 'mediumPrice' || key === 'largePrice') {
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
                await firebase().collection('coffeeItem').doc(item.id).update({
                    product: formData.product,
                    coffeeType: formData.coffeeType,
                    description: formData.description,
                    image: image,
                    attributes: attributes.map(attr => ({ name: attr.placeholder, value: attr.value }))
                });
                Alert.alert('Coffee Item updated Successfully');
            } else {
                await firebase().collection('coffeeItem').add({
                    product: formData.product,
                    coffeeType: formData.coffeeType,
                    description: formData.description,
                    image: image,
                    attributes: attributes.map(attr => ({ name: attr.placeholder, value: attr.value }))
                });
                Alert.alert('Product Added Successfully');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Failed to save Coffee Item');
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
        setAttributes([...attributes, { id: Date.now(), placeholder: 'Add Attribute', value: '' }]);
    };

    const deleteAttribute = (id) => {
        setAttributes(attributes.filter((attribute) => attribute.id !== id));
    };

    const handleChange = (id, newValue) => {
        setAttributes(attributes.map(attr =>
            attr.id === id ? { ...attr, value: newValue } : attr
        ));
    };

    const finalizeAttributes = () => {
        const attributeValues = attributes.map(attr => attr.value);
        console.log('Final Attribute Values:', attributeValues);
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
                            placeholder={'Type here'}
                            style={{
                                height: key === 'description' ? HEIGHT * 0.15 : HEIGHT * 0.055,
                                borderWidth: 0.5,
                                borderRadius: 5,
                                paddingLeft: WIDTH * 0.03,
                                borderColor: errors[key] ? colors.redColor : colors.commonBlack,
                            }}
                            multiline={key === 'description'}
                            value={formData[key]}
                            onChangeText={(text) => handleTextChange(text, key)}
                            keyboardType={key === 'smallPrice' || key === 'mediumPrice' || key === 'largePrice' ? 'numeric' : 'default'}
                        />
                    </View>
                ))}

                <Text style={{ color: colors.brownColor, fontSize: HEIGHT * 0.03, marginVertical: HEIGHT * 0.01 }}>Attributes</Text>
                <View style={{ gap: HEIGHT * 0.01 }}>
                    <Pressable onPress={addAttribute}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            backgroundColor: colors.brownColor,
                            alignItems: 'center',
                            width: WIDTH * 0.3,
                            height: HEIGHT * 0.056,
                            borderRadius: 10,
                        }}
                    >
                        <Text style={{ color: colors.commonWhite }}>Add Columns</Text>
                    </Pressable>

                    {attributes.map((attribute) => (
                        <View key={attribute.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: HEIGHT * 0.01, gap: WIDTH * 0.02 }}>
                            <TextInput
                                placeholder={attribute.placeholder}
                                style={{ paddingLeft: WIDTH * 0.03, borderRadius: 10, width: WIDTH * 0.35, height: HEIGHT * 0.056, borderWidth: 0.5 }}
                                value={attribute.value}
                                onChangeText={text => handleChange(attribute.id, text)}
                            />
                            <Pressable onPress={() => deleteAttribute(attribute.id)}><Image source={deleteIcon} /></Pressable>
                        </View>
                    ))}

                    <Pressable
                        onPress={finalizeAttributes}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            backgroundColor: colors.brownColor,
                            alignItems: 'center',
                            width: WIDTH * 0.4,
                            height: HEIGHT * 0.056,
                            borderRadius: 10,
                        }}

                    >
                        <Text style={{ color: colors.commonWhite }}>Add Attributes</Text>
                    </Pressable>
                    {/* {attributeValues.map((values, index) => (
                        <View>
                            <Text>{values}</Text>
                            <TextInput placeholder={values} />
                        </View>
                    ))} */}
                </View>

                <View style={{ marginTop: HEIGHT * 0.02 }}>
                    <Text style={{ marginBottom: HEIGHT * 0.005, fontSize: 16 }}>Product Image</Text>
                    <Pressable
                        onPress={handleImagePick}
                        style={{
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: WIDTH * 0.03,
                            backgroundColor: colors.lightGray,
                        }}
                    >
                        <Text>Select Image</Text>
                    </Pressable>
                    {image && (
                        <Image
                            source={{ uri: image }}
                            style={{
                                width: WIDTH * 0.8,
                                height: HEIGHT * 0.2,
                                marginTop: HEIGHT * 0.02,
                                borderRadius: 10,
                            }}
                        />
                    )}
                </View>
            </ScrollView>

            <Pressable
                style={{
                    position: 'absolute',
                    height: HEIGHT * 0.07,
                    width: WIDTH * 0.9,
                    bottom: HEIGHT * 0.04,
                    backgroundColor: colors.brownColor,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                }}
                onPress={handleSubmit}
            >
                <Text style={{ fontWeight: '600', color: colors.whiteColor, fontSize: 18 }}>Add Product</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default AddProductComponent;
