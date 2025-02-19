/* eslint-disable react-native/no-inline-styles */
import { View, Text, Alert, Pressable, Image, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { backIcon, plusIcon } from '../assets/icons';
import { colors } from '../constants/colors';

const AddStockComponent = (props) => {
    const { item, setLoading, edit, setIsVisible, isVisible } = props;
    // console.log(item.types, 'stock types');
    const [formData, setFormData] = useState<{ product: string; stock: number; }>({ product: item.product || '', stock: item.stock || 0 });
    const [errors, setErrors] = useState({});
    const [update, setUpdate] = useState<boolean>();
    const [isEdit, setIsEdit] = useState<boolean>(edit);
    const [attributes, setAttributes] = useState(item?.types ? Object.entries(item.types).map(([name, value]) => ({ name, value })) : []);
    const [attributeName, setAttributeName] = useState<string>('');
    const [attributeValue, setAttributeValue] = useState<string>('');


    const handleSubmit = async () => {
        setLoading(true);
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = `${key} field is required`;
            }
        });
        if (Object.keys(newErrors).length > 0) {

            setErrors(newErrors);
            setLoading(false);
            return;

        }
        const attributesObject = attributes.reduce((acc, attr) => {
            if (attr.name.trim()) {
                acc[attr.name] = attr.value;
            }
            return acc;
        }, {});
        if (item.itemId) {
            try {
                setUpdate(true);
                console.log('pressed5??????')
                await firestore().collection('items').doc(item.itemId).update({
                    stock: parseInt(formData.stock, 10),
                    product: item,
                    types: attributesObject,
                });
                Alert.alert('Stock is Updated');
                setIsVisible(!isVisible);
                setLoading(false);
                setUpdate(false);
            } catch (error) {
                console.log('error while updating stock', error);
                Alert.alert('Stock is not updated');
                setLoading(false);
                setUpdate(false);
            }
        }
        else {
            try {
                console.log('pressed5??????')
                setUpdate(true);
                await firestore().collection('items').add({
                    stock: parseInt(formData.stock, 10),
                    product: item,
                    types: attributesObject,
                });
                Alert.alert('Stock is added');
                setIsVisible(!isVisible);
                setLoading(false);
                setUpdate(false);
            } catch (error) {
                console.log('Error occured while adding data', error);
                Alert.alert('Stock is not added');
                setLoading(false);
                setUpdate(false);
            }
        }

    };
    const addAttribute = () => {
        if (attributeName.trim() && attributeValue.trim()) {
            setAttributes([...attributes, { name: attributeName, value: attributeValue }]);
            setAttributeName('');
            setAttributeValue('');
        } else {
            Alert.alert('Both Fields in attribute are required');
        }
    };

    const deleteAttribute = (id: number) => {
        const updatedAttribute = [...attributes];
        updatedAttribute.splice(id, 1);
        setAttributes(updatedAttribute);
    };

    const onChangeText = (value: any, key: string) => {
        if (key === 'stock') {
            value = value.replace(/[^0-9]/g, '');
        }
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: WIDTH * 0.05 }}>
            <View style={{ flexDirection: 'row', marginTop: HEIGHT * 0.06 }}>
                <Pressable onPress={() => setIsVisible(!isVisible)}>
                    <Image source={backIcon} />
                </Pressable>
                <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: WIDTH * 0.3 }}>Stock Details</Text>
            </View>

            {Object.keys(formData).map((key) => (
                <View key={key}>
                    <Text style={{ marginTop: HEIGHT * 0.02, fontSize: 16 }}>{key}</Text>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: HEIGHT * 0.02 }}> */}

                    <Text style={{ color: colors.redColor, textAlign: 'right' }}>{errors[key]}</Text>
                    {/* </View> */}
                    <TextInput placeholder={`Enter ${key}`} style={{ width: WIDTH * 0.9, height: HEIGHT * 0.056, borderWidth: 1, borderRadius: 5, padding: 5, borderColor: errors[key] ? colors.redColor : colors.commonBlack, backgroundColor: key === 'product' ? `${colors.grayColor}20` : isEdit ? colors.commonWhite : `${colors.grayColor}20` }} autoFocus={true} onChangeText={(text) => onChangeText(text, key)} value={(formData[key]).toString()}
                        // editable={key === 'product' ? false : isEdit}
                        keyboardType="numeric" />
                </View>
            ))}

            {/* attributes */}
            <Text style={{ color: colors.brownColor, fontSize: HEIGHT * 0.03, marginVertical: HEIGHT * 0.01 }}>Attributes</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                {attributes.map((attribute, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.02, marginBottom: HEIGHT * 0.01, backgroundColor: colors.brownColor, height: HEIGHT * 0.05, padding: WIDTH * 0.02, borderRadius: 10, marginRight: WIDTH * 0.04 }}>
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
                    style={{
                        paddingLeft: WIDTH * 0.03, borderRadius: 10, width: WIDTH * 0.35, height: HEIGHT * 0.056, borderWidth: 0.5,
                        // backgroundColor: isEdit ? colors.commonWhite : `${colors.grayColor}20`,
                    }}
                    value={attributeName}
                    onChangeText={(text) => setAttributeName(text)}
                />
                <TextInput
                    placeholder="Attribute Value"
                    style={{
                        paddingLeft: WIDTH * 0.03, borderRadius: 10, width: WIDTH * 0.35, height: HEIGHT * 0.056, borderWidth: 0.5,
                        // backgroundColor: isEdit ? colors.commonWhite : `${colors.grayColor}20`,
                    }}
                    value={attributeValue}
                    onChangeText={(text) => setAttributeValue(text)}
                />
                <Pressable style={{ width: WIDTH * 0.1, backgroundColor: colors.commonBlack, height: WIDTH * 0.1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={addAttribute}>
                    <Image source={plusIcon} />
                </Pressable>
            </View>
            {/*  */}
            <Pressable style={{ position: 'absolute', bottom: HEIGHT * 0.05, width: WIDTH * 0.9, alignItems: 'center', height: HEIGHT * 0.056, alignSelf: 'center', backgroundColor: colors.brownColor, justifyContent: 'center', borderRadius: 10 }} onPress={handleSubmit}>
                {update ? <ActivityIndicator color={colors.commonWhite} /> : <Text style={{ color: colors.commonWhite, fontWeight: '600' }} >{isEdit ? 'Update Stock' : 'Edit Stock'}</Text>}
            </Pressable>
        </View>
    );
};

export default AddStockComponent;
