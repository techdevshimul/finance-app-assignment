import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Pressable, Text, Alert } from 'react-native';
import { addCategory, loadAccounts, loadCategories, loadIncomeAndExpense, selectedCategoryFunc } from '../../redux/actionCreators';
import CategoryList from './CategoryList/CategoryList';
import InputCategory from './InputCategory/InputCategory';
import { navigate } from '../NavigationRoot';

const mapStateToProps = state => {
    return {
        selectedAccount: state.selectedAccount,
        selectedCategory: state.selectedCategory,
        accounts: state.accounts,
        categories: state.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCategory: category => dispatch(addCategory(category)),
        selectedCategoryFunc: category => dispatch(selectedCategoryFunc(category)),
        loadIncomeAndExpense: () => dispatch(loadIncomeAndExpense()),
        loadAccounts: () => dispatch(loadAccounts()),
        loadCategories: () => dispatch(loadCategories())
    }
}

const Categories = props => {
    const [inputValue, setInputValue] = useState("");

    const handleSelectedCategory = key => {

        const category = props.categories.find(category => {
            return category.key === key
        });

        props.selectedCategoryFunc(category);
        props.loadIncomeAndExpense();
        navigate("Income And Expense");
    }

    const handleAddingCategory = () => {
        if (inputValue != "") {
            props.addCategory({
                value: inputValue,
            })
            setInputValue("");
            props.loadCategories();
        } else {
            Alert.alert('Invalid Input!', 'Please Enter Category Name.');
        }
    }

    useEffect(() => {
        if (props.selectedAccount) {
            props.navigation.setOptions({
                title: props.selectedAccount.value,
            });
        }
    }, [props.selectedAccount]);

    return (
        <View style={styles.container}>
            <View>
                <InputCategory
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    addCategory={props.addCategory}
                />
                <View>
                    <Pressable style={styles.btn} onPress={() => {
                        handleAddingCategory();
                    }} >
                        <Text style={styles.txt}>Add New Category</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.hr} />
            <Text style={{ textAlign: "center", padding: 5, fontWeight: "bold", fontSize: 20 }}>All Categories :</Text>
            <CategoryList categories={props.categories} handleSelectedCategory={handleSelectedCategory} />

        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

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
        backgroundColor: "#17A2B8",
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