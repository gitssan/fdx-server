import { Injectable } from '@nestjs/common';
import { IUserModel } from 'src/generic/fdx.models';
import { BASIC_VALIDATION_ERROR, EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR, REGEX_ALPHA_DIGITS_SPACES_SPECIAL, REGEX_ALPHA_SPACES, REGEX_EMAIL, PASSWORD_VALIDATION_ERROR_FIRSTNAME, PASSWORD_VALIDATION_ERROR_LASTNAME } from '../generic/fdx.constants';

@Injectable()
export class ValidationService {

    private validationMessagesArray: string[] = [];

    constructor() { }

    getValidationErrorMessages(): string[] {
        return this.validationMessagesArray;
    }

    public validateBasic(value: string) {
        if (REGEX_ALPHA_SPACES.test(value)) {
            return true;
        } else {
            this.validationMessagesArray.push(BASIC_VALIDATION_ERROR);
            return false;
        }
    }

    public validateEmail(value: string) {
        if (REGEX_EMAIL.test(value)) {
            return true;
        } else {
            this.validationMessagesArray.push(EMAIL_VALIDATION_ERROR);
            return false;
        }
    }

    public validatePassword(value: string) {
        if (REGEX_ALPHA_DIGITS_SPACES_SPECIAL.test(value)) {
            return true;
        } else {
            this.validationMessagesArray.push(PASSWORD_VALIDATION_ERROR);
            return false;
        }
    }

    public validatePasswordNamePatterns(userModel: IUserModel) {

        

        let returnValue = true;

        const regExpCustomFirstName = new RegExp(`^((?!${userModel.firstName}).)*$`, 'i');
        const regExpCustomLastName = new RegExp(`^((?!${userModel.lastName}).)*$`, 'i');
        if (!regExpCustomFirstName.test(userModel.password)) {
            returnValue = false;
            this.validationMessagesArray.push(PASSWORD_VALIDATION_ERROR_FIRSTNAME);
            console.log('validatePasswordNamePatterns', 'firstName', userModel.firstName, userModel.password);
        } else if (!regExpCustomLastName.test(userModel.password)) {
            returnValue = false;
            this.validationMessagesArray.push(PASSWORD_VALIDATION_ERROR_LASTNAME);
            console.log('validatePasswordNamePatterns', 'lastName', userModel.lastName, userModel.password);
        } else if (!this.validatePassword(userModel.password)) {
            returnValue = false;
            console.log('validatePasswordNamePatterns', 'password', userModel.password, userModel.password);
        }

        return returnValue;
    }

    public validateUserModel(userModel: IUserModel) {

        this.validationMessagesArray = [];

        if (this.validateBasic(userModel.firstName) &&
            this.validateBasic(userModel.lastName) &&
            this.validateEmail(userModel.emailAddress) &&
            this.validatePasswordNamePatterns(userModel)) {
            return true;
        } else {
            return false;
        }
    }
}