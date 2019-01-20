import React from 'react';
import {
    StyleSheet,
    Text, TouchableHighlight,
    View,
} from 'react-native';
import { Icon } from 'react-native-elements'
import Colors from "../../../constants/Colors";
import CategoriesService from "../../../Services/CategoriesService";

export default class Categoriebutton extends React.Component {


    constructor(props){
        super(props);
        this.state={title:''};
        this.buttonTitleHandler=this.buttonTitleHandler.bind(this);
    }

    buttonTitleHandler(categoryTitle){
        this.setState({title: categoryTitle});
    }
    render() {
        const {navigation} = this.props;
        const {handlerCategory} = this.props;

        return (
            <TouchableHighlight style={styles.container}
                                onPress={() => {
                                      this.props.navigation.navigate('Categorie',{handlerCategory:handlerCategory,
                                                                                navigation: navigation, 'buttonTitleHandler':this.buttonTitleHandler})
                                }}
                                underlayColor={'transparent'}
            >
                <View style={styles.viewStyle}>
                <Icon
                    name='puzzle-piece'
                    type='font-awesome'
                    color={Colors.tintColor}
                    size={25}
                    onPress={() => {
                        this.props.navigation.navigate('Categorie')
                    }} />
                <Text  style={{fontSize:19,fontWeight: '500', color: this.state.title?Colors.tintColor:Colors.grey2}}> {this.state.title || "Catégorie"} </Text>
                <Icon

                    name='angle-right'
                    type='font-awesome'
                    color={'transparent'}
                    size={30}
                    onPress={() =>  this.props.navigation.navigate('Categorie',{data: data, handlerCategory:handlerCategory,
                        navigation: navigation, 'buttonTitleHandler':this.buttonTitleHandler})
                    }/>

                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding:5,
        borderRadius:10
    },
    viewStyle: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    }
});