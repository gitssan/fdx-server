export interface FdxRequest {
    userModel: IUserModel,
}

export interface IUserModel {
    _id?: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    password?: string;
    confirmPassword?: string;
}

