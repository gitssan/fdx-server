/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
    @ApiProperty()
    readonly firstName: string;
    readonly lastName: string;
    readonly emailAddress: string;
    readonly password: string;
    readonly createdAt: Date;
    readonly modifiedAt: Date;
}
