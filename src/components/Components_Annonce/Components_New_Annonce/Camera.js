import React from 'react';
import {Text, View, TouchableOpacity, TouchableHighlight, Image, StyleSheet,Platform} from 'react-native';
import {Camera, Permissions, ImagePicker, ImageManipulator} from 'expo';
import Icon from '@expo/vector-icons/FontAwesome';
import Colors from "../../../constants/Colors";
import flipImage from '../../../../assets/images/flipcamera.png'
import Layout from "../../../constants/Layout";
import renderIf from './renderif'
import Spinner from "react-native-loading-spinner-overlay";
export default class CameraAdd extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            imageURI : '',
            takedPic: false,
            spinner:false
        }
    }


    handlerSpinner() {
        console.log('SPINNNEEERR')
        this.setState({
            spinner: !this.state.spinner
        });

    }
     cropImage(pickedImage){
        console.log(pickedImage.height,pickedImage.width);
         let resizeObj = {};
         if (pickedImage.height > pickedImage.width) {
             resizeObj = { height: 2048, width:1024  };
         } else {
             resizeObj = { height: 1836 , width: 2048 };
         }
         ImageManipulator.manipulate(
             pickedImage.uri,
             [{ resize: resizeObj }],
             {
                 format: 'jpeg', compress: 0.5
             }
         ).then((manipResult) => {

             if (Platform.OS === 'android' && manipResult.width > 640) {
                  ImageManipulator.manipulate(
                     pickedImage.uri,
                     [{ rotate: 90 }, { resize: resizeObj }],
                     {
                         format: 'jpeg', compress: 0.5,
                     }
                 ).then((manipResult)=>  this.setState({takedPic: true, imageURI: manipResult.uri}, this.handlerSpinner));
             }
             else
                 this.setState({takedPic: true, imageURI: manipResult.uri}, this.handlerSpinner)
         });
    }

    takePic = () => {
        if (this.camera) {
            this.camera.takePictureAsync({quality:1,skipProcessing: true}).then((photo)=>this.cropImage(photo));
        }
    };

     choosePic(){
         Permissions.askAsync(Permissions.CAMERA_ROLL).then(()=>{
            ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            }).then((photo)=>{
                if (!photo.cancelled) {
                    this.setState({takedPic: true, imageURI: photo.uri});
                }
            });
        });


    };
    componentDidMount() {
        Permissions.askAsync(Permissions.CAMERA).then(({status})=> this.setState({hasCameraPermission: status === 'granted'}))
    }

    _savePic(returnDataFromCamera, navigation) {
        this.setState({takedPic: false});

        returnDataFromCamera(this.state.imageURI);
        navigation.pop()
    }

    render() {
        const navigation = this.props.navigation.getParam("navigation", {});
        const returnDataFromCamera = this.props.navigation.getParam("returnDataFromCamera", {});
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <View/>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{flex: 1}}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                        textStyle={{color: "white", fontSize: 17, lineHeight: 22}}
                    />
                    {
                    !this.state.takedPic?
                        <Camera style={{flex: 1}}
                                type={this.state.type}
                                ref={ref => {
                                    this.camera = ref;
                                }}>
                            <View
                                style={styles.cameraView}>
                                <TouchableOpacity
                                    style={{}}
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                        });
                                    }}>
                                    <Image source={flipImage} style={{width: 30, height: 30}}/>
                                </TouchableOpacity>
                                <TouchableHighlight
                                    activeOpacity={1}
                                    underlayColor={'transparent'}
                                    onPress={() => {
                                        this.handlerSpinner();
                                        this.takePic(!this.state.focused)
                                    }}

                                >
                                    <Icon name="plus-square-o" size={50}
                                          color={this.state.focused ? Colors.tabIconSelected : Colors.tabIconDefault}/>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    activeOpacity={1}
                                    underlayColor={'transparent'}
                                    onPress={() => this.choosePic(!this.state.focused)}

                                >
                                    <Icon name="picture-o" size={30}
                                          color={this.state.focused ? Colors.tabIconSelected : Colors.tabIconDefault}/>
                                </TouchableHighlight>
                            </View>
                        </Camera>:
                        <View  style={{
                            flex:1,
                            position: 'relative'}}>
                            <Image resizeMode={"contain"}
                                   style={{width: Layout.window.width, height: Layout.window.height}}
                                   source={{uri: this.state.imageURI}}/>
                            <View style={styles.buttonAction}>
                                <TouchableHighlight style={styles.deleteButton}
                                                    onPress={() => this.setState({takedPic: false})}
                                >
                                    <Text style={{color:'white', fontWeight: '500',fontSize:15, paddingHorizontal:5}}>Supprimer</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.saveButton}
                                                    onPress={() => {
                                                        this._savePic(returnDataFromCamera, navigation);
                                                    }}
                                >
                                    <Text style={{color:'black', fontWeight: '500',fontSize:15, paddingHorizontal:5}}>Sauvegarder</Text>
                                </TouchableHighlight>
                            </View>
                        </View>

                    }
                 </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    saveButton:{
        paddingHorizontal:20,
        backgroundColor:'white',
        paddingVertical:10,
        borderColor:'white',
        borderWidth:0.5,
        borderRadius:10,
        flex:0.4,
        alignItems:'center'
    },
    deleteButton:{
        paddingHorizontal:20,
        backgroundColor:Colors.tintColor,
        paddingVertical:10,
        borderColor:'transparent',
        borderWidth:0.5,
        borderRadius:10,
        flex:0.4,
        alignItems:'center'
    },
    buttonAction:{
        position:'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        bottom: 0,
        left: 0,
        right: 0
    },
    cameraView:{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginVertical: 15

    }
});