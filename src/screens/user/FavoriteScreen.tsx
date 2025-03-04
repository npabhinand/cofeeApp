/* eslint-disable react-native/no-inline-styles */
import { SafeAreaView, FlatList, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import HeaderComponent from '../../components/HeaderComponent';
import FavouriteRenderItem from '../../components/FavouriteRenderItem';
import { selectedFavorites } from '../../redux/slice/favoriteSlice';
import { colors } from '../../constants/colors';
import { HEIGHT } from '../../constants/dimension';


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
        )}
        ListEmptyComponent={
         
            <Text style={{flexDirection:'row', color:colors.brownColor,fontWeight:'600',
                textAlign:'center',marginTop:HEIGHT*0.35, fontSize:16}}>No Items</Text>
    
        }
      />
    </SafeAreaView>
    );
};

export default FavoriteScreen;
