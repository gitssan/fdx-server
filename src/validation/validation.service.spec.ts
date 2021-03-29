import { Test, TestingModule } from "@nestjs/testing";
import { IUserModel } from "src/generic/fdx.models";
import { ValidationService } from "./validation.service";

describe('ValidationService', () => {

  const userModel = {
    "emailAddress": "san.jay.valk@gmail.com",
    "firstName": "San",
    "lastName": "Falcon",
    "password": "Sjf1234123412",
  }

  const userModelWithErrors = {
    "emailAddress": "san.jay.valk@gmail",
    "firstName": "Sa+",
    "lastName": "F",
    "password": "sjf12341234",
  }

  const userModelPasswordWithPatternErrors: IUserModel = {
    "emailAddress": "san.jay.valk@gmail.com",
    "firstName": "San",
    "lastName": "FAL",
    "password": "sjv12341234",
  } as IUserModel;

  let validationService: ValidationService
  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationService]
    }).compile()

    validationService = module.get<ValidationService>(ValidationService)

  })

  it('should validate basics', async () => {

    expect(validationService).toBeDefined();
    let validateBasicSpy = jest.spyOn(validationService, 'validateBasic');

    let validateBasic = validationService.validateBasic(userModel.firstName);
    expect(validateBasicSpy).toHaveBeenCalled();
    expect(validateBasic).toEqual(true);

    validateBasic = validationService.validateBasic(userModel.lastName);
    expect(validateBasicSpy).toHaveBeenCalled();
    expect(validateBasic).toEqual(true);

    validateBasic = validationService.validateBasic(userModelWithErrors.firstName);
    expect(validateBasicSpy).toHaveBeenCalled();
    expect(validateBasic).toEqual(false);

    validateBasic = validationService.validateBasic(userModelWithErrors.lastName);
    expect(validateBasicSpy).toHaveBeenCalled();
    expect(validateBasic).toEqual(false);

  })

  it('should validate email', async () => {
    
    expect(validationService).toBeDefined();
    let validateEmailSpy = jest.spyOn(validationService, 'validateEmail');
    
    let validateEmail = validationService.validateEmail(userModel.emailAddress);
    expect(validateEmailSpy).toHaveBeenCalled();
    expect(validateEmail).toEqual(true);

    validateEmail = validationService.validateEmail(userModelWithErrors.emailAddress);
    expect(validateEmailSpy).toHaveBeenCalled();
    expect(validateEmail).toEqual(false);

  })

  it('should validate password', async () => {
    
    expect(validationService).toBeDefined();
    let validatePasswordSpy = jest.spyOn(validationService, 'validatePassword');
    
    let validatePassword = validationService.validatePassword(userModel.password);
    expect(validatePasswordSpy).toHaveBeenCalled();
    expect(validatePassword).toEqual(true);

    validatePassword = validationService.validatePassword(userModelWithErrors.password);
    expect(validatePasswordSpy).toHaveBeenCalled();
    expect(validatePassword).toEqual(false);

  })

  it('should validate password with name patterns', async () => {
    
    expect(validationService).toBeDefined();
    let validatePasswordNamePatternsSpy = jest.spyOn(validationService, 'validatePasswordNamePatterns');
    
    let validatePasswordNamePatterns = validationService.validatePasswordNamePatterns(userModelPasswordWithPatternErrors);
    expect(validatePasswordNamePatternsSpy).toHaveBeenCalled();
    expect(validatePasswordNamePatterns).toEqual(false);
  })

  it('should validate entire UserModel', async () => {
    
    const userModelTmp: IUserModel = {
      "emailAddress": "san.jay.valk@gmail.com",
      "firstName": "San",
      "lastName": "Fal",
      "password": "Sjv12341234",
    } as IUserModel;

    expect(validationService).toBeDefined();
    let validateUserModelSpy = jest.spyOn(validationService, 'validateUserModel');
    
    let validateUserModel = validationService.validateUserModel(userModelTmp);
    expect(validateUserModelSpy).toHaveBeenCalled();
    expect(validateUserModel).toEqual(true);
  })
});