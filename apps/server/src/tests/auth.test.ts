import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import { app } from '../app';
import * as authService from '../features/auth/auth.service';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

// Mock auth service
vi.mock('../features/auth/auth.service');

// Test data
const testUser = {
  id: '507f1f77bcf86cd799439011',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'USER' as const,
};

const generateToken = (user: { id: string; email: string; firstName: string; lastName: string; role: 'USER' | 'ADMIN' }) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    config.jwt.secret,
    { expiresIn: '7d' }
  );
};

describe('Auth Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: POST /api/auth/register
  it('should register a new user', async () => {
    const registerInput = {
      email: 'newuser@example.com',
      password: 'SecurePassword123',
      firstName: 'John',
      lastName: 'Doe',
    };

    vi.mocked(authService.register).mockResolvedValueOnce({
      user: {
        id: '507f1f77bcf86cd799439013',
        email: registerInput.email,
        firstName: registerInput.firstName,
        lastName: registerInput.lastName,
        role: 'USER',
        createdAt: new Date().toISOString(),
      },
      token: generateToken(testUser),
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send(registerInput)
      .expect(201);

    expect(response.body.email).toBe(registerInput.email);
    expect(response.body.firstName).toBe(registerInput.firstName);
    expect(response.headers['set-cookie']).toBeDefined();
  });

  // Test 2: POST /api/auth/login
  it('should login user with valid credentials', async () => {
    const loginInput = {
      email: 'test@example.com',
      password: 'SecurePassword123',
    };

    vi.mocked(authService.login).mockResolvedValueOnce({
      user: {
        ...testUser,
        createdAt: new Date().toISOString(),
      },
      token: generateToken(testUser),
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginInput)
      .expect(200);

    expect(response.body.email).toBe(testUser.email);
    expect(response.headers['set-cookie']).toBeDefined();
  });

  // Test 3: POST /api/auth/logout
  it('should logout user successfully', async () => {
    const token = generateToken(testUser);

    const response = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', `token=${token}`)
      .expect(200);

    expect(response.body).toEqual({ message: 'Logged out successfully' });
    expect(response.headers['set-cookie']).toBeDefined();
  });
});

describe('Authentication Guard', () => {
  it('should return 401 when no token is provided', async () => {
    const response = await request(app)
      .get('/api/users/me')
      .expect(401);

    expect(response.body).toEqual({ message: 'Authentication required' });
  });

  it('should return 401 with invalid token', async () => {
    const response = await request(app)
      .get('/api/users/me')
      .set('Cookie', 'token=invalid-token')
      .expect(401);

    expect(response.body).toEqual({ message: 'Invalid or expired token' });
  });
});
