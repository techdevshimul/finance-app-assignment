import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground, Pressable, Alert } from 'react-native';
import backgroundImage from "../../../assets/icon.png";
import { tryAuth } from '../../redux/actionCreators';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const mapDispatchToProps = dispach => {
    return {
        tryAuth: (email, password, mode) => dispach(tryAuth(email, password, mode))
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth
    }
}

const Login = props => {
    const [authStates, setAuthStates] = useState({
        mode: "login",
        inputs: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const isFocused = useIsFocused();

    useEffect(() => {
        setAuthStates({
            ...authStates,
            inputs: {
                email: "",
                password: "",
                confirmPassword: ""
            }
        })
    }, [isFocused]);

    const switchViews = () => {
        setAuthStates({
            ...authStates,
            mode: authStates.mode === "login" ? "signup" : "login",
            inputs: {
                email: "",
                password: "",
                confirmPassword: ""
            }
        })
    }

    const updateInputs = (value, name) => {
        setAuthStates({
            ...authStates,
            inputs: {
                ...authStates.inputs,
                [name]: value
            }
        })
    }

    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const handleAuth = () => {
        const email = authStates.inputs.email;
        const password = authStates.inputs.password;
        const confirmPassword = authStates.inputs.confirmPassword;

        if (email !== "" & password !== "") {
            if (re.test(email)) {
                if (authStates.mode === "login") {
                    props.tryAuth(email, password, "login");

                } else {
                    if (confirmPassword === password) {
                        props.tryAuth(email, password, "signup");

                    } else {
                        Alert.alert("Invalid Input!", "Password Fields Doesn't Match!")
                    }
                }
            } else {
                Alert.alert("Invalid Input!", "Invalid Email!")
            }
        } else {
            Alert.alert("Invalid Input!", "Input All The Fields!")
        }
    }

    let confirmPassField = null;
    if (authStates.mode === "signup") {
        confirmPassField = (
            <TextInput placeholder='Confirm Password'
                value={authStates.inputs.confirmPassword} style={styles.input} onChangeText={value => updateInputs(value, "confirmPassword")} />
        )
    }

    return (
        // <ImageBackground
        //     source={backgroundImage}
        //     style={{ flex: 1, width: "100%" }}
        //     blurRadius={5}>
        <View style={styles.loginView}>
            <Pressable
                style={{ ...styles.btnContainer, width: "85%", backgroundColor: "#007BFF" }}
                onPress={() => switchViews()}
            >
                <Text style={styles.btnStyle}>
                    {authStates.mode === "login" ? "Switch To Sign Up" : "Switch To Log In"}
                </Text>
            </Pressable>
            <TextInput placeholder='Your Email Address..'
                value={authStates.inputs.email} style={styles.input} onChangeText={value => updateInputs(value, "email")} />

            <TextInput placeholder='Password'
                value={authStates.inputs.password} style={styles.input} onChangeText={value => updateInputs(value, "password")} />

            {confirmPassField}

            <Pressable style={styles.btnContainer}
                onPress={() => handleAuth()}>
                <Text style={styles.btnStyle}>
                    {authStates.mode === "login" ? "Login" : "Sign Up"}
                </Text>
            </Pressable>

        </View>
        // </ImageBackground>

    )
}

const styles = StyleSheet.create({
    loginView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: "85%",
        padding: 5,
        marginTop: 10,
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
    },
    btnStyle: {
        fontSize: 16,
        color: "#FFF",
        alignSelf: "center"
    },
    btnContainer: {
        flexDirection: "row",
        width: 150,
        paddingVertical: 5,
        backgroundColor: "#28A745",
        borderRadius: 5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);