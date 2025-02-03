/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../constants/colors';
import { backIcon } from '../assets/icons';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { addressProps } from '../constants/types/commonTypes';



const AddAddressComponent: React.FC<addressProps> = (props) => {

    const { id, name, address, phone, setUpdate, update } = props;
    const { setModalVisible } = props;
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState<addressProps>({ name: name || '', phone: phone || null, address: address || '' });

    const AddOrUpdateAddress = async () => {
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = `${key} is required `;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Alert.alert('Failed to update address');
            return;
        };

        if (id) {
            try {
                await firestore().collection('address').doc(id).update({
                    name: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    selected: false,
                });
                Alert.alert('Address updated Successfully');
            } catch (error) {
                console.error('Error updating address to Firestore:', error);
                Alert.alert('Failed to update address');
            }
        } else {
            try {
                await firestore().collection('address').add({
                    name: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    selected: false,
                });
                Alert.alert('Address Added Successfully');
            } catch (error) {
                console.error('Error adding address to Firestore:', error);
                Alert.alert('Failed to add address');
            }
        }
        setModalVisible(false);
        setUpdate(!update);
    };

    const onChangeText = (key: string, value: string) => {
        if (key === 'phone') {
            value = value.replace(/[^0-9]/g, '');
        }
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.whiteColor, paddingHorizontal: WIDTH * 0.05 }}>
            <View style={{ flexDirection: 'row', marginTop: HEIGHT * 0.1 }}>
                <Pressable onPress={() => setModalVisible(false)}>
                    <Image source={backIcon} />
                </Pressable>
                <Text style={{ fontWeight: '600', fontSize: HEIGHT * 0.02, marginLeft: WIDTH * 0.2 }}>Add New Address</Text>
            </View>
            <View style={{ marginTop: HEIGHT * 0.04, gap: HEIGHT * 0.01 }}>
                {Object.keys(formData).map((key) => (
                    <View key={key}>
                        <Text style={{ fontWeight: '600', marginBottom: HEIGHT * 0.01 }}>{key}</Text>
                        <TextInput placeholder="Type Here" style={{ width: WIDTH * 0.9, borderWidth: 1, height: key === 'address' ? HEIGHT * 0.15 : HEIGHT * 0.055, paddingLeft: WIDTH * 0.05, borderRadius: 5, borderColor: errors[key] ? colors.redColor : colors.commonBlack }} onChangeText={(text) => onChangeText(key, text)} value={formData[key]} multiline={key === 'address' ? true : false} keyboardType={key === 'phone' ? 'numeric' : 'default'}
                        />
                    </View>
                ))}
            </View>
            <Pressable style={{ position: 'absolute', width: WIDTH * 0.9, height: HEIGHT * 0.06, bottom: HEIGHT * 0.04, backgroundColor: colors.brownColor, alignSelf: 'center', justifyContent: 'center', borderRadius: 10 }}
                onPress={AddOrUpdateAddress}>
                <Text style={{ color: colors.commonWhite, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>{id ? 'update Address' : 'Add New Address'}</Text>
            </Pressable>
        </View>
    );
};

// const dataUI = [{ }, { }, { }]
export default AddAddressComponent;
