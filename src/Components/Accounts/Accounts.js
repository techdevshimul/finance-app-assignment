import React, { useState } from 'react'
import { addAccount, loadAccounts, loadCategories, selectedAccount } from '../../redux/actionCreators';
import { connect } from 'react-redux'
import { View, StyleSheet, Pressable, Text } from 'react-native';
import InputAccount from './InputAccount/InputAccount';
import AccountList from './AccountList/AccountList';
import { navigate } from '../NavigationRoot';
import { Alert } from 'react-native';

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId,
        accounts: state.accounts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addAccount: account => dispatch(addAccount(account)),
        loadAccounts: () => dispatch(loadAccounts()),
        selectedAccount: account => dispatch(selectedAccount(account)),
        loadCategories: () => dispatch(loadCategories())
    }
}

const Accounts = props => {

    const [inputValue, setInputValue] = useState("");

    const handleAddingAccount = () => {
        if (inputValue != "") {
            props.addAccount({
                value: inputValue
            })
            setInputValue("");
        } else {
            Alert.alert('Invalid Input!', 'Please Enter Account Name.');
        }
    }
    const handleSelectedAccount = key => {
        const account = props.accounts.find(account => {
            return account.key === key
        });
        props.selectedAccount(account);
        props.loadCategories();
        navigate("Categories");
    }

    return (
        <View style={styles.container}>
            <View>
                <InputAccount
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    addAccount={props.addAccount}
                />
                <View>
                    <Pressable style={styles.btn} onPress={() => {
                        handleAddingAccount();
                    }} >
                        <Text style={styles.txt}>Add New Account</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.hr} />
            <Text style={{ textAlign: "center", padding: 5, fontWeight: "bold", fontSize: 20 }}>All Accounts :</Text>
            <AccountList accounts={props.accounts} handleSelectedAccount={handleSelectedAccount} />

        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);

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
        backgroundColor: "#FFC107",
        padding: 10,
        borderRadius: 10,
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