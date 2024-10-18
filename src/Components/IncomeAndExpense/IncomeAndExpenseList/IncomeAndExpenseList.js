import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import IncomeAndExpenseItem from '../IncomeAndExpenseItem/IncomeAndExpenseItem';

const IncomeAndExpenseList = props => {
    let listItem = null;

    let incExplist = [...props.list].reverse();
    console.log(incExplist);

    if (incExplist && incExplist.length !== 0) {
        listItem = (<FlatList
            data={incExplist}
            renderItem={info => (
                <IncomeAndExpenseItem
                    itemValue={info.item.value} itemDesc={info.item.desc} itemDate={info.item.date} />
            )}
            keyExtractor={(item, index) => index.toString()}
        />)
    } else {
        listItem = (<Text style={{ textAlign: "center", fontWeight: "bold", color: "#DC3545", padding: 2 }}>Add Your Income And Expenses Now!</Text>)
    }
    return (
        <View style={styles.container}>
            {listItem}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default IncomeAndExpenseList;
