import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native';

const InputIncomeAndExpense = props => {
    return (
        <View style={styles.inputView}>
            <View
            //  style={styles.inputs}
            >
                <TextInput
                    style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        borderColor: "gray",
                        padding: 7
                    }}
                    placeholder='Amount Of Inc/Exp...'
                    value={props.inputValue}
                    onChangeText={text => props.setInputValue(text)} />
                <TextInput
                    style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        borderColor: "gray",
                        padding: 7
                    }}
                    placeholder='Description Of Inc/Exp...'
                    value={props.inputValue2}
                    onChangeText={text => props.setInputValue2(text)} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        padding: 10,
        width: "100%",
        marginTop: 0
    },
    inputs: {
        marginTop: 10,
        flex: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    }
});

export default InputIncomeAndExpense