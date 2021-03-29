import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
const mongoose = require("mongoose");

xdescribe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  xit('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it("should get serverDeployInfo", async () => {
    const res = await request(app.getHttpServer()).post('/todo/setUserSession').send({ username: 'san.jay.valk@gmail.com' });
    expect(res.status).toBe(200);
  });

  xit("should get all todos", async () => {
    const res = await request(app.getHttpServer()).post('/todo/all').send({ username: 'san.jay.valk@gmail.com' });
    console.log('res.body', res.body.length);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(1);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await app.close();
    setTimeout(() => process.exit(), 500);
  });
});
