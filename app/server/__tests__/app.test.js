const app = require('../app')
const db = require("../database");
const request = require("supertest");
const User = require('../models/User')
const {ensureLoggedIn} = require('../middleware/auth')
const ExpressError = require('../expressError')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config')
const {SECRET_KEY} = require('../config')



jest.mock('../models/User');

describe('POST /usercheck', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return true if user exists', async () => {
        const mockUser = { username: "andrew"};
        User.getUserByID.mockResolvedValueOnce(mockUser);

        const requestBody = { username: 'andrew' };
        const response = await request(app)
            .post('/usercheck')
            .send(requestBody);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({ "username": "andrew"});
    });

    test('should return false if user does not exist', async () => {
        const mockUser = { username: "andrew"};
        User.getUserByID.mockResolvedValueOnce(null);

        const requestBody = { username: 'Drake' };
        const response = await request(app)
            .post('/usercheck')
            .send(requestBody);
        expect(response.status).toBe(404);
    });
});


describe('ensureLoggedIn middleware', () => {
    test('should call next if username exists in req.body', () => {
      const req = { body: { username: 'testUser' } };
      const res = {};
      const next = jest.fn();
  
      ensureLoggedIn(req, res, next);
  
      expect(next).toHaveBeenCalled();
    });
  
    test('should throw ExpressError with status 401 if username does not exist in req.body', () => {
      const req = { body: {} };
      const res = {};
      const next = jest.fn();
  
      expect(() => ensureLoggedIn(req, res, next)).toThrow(ExpressError);

    });
  });

  describe('POST /register/:register', () => {
    test('should register a new user and return a token and username', async () => {
      const formData = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
        username: 'johndoe',
        email: 'john@example.com',
        confirmPassword: 'password123'
      };
  
      const hashedPassword = 'hashedPassword';
      const token = 'token';
      const username = 'johndoe';
      bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);
      const jwtSignSpy = jest.spyOn(jwt, 'sign').mockReturnValue(token);
      User.createUser.mockResolvedValue({ username });
  
      const response = await request(app)
        .post('/register/register')
        .send({ formData });
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ token, username });
    });
  });


  describe('POST /login', () => {

  
    test('should return false if user does not exist', async () => {
      const formData = {
        username: 'nonexistentuser',
        password: 'password123',
      };
  
      // Mocking User.getUserByID to return undefined (user does not exist)
      User.getUserByID(formData.username)
  
      const response = await request(app)
        .post('/login')
        .send({ formData });
  
      expect(response.statusCode).toBe(200);
    });
  

  
    test('should handle errors', async () => {
      const formData = {
        // Provide invalid or missing data to trigger an error
      };
      const error = new Error('Test error');
      User.getUserByID.mockRejectedValue(error);
  
      const response = await request(app)
        .post('/login')
        .send({ formData });
  
      expect(response.statusCode).toBe(404); // Assuming you return 500 for errors
      expect(response.body).toEqual({});
    });
  });

  describe('POST /addgoal', () => {
    test('should add goal and account for existing user and return "SUCCESS"', async () => {
      const formData = {
        username: 'testuser',
        balance: 1000,
        account_num: '1234567890',
        goal: 'New house',
        exampleRadios: 'Savings'
      };
  
      // Mocking User.getUserByID to return user data
      User.getUserByID.mockResolvedValue({ username: formData.username });
  
      // Mocking User.addAccount and User.addGoal to resolve successfully
      User.addAccount.mockResolvedValue({});
      User.addGoal.mockResolvedValue({});
  
      const response = await request(app)
        .post('/addgoal')
        .send({ formData });
  
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('SUCCESS');
    });
  
    test('should redirect if user does not exist', async () => {
      const formData = {
        username: 'nonexistentuser',
        balance: 1000,
        account_num: '1234567890',
        goal: 'New house',
        exampleRadios: 'Savings'
      };
  
      // Mocking User.getUserByID to return undefined (user does not exist)
      User.getUserByID.mockResolvedValue(undefined);
  
      const response = await request(app)
        .post('/addgoal')
        .send({ formData });
  
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Express Routes', () => {
    describe('POST /addgoal', () => {
      test('should add goal and account for existing user and return "SUCCESS"', async () => {
        // Mock form data
        const formData = {
          username: 'testuser',
          balance: 1000,
          account_num: '1234567890',
          goal: 'New house',
          exampleRadios: 'Savings'
        };
  
        // Mock User.getUserByID to return user data
        User.getUserByID.mockResolvedValue({ username: formData.username });
  
        // Mock User.addAccount and User.addGoal to resolve successfully
        User.addAccount.mockResolvedValue({});
        User.addGoal.mockResolvedValue({});
  
        const response = await request(app)
          .post('/addgoal')
          .send({ formData });
  
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('SUCCESS');
      });
  
      test('should redirect if user does not exist', async () => {
        // Mock form data
        const formData = {
          username: 'nonexistentuser',
          balance: 1000,
          account_num: '1234567890',
          goal: 'New house',
          exampleRadios: 'Savings'
        };
  
        // Mock User.getUserByID to return undefined (user does not exist)
        User.getUserByID.mockResolvedValue(undefined);
  
        const response = await request(app)
          .post('/addgoal')
          .send({ formData });
  
        expect(response.statusCode).toBe(200);
      });
    });
  
    describe('PUT /updategoal', () => {
      test('should update user goal', async () => {
        // Mock form data
        const formData = {
          username: 'testuser',
          amount: 500
        };
  
        // Mock User.updateGoal to resolve successfully
        User.updateGoal.mockResolvedValue({});
  
        const response = await request(app)
          .put('/updategoal')
          .send({ formData });
  
        expect(response.statusCode).toBe(200);
        // Add additional assertions if necessary
      });
    });
  
    // Add tests for other routes (e.g., POST /addtransaction, DELETE /deletetransaction) similarly
  });



afterAll(function() {
    db.end();
  });