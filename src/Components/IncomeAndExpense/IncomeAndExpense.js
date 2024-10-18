import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { View, StyleSheet, Pressable, Text, Alert } from 'react-native';
import IncomeAndExpenseList from './IncomeAndExpenseList/IncomeAndExpenseList';
import InputIncomeAndExpense from './InputIncomeAndExpense/InputIncomeAndExpense';
import { addIncomeAndExpense, loadIncomeAndExpense, selectedAccount } from '../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        selectedCategory: state.selectedCategory,
        selectedAccount: state.selectedAccount,
        incomeandexpense: state.incomeandexpense
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIncomeAndExpense: incomeAndExpense => dispatch(addIncomeAndExpense(incomeAndExpense)),
        loadIncomeAndExpense: () => dispatch(loadIncomeAndExpense())
    }
}

const IncomeAndExpense = props => {

    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState("");

    const handleAddingIncomeAndExpense = () => {
        if (inputValue != "" && inputValue2 != "") {
            if (/^-?\d*\.?\d*$/.test(inputValue)) {
                props.addIncomeAndExpense({
                    value: inputValue,
                    desc: inputValue2,
                    date: new Date()
                });
                setInputValue("");
                setInputValue2("");
                props.loadIncomeAndExpense();
            } else {
                Alert.alert('Invalid Input!', 'Please Enter A Valid Number.');
            }
        }
    }

    useEffect(() => {
        if (props.selectedCategory) {
            props.navigation.setOptions({
                title: props.selectedCategory.value + " - " + props.selectedAccount.value,
            });
        }
    }, [props.selectedCategory]);

    return (
        <View style={styles.container}>
            <View>
                <InputIncomeAndExpense
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    inputValue2={inputValue2}
                    setInputValue2={setInputValue2}
                    addIncomeAndExpense={props.addIncomeAndExpense}
                />
                <View>
                    <Pressable style={styles.btn} onPress={() => {
                        handleAddingIncomeAndExpense();
                    }} >
                        <Text style={styles.txt}>Add Inc/Exp</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.hr} />
            <Text style={{ textAlign: "center", padding: 5, fontWeight: "bold", fontSize: 20 }}>All Income And Expenses :</Text>
            <IncomeAndExpenseList list={props.incomeandexpense} />

        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomeAndExpense);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        marginBottom: 10
    },
    btn: {
        padding: 10,
        width: "100%",
        marginTop: 0,
    },
    txt: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 10,
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15
    },
    hr: {
        borderBottomColor: "#343A40",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 10,
        marginBottom: 10,
    }
})