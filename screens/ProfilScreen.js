import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import MainLogin from "../components/Components_Auth/Components_Login/MainLogin";
import {Actions} from "react-native-router-flux/index";

export default class ProfilScreen extends React.Component {
    static navigationOptions = {
        title: "Profil",
    };


    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('Auth')
                    }}
                    title="Login-Screen"
                />
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('Singup')
                    }}
                    title="Singup-Screen"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

