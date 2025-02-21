/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

import { backIcon } from '../assets/icons';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { colors } from '../constants/colors';
import { addShopProps } from '../constants/types/commonTypes';



const AddComponent: React.FC<addShopProps> = (props) => {
    const { item, setIsVisible, isVisible, setUpdate } = props;
    const [formData, setFormData] = useState({ name: item?.name || '', place: item?.place || '', time: item?.time || '', address: item?.address || '' });
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState<string>(item?.image || '');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = `${key} is required`;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        if (item?.id) {
            try {
                setLoading(true);
                await firestore().collection('shops').doc(item?.id).update({
                    ...formData,
                    image,
                });
                Alert.alert('Shop details updated Successfully');
                setUpdate(true);
                setLoading(false);
                setIsVisible(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        else {
            try {
                setLoading(true);
                await firestore().collection('shops').add({
                    ...formData,
                    image,
                });
                Alert.alert('Shop added Successfully');
                setUpdate(true);
                setLoading(false);
                setIsVisible(false);
            }
            catch (error) {
                console.log(error, 'while adding shop');
                setLoading(false);
            }
        }
    };

    const handleImagePick = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.5, includeBase64: true }, (response) => {
            if (response.assets && response.assets[0]) {
                const base64String = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
                setImage(base64String);
            }
        });
    };

    const handleTextChange = (value: string, key: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };
    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: WIDTH * 0.05 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: HEIGHT * 0.02 }}>
                <Pressable onPress={() => setIsVisible(!isVisible)}>
                    <Image source={backIcon} />
                </Pressable>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{item?.id ? 'Update Shop' : 'Add Shop'}</Text>
                <View />
            </View>

            {Object.keys(formData).map((key, index) => (
                <View key={index}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ marginBottom: HEIGHT * 0.01, textTransform: 'capitalize', fontSize: 16 }}>{key}*</Text>
                        <Text style={{ color: colors.redColor }}>{errors[key]}</Text>

                    </View>
                    <TextInput style={{ borderWidth: 0.5, borderRadius: 5, width: WIDTH * 0.9, height: key === 'address' ? HEIGHT * 0.12 : HEIGHT * 0.056, marginBottom: HEIGHT * 0.01, paddingLeft: WIDTH * 0.04, borderColor: errors[key] ? colors.redColor : colors.commonBlack }} onChangeText={(text) => handleTextChange(text, key)} placeholderTextColor={colors.grayColor} placeholder={`Enter ${key}`} value={formData[key]} multiline={key === 'address' ? true : false} />

                </View>
            ))}

            <View style={{ marginTop: HEIGHT * 0.02 }}>
                <Text style={{ marginBottom: HEIGHT * 0.005, fontSize: 16 }}>Shop Image</Text>
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

            <Pressable style={{ position: 'absolute', width: WIDTH * 0.9, height: HEIGHT * 0.06, bottom: HEIGHT * 0.04, backgroundColor: colors.brownColor, alignSelf: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={handleSubmit} >
                {loading ? <ActivityIndicator size={'small'} color={colors.commonWhite} /> :
                    <Text style={{ color: colors.commonWhite, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }} >{item?.id ? 'Update Shop' : 'Add Shop'}</Text>
                }</Pressable>
        </SafeAreaView>
    );
};

export default AddComponent;
