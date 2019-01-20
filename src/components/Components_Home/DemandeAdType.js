import React from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text, TouchableHighlight, TouchableOpacity,
    View,
} from 'react-native';
import Colors from "../../constants/Colors";
import SendBirdService from "../../Services/chatService/SendBirdService";
import fetchDataAd from "../../Services/fetchDataAd";

export default class DemandeAdType extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            categorie:this.props.categorie,
            idUser:0,
        };
        this.handlerStartChat=this.handlerStartChat.bind(this);
    }

    static jsUcfirst(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    componentDidMount(){
        fetchDataAd.getUserAuth().then((idUser)=> {
            this.setState({idUser:idUser})
        })
    }

    handlerStartChat(item){
        this.props.navigation.navigate('ChatScreen', {channelUrl: item.url, currentUser:this.state.idUser})
    }
    render() {
        const categorie = this.props.categorie;
        const {navigation,typeAnnonce} = this.props;
        return (
                Object.keys(categorie).map((title, index) =>
                categorie[title].length > 0 ?
                    <View key={index} style={{flex: 1, paddingHorizontal: 10}}>
                        {this.renderCategryTitleRow(title, navigation, typeAnnonce)}
                        <FlatList
                            data={categorie[title]}
                            renderItem={({item, index}) =>
                                this.renderDemandeAdTypeView(index, item, typeAnnonce)}
                            listKey={(item2, index) => 'D' + index.toString()}
                            keyExtractor={(item, index) => 'D' + index.toString()}>
                        </FlatList>
                    </View> : null

                )

            )
    }

    renderCategryTitleRow(title, navigation, typeAnnonce) {
        return <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: '500', marginTop: 5, color: '#9a9c9e'}}>
                {title}
            </Text>
            <TouchableHighlight style={{
                borderRadius: 8,
                paddingHorizontal: 15,
                backgroundColor: Colors.tintColor,
                marginTop: 5,
                marginRight: 5,
                justifyContent: 'center',
                alignItems: 'center'
            }}
                                onPress={() => navigation.navigate("ShowMoreScreen",
                                    {
                                        category: title,
                                        typeAnnonce: typeAnnonce,
                                        navigation: navigation
                                    })}>
                <Text
                    style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '400',

                    }}>
                    Plus
                </Text>
            </TouchableHighlight>
        </View>;
    }

    renderDemandeAdTypeView(index, item, typeAnnonce) {
        return <View style={styles.container} key={index}>
            <View style={{flex: 3}}>
                <Text style={{
                    fontSize: 17,
                    fontWeight: '500',
                    color: '#1c1c1c'
                }}>{DemandeAdType.jsUcfirst(item.user.name)}</Text>
                <Text style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: '#b0b0b0'
                }}>{item.title.toLowerCase()}</Text>
                <Text style={{
                    fontSize: 14,
                    fontWeight: '300',
                    color: '#c3c3c3'
                }}>{item.description}</Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '90%'
            }}>
                <View/>
                <TouchableOpacity
                    style={{
                        borderRadius: 30,
                        backgroundColor: '#ebebeb',
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        if (this.state.idUser) {
                            SendBirdService.createGroupOneToOne(this.state.idUser, item.user.id, `${typeAnnonce}_${item.id}`).then(this.handlerStartChat);

                        }
                    }}>
                    <Image
                        source={{uri: 'http://vps628622.ovh.net:16233/api/downloadImage/man.png_eafefe17-19dc-11e9-887c-f1d2369b0d9e.png'}}
                        style={{width: 45, height: 45}}
                        resizeMode="cover"
                        resizeMethod={'resize'}
                    />
                </TouchableOpacity>
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal:5,
        paddingVertical:5,
        borderRadius:15,
        marginHorizontal:8,
        marginVertical:10,
        shadowOffset: {width: 0.5, height: 0.5},
        shadowColor: 'black',
        elevation: 2.5,

    }
});