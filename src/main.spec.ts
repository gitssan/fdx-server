import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./app.module";
import { FdxRequest } from './generic/fdx.models';
import { EMAIL_VALIDATION_ERROR, SIGN_OUT_ERROR, SUCCESSFULLY_LOGGED_IN, SUCCESSFULLY_LOGGED_OUT } from "./generic/fdx.constants";

// https://dev.to/codeliezel/get-started-with-nestjs-and-create-a-todo-notes-app-creating-e2e-tests-part-2-5pl
// https://lab.github.com/githubtraining/github-actions:-continuous-integration
// https://www.freecodecamp.org/news/what-are-github-actions-and-how-can-you-automate-tests-and-slack-notifications/

describe("API integration tests", () => {

    let app: INestApplication;
    let _id: string;

    beforeEach(async () => {
        jest.setTimeout(10000);
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    /* USER */

    it("should sign-up successfully", async () => {

        const userModel = {
            "emailAddress": "san.jay.valk@gmail.com",
            "firstName": "Sa",
            "lastName": "Fal",
            "password": "Sjf12341234",
            "confirmPassword": "Sjf12341234",
        };
        const fdxRequest: FdxRequest = { userModel } as FdxRequest;
        const res = await request(app.getHttpServer()).post('/user/handleUserSignUp').send(fdxRequest);

        _id = res.body.userModel._id;

        expect(res.status).toBe(200);
        expect(res.body.message).toBe(SUCCESSFULLY_LOGGED_IN);
        expect(res.body.userModel.emailAddress).toBe(userModel.emailAddress);
        expect(res.body.userModel.password).toBe(undefined);
    });

    
    it("sign-up should return 401", async () => {

        const userModel = {
            "firstName": "Sa",
            "lastName": "Fal",
            "password": "Sjf12341234",
            "confirmPassword": "Sjf12341234",
        };
        const fdxRequest: FdxRequest = { userModel } as FdxRequest;
        const res = await request(app.getHttpServer()).post('/user/handleUserSignUp').send(fdxRequest);

        expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
        expect(res.body.message.log).toStrictEqual([EMAIL_VALIDATION_ERROR]);
    });

    it("should sign-out successfully", async () => {

        const userModel = {
            _id
        };
        const fdxRequest: FdxRequest = { userModel } as FdxRequest;
        const res = await request(app.getHttpServer()).post('/user/handleUserSignOut').send(fdxRequest);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe(SUCCESSFULLY_LOGGED_OUT);
    });

    it("sign-out should return 401", async () => {

        const userModel = {};
        const fdxRequest: FdxRequest = { userModel } as FdxRequest;
        const res = await request(app.getHttpServer()).post('/user/handleUserSignOut').send(fdxRequest);

        expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
        expect(res.body.message).toBe(SIGN_OUT_ERROR);
    });

    it("sign-out should return 401", async () => {

        const userModel = { _id: 'xxx' };
        const fdxRequest: FdxRequest = { userModel } as FdxRequest;
        const res = await request(app.getHttpServer()).post('/user/handleUserSignOut').send(fdxRequest);

        expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    afterEach(async () => {
        // await Mongoose.(done);
        // TODO feels hacky, fix it
        // setTimeout(() => process.exit(), 500);
        await app.close();
    });
});