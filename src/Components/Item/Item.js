import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const Item = props => {
    return (
        <Pressable onPress={props.onItemPressed}>
            <View style={props.style}>
                <Text style={{ padding: 5, color: "#fff" }} >
                    {props.itemName}
                </Text>
            </View>
        </Pressable>
    )
}

export default Item;