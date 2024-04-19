import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import Item from '../../Item/Item';

const CategoryList = props => {
    let categories = null;

    if (props.categories.length !== 0) {
        categories = (<FlatList
            data={props.categories}
            renderItem={info => (
                <Item
                    itemName={info.item.value}
                    onItemPressed={() => props.handleSelectedCategory(info.item.key)} style={styles.listItem} />
            )}
            keyExtractor={(item, index) => index.toString()}
        />)
    } else {
        categories = (<Text style={{ textAlign: "center", fontWeight: "bold", color: "#DC3545", padding: 2 }}>Please Create Atleast One Category To Use This App!</Text>)
    }
    return (
        <View style={styles.container}>
            {categories}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        backgroundColor: "#6C757D",
        borderRadius: 10,
        fontWeight: "bold"
    }
});

export default CategoryList;
