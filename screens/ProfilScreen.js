import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class ProfilScreen extends React.Component {
    static navigationOptions = {
        title: 'Profil',
    };

    render() {
        return (
            <View style={styles.container}>
                {/*<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>*/}
                    {/*<Text> this is Profil Screen </Text>*/}
                {/*</ScrollView>*/}
                <Text> this is Profil Screen </Text>
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

