/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Pressable, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { backIcon } from '../../assets/icons';


const CommentListScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', paddingHorizontal: WIDTH * 0.1, marginVertical: HEIGHT * 0.01 }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={backIcon} />
                </Pressable>
                <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: WIDTH * 0.3 }}>Comments</Text>
            </View>
        </SafeAreaView>
    );
};

export default CommentListScreen;
