/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Image, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native';
import firebase from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';

import { HEIGHT, WIDTH } from '../constants/dimension';
import { backIcon } from '../assets/icons';
import { colors } from '../constants/colors';
import { productProp } from '../constants/types/commonTypes';

const AddProductComponent: React.FC<productProp> = (props) => {
    const { setModalVisible, item, setUpdate, update } = props;
    const [formData, setFormData] = useState({
        product: item?.product || '',
        coffeeType: item?.coffeeType || '',
        description: item?.description || '',
        price: item?.price || '',
    });

    const [image, setImage] = useState<string>(item?.image || '');
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    // const [attributes, setAttributes] = useState(item?.types ? Object.entries(item.types).map(([name, value]) => ({ name, value })) : []);
    // const [attributeName, setAttributeName] = useState('');
    // const [attributeValue, setAttributeValue] = useState('');

    const handleTextChange = (text: string, key: string) => {
        setFormData((prev) => ({ ...prev, [key]: text }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
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

        // const attributesObject = attributes.reduce((acc, attr) => {
        //     if (attr.name.trim()) {
        //         acc[attr.name] = attr.value;
        //     }
        //     return acc;
        // }, {});

        try {
            setLoading(true);
            if (item?.id) {
                await firebase().collection('products').doc(item.id).update({
                    ...formData,
                    image,
                    // types: attributesObject,
                });
                Alert.alert('Coffee Item updated Successfully');
            } else {
                setLoading(true);
                await firebase().collection('products').add({
                    ...formData,
                    deleted: false,
                    image,
                    // types: attributesObject,
                });
                Alert.alert('Product Added Successfully');
            }
        } catch (error) {
            setLoading(false);
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

    // const addAttribute = () => {
    //     if (attributeName.trim() && attributeValue.trim()) {
    //         setAttributes([...attributes, { name: attributeName, value: attributeValue }]);
    //         setAttributeName('');
    //         setAttributeValue('');
    //     } else {
    //         Alert.alert('Both attribute name and value are required');
    //     }
    // };

    // const deleteAttribute = (index: number) => {
    //     const updatedAttributes = [...attributes];
    //     updatedAttributes.splice(index, 1);
    //     setAttributes(updatedAttributes);
    // };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: WIDTH * 0.05, marginBottom: HEIGHT * 0.02 }}>
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
                            placeholder="Type here"
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
                        />
                    </View>
                ))}
                {/* attribute */}
                {/* <Text style={{ color: colors.brownColor, fontSize: HEIGHT * 0.03, marginVertical: HEIGHT * 0.01 }}>Attributes</Text>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                    {attributes.map((attribute, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.02, marginBottom: HEIGHT * 0.01, backgroundColor: colors.brownColor, height: HEIGHT * 0.05, padding: WIDTH * 0.02, borderRadius: 10, marginRight: WIDTH * 0.05 }}>
                            <Text style={{ color: colors.commonWhite }}>{attribute.name}</Text>
                            <Text style={{ color: colors.commonWhite }}>{attribute.value}</Text>
                            <Pressable onPress={() => deleteAttribute(index)}>
                                <Text style={{ color: colors.commonWhite, fontWeight: '600' }}>X</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.02, marginBottom: HEIGHT * 0.01 }}>
                    <TextInput
                        placeholder="Attribute Name"
                        style={{ paddingLeft: WIDTH * 0.03, borderRadius: 10, width: WIDTH * 0.35, height: HEIGHT * 0.056, borderWidth: 0.5 }}
                        value={attributeName}
                        onChangeText={(text) => setAttributeName(text)}
                    />
                    <TextInput
                        placeholder="Attribute Value"
                        style={{ paddingLeft: WIDTH * 0.03, borderRadius: 10, width: WIDTH * 0.35, height: HEIGHT * 0.056, borderWidth: 0.5 }}
                        value={attributeValue}
                        onChangeText={(text) => setAttributeValue(text)}
                    />
                    <Pressable style={{ width: WIDTH * 0.1, backgroundColor: colors.commonBlack, height: WIDTH * 0.1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={addAttribute}>
                        <Image source={plusIcon} />
                    </Pressable>
                </View> */}
                {/*  */}

                <View style={{ marginTop: HEIGHT * 0.02 }}>
                    <Text style={{ marginBottom: HEIGHT * 0.005, fontSize: 16 }}>Product Image</Text>
                    <Pressable
                        onPress={handleImagePick}
                        style={{
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: WIDTH * 0.02,
                            backgroundColor: colors.lightGray,
                        }}
                    >
                        {image ? <Image source={{ uri: image }} style={{ height: HEIGHT * 0.2, width: WIDTH * 0.88 }} /> : <Text>Pick Image</Text>}
                    </Pressable>
                </View>
            </ScrollView>
            <Pressable
                style={{
                    height: HEIGHT * 0.07,
                    width: WIDTH * 0.9,
                    bottom: HEIGHT * 0.01,
                    backgroundColor: colors.brownColor,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                }}
                onPress={handleSubmit}
            >{loading ? <ActivityIndicator size={'large'} color={colors.commonWhite} /> :
                <Text style={{ fontWeight: '600', color: colors.whiteColor, fontSize: 18 }}>Add Product</Text>
                }

            </Pressable>
        </SafeAreaView>
    );
};

export default AddProductComponent;
