export const REGEX_ALPHA_SPACES = /^[a-zA-ZÀ-ÿ-. ]{2,20}$/;
export const REGEX_ALPHA_DIGITS_SPACES_SPECIAL = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/;
// https://emailregex.com/ better than the Angular default
export const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const DEPLOY_PRODUCTION = 'production';

export const SUCCESSFULLY_LOGGED_IN = 'succesfully logged in';
export const SIGN_UP_ERROR = 'sign up error';
export const SUCCESSFULLY_LOGGED_OUT = 'succesfully logged out';
export const SIGN_OUT_ERROR = 'sign out error';

export const BASIC_VALIDATION_ERROR = 'basic validation error';
export const EMAIL_VALIDATION_ERROR = 'emailAddress validation error';
export const PASSWORD_VALIDATION_ERROR = 'password validation error';
export const PASSWORD_VALIDATION_ERROR_FIRSTNAME = 'password validation error firstname';
export const PASSWORD_VALIDATION_ERROR_LASTNAME = 'password validation error lasttname';

export const APPP_AWAKE = 'appAwake';