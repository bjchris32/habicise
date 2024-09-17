import { dbConnect, dbDisconnect } from "../utils/dbHandler"
import express, { Express, Request, Response } from "express";
import router from '../../src/config/routes';
import request from 'supertest';
import { User } from "./../../src/models/user";
import cookieParser from "cookie-parser";
import cookie from 'cookie';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

beforeEach(async () => {
  await dbConnect();
});

afterEach(async () => {
  await dbDisconnect();
});

describe("Auth functions", () => {
  it("should register a user", async () => {
    const initialCount = await User.countDocuments();
    const response = await request(app)
      .post('/api/register')
      .send({
        name: 'bjs',
        email: 'abc@gmail.com',
        password: 'test123'
      });
    const finalCount = await User.countDocuments();

    expect(response.status).toBe(201);
    expect(response.body?.name).toBe('bjs');
    expect(response.body?.email).toBe('abc@gmail.com');
    expect(finalCount).toBe(initialCount + 1);
  });

  it("should login a user", async () => {
    const user = new User({
      name: 'First User',
      email: 'first@gmail.com',
      password: 'test123'
    });
    await user.save();

    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'first@gmail.com',
        password: 'test123'
      });
    expect(response.status).toBe(201);
    expect(response.body?.name).toBe('First User');
    expect(response.body?.email).toBe('first@gmail.com');
  });

  it("should check auth status of a user", async () => {
    const user = new User({
      name: 'First User',
      email: 'first@gmail.com',
      password: 'test123'
    });
    await user.save();
    
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'first@gmail.com',
        password: 'test123'
      });

    const cookies = response.headers['set-cookie'];
    const parsedCookies = cookie.parse(cookies[0]);
    const jwtCookie = parsedCookies.jwt;
    const checkAuthResponse = await request(app)
      .get('/api/auth/check')
      .set('Cookie', 'jwt=' + jwtCookie);
    expect(checkAuthResponse.status).toBe(200);
  });

  it("should clear the cookie", async () => {
    const user = new User({
      name: 'First User',
      email: 'first@gmail.com',
      password: 'test123'
    });
    await user.save();

    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: 'first@gmail.com',
        password: 'test123'
      });

    const loginCookie = loginResponse.headers['set-cookie'];
    expect(loginCookie).toBeDefined();

    const logoutUserResponse = await request(app)
      .post('/api/logout')
      .set('Cookie', loginCookie);

    const clearedCookie = logoutUserResponse.headers['set-cookie'];
    const parsedCookies = cookie.parse(clearedCookie[0]);
    const jwtCookie = parsedCookies.jwt;

    expect(jwtCookie).toBe('');
  });
});
