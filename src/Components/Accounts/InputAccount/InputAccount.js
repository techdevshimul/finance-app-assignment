import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native';

const InputAccount = props => {
    return (
        <View style={styles.inputView}>
            <TextInput
                style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    borderColor: "gray",
                    padding: 7
                }}
                placeholder='Name Of The Account...'
                value={props.inputValue}
                onChangeText={text => props.setInputValue(text)} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        padding: 10,
        width: "100%",
        marginTop: 0,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center'
    }
});

export default InputAccount