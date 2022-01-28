import * as React from 'react';
import * as dsNames from '../controllers/names';
import Name from '../views/name';

import {
    StyleSheet,
    View,
    Button,
    TextInput,
    ScrollView,
} from 'react-native';

const css = StyleSheet.create({
    input: {
        borderColor: '#1111aa',
        borderWidth: 2,
        margin: 2,
    }
});
export default function Names(props){

    const [namesSet, newNamesSet] = React.useState([]);
    const [newName, setNewName] = React.useState('');

    const loadNames = async() => {
        try{
            var result = await dsNames.FindAll();
        }catch(e){
            console.log('error loading names from DB: ', e);
            result = undefined;
        }

        if(result === undefined){
            return;
        }

        newNamesSet(result);
    }

    const handleCreation = async() => {
        if(!!!newName){
            alert('Name must be provided');
            return;
        }

        try{
            var result = await dsNames.Create(newName);
        }catch(e){
            console.log('ext error creating name: ', e);
            result = undefined;
        }

        setNewName('');
        
        loadNames();
    }

    return(
        <>
        <Button
            title='Load'
            onPress={loadNames} 
        />

        <View>
            <TextInput 
                style={css.input}
                value={newName}
                onChangeText={setNewName}
            />
            <Button 
                title='Create New Name'
                onPress={handleCreation}
            />
        </View>

        <ScrollView>
            {namesSet.map((m => 
                <Name Name={m} id={m.id}/>
                ))}
        </ScrollView>
        </>
    );
}