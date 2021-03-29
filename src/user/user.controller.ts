import { Controller, Res, HttpStatus, Post, Body, Param, NotFoundException, Put, Delete, Req, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { FdxRequest, IUserModel } from '../generic/fdx.models';
import { omit } from '../helpers';
import * as _ from 'lodash';
import { ValidationService } from '../validation/validation.service';
import { APPP_AWAKE, SIGN_OUT_ERROR, SIGN_UP_ERROR, SUCCESSFULLY_LOGGED_IN, SUCCESSFULLY_LOGGED_OUT } from '../generic/fdx.constants';

export interface IFdxResult {
    message: string;
    success: boolean;
    userModel: UserDTO;
    httpStatus: number;
}

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService,
        private validationService: ValidationService) { }

    @Post('/wakeUpApp')
    async wakeUpApp(@Res() res, @Body() fdxRequest: FdxRequest) {

        console.log('user', '@Post/wakeUpApp', fdxRequest);
        const httpStatus = HttpStatus.OK;
        const message = APPP_AWAKE;
        return res.status(httpStatus).json({ message });
    }

    @Post('/handleUserSignUp')
    async handleUserSignUp(@Res() res, @Body() fdxRequest: FdxRequest) {

        console.log('user', '@Post/handleUserSignUp', fdxRequest);
        let userModel = fdxRequest.userModel as IUserModel;
        const userDTO: UserDTO = { ...userModel, createdAt: new Date() } as UserDTO;
        let httpStatus: HttpStatus;
        let createdUser: IUserModel;
        let loggedInUser: IUserModel;
        let message: string | {};

        if (this.validationService.validateUserModel(userModel)) {
            createdUser = await this.UserService.create(userDTO);
            if (createdUser) {
                // const { password, ...loggedInUser } = userDTO;
                // prefer reduce over destructuring
                loggedInUser = omit(['password', 'confirmPassword'], userDTO);
                const { _id } = createdUser;
                loggedInUser._id = _id;
                httpStatus = HttpStatus.OK;
                message = SUCCESSFULLY_LOGGED_IN;
            } else {
                httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        } else {
            httpStatus = HttpStatus.UNAUTHORIZED;
            const log = this.validationService.getValidationErrorMessages();
            message = { feedback: SIGN_UP_ERROR, log };
        }

        console.log('handleUserSignUp', httpStatus, loggedInUser, createdUser);

        const fdxResult: IFdxResult = { message, userModel: loggedInUser } as IFdxResult;
        return res.status(httpStatus).json(fdxResult);
    }

    @Post('/handleUserSignOut')
    async handleUserSignOut(@Res() res, @Body() fdxRequest: FdxRequest) {

        console.log('user', '@Post/handleUserSignOut', fdxRequest);
        let loggedInUserId: string = fdxRequest?.userModel?._id;
        let fdxResult: IFdxResult;
        let httpStatus: HttpStatus;

        if (loggedInUserId) {
            try {
                const logedOutUser = await this.UserService.update(loggedInUserId, { modifiedAt: new Date() } as UserDTO);
                console.log(SUCCESSFULLY_LOGGED_OUT, logedOutUser);

                httpStatus = HttpStatus.OK;
                fdxResult = { message: SUCCESSFULLY_LOGGED_OUT } as IFdxResult;
            } catch (err) {
                console.log('err', err);
                httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
                return res.status(httpStatus).json({});
            }
        } else {
            httpStatus = HttpStatus.UNAUTHORIZED;
            fdxResult = { message: SIGN_OUT_ERROR } as IFdxResult;
        }
        return res.status(httpStatus).json(fdxResult);
    }
}