/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';

import { colors } from '../constants/colors';
import { HEIGHT, WIDTH } from '../constants/dimension';
import AddComponent from './AddComponent';
import { shopProps } from '../constants/types/commonTypes';
import AddTableComponent from './AddTableComponent';

const RenderItem: React.FC<shopProps> = props => {
    const { item, setUpdate, modalShow } = props;
    const [isVisible, setIsVisible] = useState(false);
    return (
        <Pressable
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: WIDTH * 0.9,
                height: 120,
                marginTop: HEIGHT * 0.02,
                alignSelf: 'center',
                borderRadius: 10,
                padding: 10,
                shadowColor: colors.commonBlack,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
                backgroundColor: colors.commonWhite,
            }}
            onPress={() => setIsVisible(!isVisible)}>
            <Image
                source={{ uri: item.image }}
                style={{ width: WIDTH * 0.25, height: 100, borderRadius: 10 }}
            />
            <View style={{ gap: 5, paddingLeft: WIDTH * 0.05 }}>
                <Text
                    style={{ fontWeight: '600', fontSize: 18, color: colors.brownColor }}>
                    {item.name}
                </Text>
                <Text style={{ color: colors.grayColor }}>{item.time}</Text>
                <Text style={{ fontSize: 16 }}>{item.place}</Text>
            </View>
            {modalShow === 'modal' ? (
                <Modal visible={isVisible} animationType="slide">
                    <AddComponent
                        setIsVisible={setIsVisible}
                        isVisible={isVisible}
                        setUpdate={setUpdate}
                        item={item}
                    />
                </Modal>
            ) : (
                <Modal visible={isVisible} animationType="slide">
                    <AddTableComponent
                        setIsVisible={setIsVisible}
                        isVisible={isVisible}
                        setUpdate={setUpdate}
                        item={item}
                    />
                </Modal>
            )}
        </Pressable>
    );
};

export default RenderItem;
