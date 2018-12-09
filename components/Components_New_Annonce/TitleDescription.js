import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Keyboard, TextInput,
    View,
} from 'react-native';
import Colors from "../../constants/Colors";
import {Divider} from "react-native-elements";

export default class TitleDescription extends React.Component {
    handleKeyDown(e){
        if(e.nativeEvent.key === "Enter"){
            Keyboard.dismiss()
        }
    };



    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{height: 40, marginHorizontal:8}}
                    onChangeText={() => {}}
                    placeholder={"Title"}
                    placeholderTextColor={Colors.grey2}
                    returnKeyType="done"
                    onKeyPress={this.handleKeyDown}
                    underlineColorAndroid="transparent"
                />
                <Divider style={{ backgroundColor: Colors.grey2, height:0.5 }} />
                <TextInput
                    style={{height: 80, margin:8}}
                    onChangeText={() => {}}
                    placeholder={"Déscription"}
                    placeholderTextColor={Colors.grey2}
                    multiline={true}
                    numberOfLines = {6}
                    underlineColorAndroid="transparent"
                    returnKeyType="done"
                    onKeyPress={this.handleKeyDown}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius:10,
        height: 150,
        marginTop:15,
    }
});