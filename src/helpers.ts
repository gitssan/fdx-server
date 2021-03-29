/* istanbul ignore file */
import { DEPLOY_PRODUCTION } from './generic/fdx.constants';
import { ObjectId } from 'mongodb'

export const getDatabaseconnectionString = (pass) => {
    // pass should come from non disclosed config var
    let connectionString: string;
    if (process.env.DEPLOY ===  DEPLOY_PRODUCTION) {
        connectionString = `mongodb+srv://${pass}@cluster0.fl1l4.mongodb.net/fdx-master?retryWrites=true&w=majority`;
    } else {
        connectionString = `mongodb+srv://${pass}@cluster0.fl1l4.mongodb.net/fdx-dev?retryWrites=true&w=majority`;
    }
    return connectionString;
}

export function isValidId(id: string) {
   // doesnt work as expected
   return new ObjectId(id).toString() === id;
}

// https://stackoverflow.com/questions/43011742/how-to-omit-specific-properties-from-an-object-in-javascript/43011802
export function omit(keys, obj) {
    return keys.reduce((a, e) => {
        const { [e]: omit, ...rest } = a; return rest;
    }, obj);
}