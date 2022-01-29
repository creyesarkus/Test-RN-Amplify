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

export default function Login(props){

    const [user, setUser] = React.useState({
        username: '',
        password: '',
    });

    const [boot, didBoot] = React.useState(false);

    React.useEffect(() => {
        if(boot){
            return;
        }

        didBoot(true);
        
        handleLoadSession();
    })

    const handleLogin = async() => {
        for(const p in user){
            if(!!!user[p]){
                alert('must have data: ' + p.toUpperCase());
                return;
            }
        }

        try{
            var result = await Auth.signIn(user.username, user.password);
        }catch(e){
            console.log('Error while signing in: ', e);
        }

        if(result == undefined){
            return;
        }

        props.UserId(result.username);
        props.OnLoged(true);
    };

    const handleInput = (txt, name) => {
        setUser({...user,[name]:txt});
    };

    const handleSignUp = async() => {
        props.IsSignUp(true);
    }

    const handleLoadSession = async() => {
        console.log('Loading session');

        try{
            var result = await Auth.currentUserInfo();
        }catch(e){
            console.log('error loading session: ', e);
            return;
        }

        if(result === null){
            console.log('No user info to load');
            return;
        }

        props.UserId(result.username);
        props.OnLoged(true);
    }

    return(
        <>
            <View>
                <Text
                    style={styles.headerLabel}
                >
                    Log-in
                </Text>
                <TextInput
                    style={styles.input}
                    value={user.username}
                    onChangeText={txt => handleInput(txt, 'username')}
                />
                <TextInput
                    style={styles.input}
                    name='password'
                    value={user.password}
                    onChangeText={txt => handleInput(txt, 'password')}
                />
                <Button
                    title='Log In'
                    onPress={handleLogin} 
                />
                <Button
                    title='Sign Up'
                    onPress={handleSignUp} 
                />
            </View>   
        </>
    );
}