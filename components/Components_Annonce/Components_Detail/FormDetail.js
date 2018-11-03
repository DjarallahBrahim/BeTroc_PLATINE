import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import {Divider, Icon} from "react-native-elements";
import Adresselocation from "./Adresselocation";


export default class FormDetail extends React.Component {
    static navigationOptions = {
        title: 'FormDetail',
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.information}>
                    <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 10, color:'black', marginTop:10}}>
                        {this.props.title}
                    </Text>
                    <Divider style={{ backgroundColor: '#95a5a6', marginTop:10,marginBottom:10 }} />
                    <Text style={{fontSize: 15, fontWeight: '300', paddingHorizontal: 10, color:'#6f6f6f', }}>
                        One Description for you ! One Description for you ! One Description for you ! One Description for you !
                        One Description for you ! One Description for you !
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    information:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        // borderRadius: 10,
        // backgroundColor:'#f0f0f0',
        margin:10,
        marginLeft:10,


    }
});