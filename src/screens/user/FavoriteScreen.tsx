/* eslint-disable react-native/no-inline-styles */
import { SafeAreaView, FlatList } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import HeaderComponent from '../../components/HeaderComponent';
import FavouriteRenderItem from '../../components/FavouriteRenderItem';

import { selectedFavorites } from '../../redux/slice/favoriteSlice';


const FavoriteScreen = () => {


    const favoriteData = useSelector(selectedFavorites);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderComponent header="Favourites" />

            <FlatList
                data={favoriteData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <FavouriteRenderItem item={item} />
                )} />
            {/*  */}
        </SafeAreaView>
    );
};

export default FavoriteScreen;
