/* eslint-disable react-native/no-inline-styles */
import { View, TextInput, Pressable, Image } from 'react-native';
import React from 'react';
import { HEIGHT, WIDTH } from '../constants/dimension';
import { deleteIcon } from '../assets/icons';

const AttributeInputText = (props) => {
    const { item, deleteAttribute } = props;
    console.log(item)
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: HEIGHT * 0.02, gap: WIDTH * 0.02 }}>
            <TextInput placeholder={item.placeholder} style={{ paddingLeft: WIDTH * 0.03, borderRadius: 10, width: WIDTH * 0.35, height: HEIGHT * 0.056, borderWidth: 0.5 }} />
            <Pressable onPress={deleteAttribute}><Image source={deleteIcon} /></Pressable>
        </View>
    );
};

export default AttributeInputText;
