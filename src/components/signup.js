import * as React from 'react';

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
} from 'react-native';

import { Auth } from 'aws-amplify';

const styles = StyleSheet.create({
    headerLabel: {
        marginLeft: '40%',
        fontFamily: 'bold',
        fontSize: 24,
    },
    input: {
        borderColor: '#aaaaaa',
        borderWidth: 2,
        borderRadius: 10,
        margin: 2,
        marginBottom: 8
    },
  });

  export default function SignUp(props){

    const[newUser, setUser] = React.useState({
        username: '',
        password: ''
    });

    const[codeStatus, setCodeStatus] = React.useState({
        confirm: false,
        code: '',
    });

    const handleInput = async(txt, prop) => {
        setUser({...newUser, [prop] : txt});
    }

    const handleSignup = async() => {
        try{
            var {user} = await Auth.signUp(newUser);
        }catch(e){
            console.log('error signning up: ', e);
            return;
        }

        console.log(user);
        setCodeStatus({...codeStatus,['confirm']: true});
    }

    const handleConfirm = async() => {
        try{
            await Auth.confirmSignUp(newUser.username, codeStatus.code);
        }catch(e){
            console.log('error confirming signing up: ', e);
            return;
        }

        props.OnSignUp(!true);
    }

    const handleResendCode = async() => {
        try{
            await Auth.resendSignUp(newUser.username);
        }catch(e){
            console.log('error sending back confirmation code: ', e);
            return;
        }

        console.log('Code re-sended');
    }

    return(
        <>
        {!codeStatus.confirm && (
            <View>
                <Text
                    style={styles.headerLabel}
                >
                    Sing Up
                </Text>
                <TextInput 
                    style={styles.input}
                    value={newUser.username}
                    onChangeText={txt => handleInput(txt, 'username')}
                />
                
                <TextInput 
                    style={styles.input}
                    value={newUser.password}
                    onChangeText={txt => handleInput(txt, 'password')}
                />

                <Button 
                    title='Sign Up'
                    onPress={handleSignup}
                />
            </View>
        )}

        {codeStatus.confirm && (
            <View>
                <TextInput 
                    style={styles.input}
                    value={codeStatus.code}
                    onChangeText={txt => setCodeStatus({...codeStatus, ['code']: txt})}
                />
                <Button 
                    title='Confirm Code'
                    onPress={handleConfirm}
                />
                <Button 
                    title='Re-send Code'
                    onPress={handleResendCode}
                />
            </View>
        )}

        </>
    );
  }