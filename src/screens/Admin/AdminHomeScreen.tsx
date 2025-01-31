/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, Image, FlatList } from 'react-native';
import React from 'react';
import { profileIcon } from '../../assets/icons';
import { HEIGHT, WIDTH } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import CardRenderItem from '../../components/AdminCardRenderItem';
import { cardArray } from '../../constants/data/dataArray';

const AdminHomeScreen = () => {
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: WIDTH * 0.1, height: HEIGHT * 0.05, marginVertical: HEIGHT * 0.03 }}>
                <View>
                    <Text style={{ fontSize: 9, color: colors.grayColor }}>WELCOME BACK</Text>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Admin</Text>
                </View>
                <Image source={profileIcon} style={{ width: WIDTH * 0.1, height: 'auto' }} />
            </View>
            <FlatList
                data={cardArray}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item) => (
                    <CardRenderItem item={item.item} />
                )}
            />
        </SafeAreaView>
    );
};


export default AdminHomeScreen;
