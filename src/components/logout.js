import * as React from 'react';
import { Auth } from 'aws-amplify';
import {
    Button,
} from 'react-native';

export default function Logout(props){

    const handleLogout = async() =>{
        try{
            var result = await Auth.signOut();
        }catch(e){
            console.log('error while loggin out: ', e);
        }

        props.LogedStatus(false);
    }

    return(
        <Button 
            color={'#FF0000'}
            title='LOG OUT' 
            onPress={handleLogout}
        />
    );
}