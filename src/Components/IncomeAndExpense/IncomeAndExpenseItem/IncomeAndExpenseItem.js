import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import dateFormat from "dateformat";

const IncomeAndExpenseItem = props => {
    let styles = null;
    if (props.itemValue < 0) {
        styles = StyleSheet.create({
            listItem: {
                padding: 10,
                marginLeft: 10,
                marginRight: 10,
                marginTop: 5,
                backgroundColor: "#DC3545",
                borderRadius: 10,
                fontWeight: "bold"
            }
        })
    } else {
        styles = StyleSheet.create({
            listItem: {
                padding: 10,
                marginLeft: 10,
                marginRight: 10,
                marginTop: 5,
                backgroundColor: "#28A745",
                borderRadius: 10,
                fontWeight: "bold"
            }
        })
    }

    return (
        <View style={styles.listItem}>
            <Text style={{ padding: 5, color: "#fff" }} >
                {props.itemValue} ৳ {"\n"}Description : {props.itemDesc} {"\n"}Date : {dateFormat(props.itemDate, "dS mmmm yyyy, h:MM TT")}
            </Text>
        </View>
    )
}

export default IncomeAndExpenseItem;