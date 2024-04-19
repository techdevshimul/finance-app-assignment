import React, { useEffect } from 'react'
import { navigate } from "../NavigationRoot";
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { loadAccounts } from '../../redux/actionCreators';
import { connect } from "react-redux";
import tk from "../../../assets/tk.png"

const mapDispatchToProps = dispatch => {
    return {
        loadAccounts: () => dispatch(loadAccounts())
    }
}

const Home = props => {
    useEffect(() => {
        props.loadAccounts();
    })

    return (
        <View>
            <View style={styles.container}>
                <Image
                    source={tk}
                    style={styles.image}
                />
                <Text style={styles.desc}>This application allows you to put your finance in order: to save data of your incomes and expenses, easily find the corresponding record, provide balance and statistics for the period, the data can be sent to e-mail as an excel file. No ads or paid content. Created for myself, I have been using for more than a month. Good luck and financial well-being!
                </Text>
                <Pressable style={styles.btn}
                    onPress={() => {
                        navigate("Accounts");
                    }}
                >
                    <Text style={styles.txt}>Go To Accounts</Text>
                </Pressable>
            </View>
        </View >

    )
}

export default connect(null, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 10
    },
    btn: {
        padding: 10,
        width: "100%",
        marginTop: 0,
    },
    txt: {
        backgroundColor: "#28A745",
        padding: 10,
        borderRadius: 10,
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15
    },
    desc: {
        padding: 10,
        borderRadius: 10,
        textAlign: "justify",
        fontWeight: "bold",
        fontSize: 16,
    },
    image: {
        width: "100%",
        height: 300
    }
})