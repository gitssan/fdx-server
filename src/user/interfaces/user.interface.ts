import { Document } from 'mongoose';

export interface User extends Document {

    readonly firstName: string;
    readonly lastName: string;
    readonly emailAddress: string;
    readonly password: string;
    readonly createdAt: Date;
    readonly modifiedAt: Date;
}