import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import Item from '../../Item/Item';

const AccountList = props => {
    let accounts = null;
    if (props.accounts.length != 0) {
        accounts = (<FlatList
            data={props.accounts}
            renderItem={info => (
                <Item
                    itemName={info.item.value}
                    onItemPressed={() => props.handleSelectedAccount(info.item.key)} style={styles.listItem} />
            )}
            keyExtractor={(item, index) => index.toString()}
        />)
    } else {
        accounts = (<Text style={{ textAlign: "center", fontWeight: "bold", color: "#DC3545", padding: 2 }}>Please Create Atleast One Account To Use This App!</Text>)
    }
    return (
        <View style={styles.container}>
            {accounts}
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
        backgroundColor: "#007BFF",
        borderRadius: 10,
        fontWeight: "bold"
    }
});

export default AccountList;
