import { DataStore } from '@aws-amplify/datastore';
import { Names } from '../models';


exports.FindAll = async() =>{
    try{
        var result = await DataStore.query(Names);
    }catch(e){
        console.log('error loading names from DB: ', e);
        result = undefined;
    }

    if(result === undefined){
        return [];
    }

    return result;
}

exports.Create = async(data) => {
    try{
        var result = await DataStore.save(
                new Names({
                    "name": data
                })
            );
    }catch(e){
        console.log('error creating name: ', e);
        result = undefined;
    }
    
    if(result === undefined){
        return undefined;
    }

    return result;
}

exports.Update = async(data) => {

}

exports.Delete = async(data) => {

}