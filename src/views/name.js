import * as React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

const css = StyleSheet.create({
    container: {
        borderColor: '#aaaaaa',
        borderWidth: 2,
        borderRadius: 8,
        marginVertical: 4
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 4
    }
});

export default function Name(props){

    return(
        <View
            style={css.container}
        >
            <Text 
                style={css.text}
            >
                {props.Name.name}
            </Text>
        </View>
    )
}