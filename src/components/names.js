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

    const [boot, didBoot] = React.useState(false);
    const [namesSet, newNamesSet] = React.useState([]);
    const [newName, setNewName] = React.useState({
        name: '',
        id: props.UserId
    });

    React.useEffect(() =>{
        if(boot){
            return;
        }
        didBoot(true);
        loadNames();
    })

    const loadNames = async() => {
        try{
            var result = await dsNames.FindAll(props.UserId);
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

        setNewName({...newName, ['name']:''});
        
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
                value={newName.name}
                onChangeText={txt => setNewName({...newName, ['name']: txt})}
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