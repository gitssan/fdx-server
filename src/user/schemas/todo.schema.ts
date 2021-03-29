import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    password: String,
    createdAt: Date,
    modifiedAt: Date
}); 