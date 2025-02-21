/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { documentIcon, editIcon } from '../assets/icons';
import { colors } from '../constants/colors';
import { HEIGHT, WIDTH } from '../constants/dimension';

const SelectedAddressComponent = (props) => {
    const { item, isSelected } = props;
    const navigation = useNavigation();

    const editAdressArray = [
        { id: 1, icon: editIcon, name: 'Edit Adress', onClick: () => navigation.navigate('AddressScreen') },
        { id: 1, icon: documentIcon, name: 'Add Note', onClick: () => console.log('clicked') },
    ];
    return (

        <View style={{ paddingHorizontal: WIDTH * 0.02 }}>
            <Text style={{ marginTop: HEIGHT * 0.03, fontWeight: '600', fontSize: HEIGHT * 0.018 }}>{item.name}</Text>
            <Text style={{ color: colors.grayColor, marginTop: WIDTH * 0.02 }}>{item.address}</Text>
            <View style={{ flexDirection: 'row', gap: WIDTH * 0.03, marginTop: HEIGHT * 0.02 }}>
                {isSelected === 'Delivery' ? (editAdressArray.map((items, key) => (
                    <Pressable key={key} style={{ flexDirection: 'row', alignItems: 'center', gap: WIDTH * 0.02, borderWidth: 0.5, height: HEIGHT * 0.035, paddingHorizontal: WIDTH * 0.05, borderRadius: WIDTH * 0.04, backgroundColor: colors.commonWhite }} onPress={items.onClick}><Image source={items.icon} /><Text>{items.name}</Text>
                    </Pressable>
                ))) :
                    null}
            </View>
        </View>
    );
};

export default SelectedAddressComponent;
