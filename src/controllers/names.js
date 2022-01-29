import { DataStore } from '@aws-amplify/datastore';
import { Names } from '../models';


exports.FindAll = async(ownerId) =>{
    try{
        var result = await DataStore.query(Names, c => c.ownerId('eq', ownerId));
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
                    "name": data.name,
                    "ownerId": data.id,
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