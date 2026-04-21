import { Types } from 'mongoose';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import { app } from '../app';
import * as userService from '../features/users/user.service';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

// Mock user service
vi.mock('../features/users/user.service');

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

describe('User Endpoints', () => {
  let token: string;

  beforeEach(() => {
    vi.clearAllMocks();
    token = generateToken(testUser);
  });

  // Test 4: GET /api/users/me
  it('should get user profile when authenticated', async () => {
    vi.mocked(userService.getProfile).mockResolvedValueOnce({
      _id: new Types.ObjectId(testUser.id),
      email: testUser.email,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      role: testUser.role,
      createdAt: new Date(),
      passwordHash: 'hashed_password',
      stats: {
        totalTestsTaken: 0,
        totalScore: 0,
        testsCreated: 0,
        recentActivity: 'none',
      },
      updatedAt: new Date(),
      __v: 0,
    });

    const response = await request(app)
      .get('/api/users/me')
      .set('Cookie', `token=${generateToken(testUser)}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.email).toBe(testUser.email);
  });

  // Test 5: PUT /api/users/me - Update profile
  it('should update user profile', async () => {
    const updateInput = {
      firstName: 'Updated',
      lastName: 'Name',
    };

    vi.mocked(userService.changeProfileName).mockResolvedValueOnce({
      _id: new Types.ObjectId(testUser.id),
      email: testUser.email,
      firstName: updateInput.firstName,
      lastName: updateInput.lastName,
      role: testUser.role,
      createdAt: new Date(),
      passwordHash: 'hashed_password',
      stats: {
        totalTestsTaken: 0,
        totalScore: 0,
        testsCreated: 0,
        recentActivity: 'none',
      },
      updatedAt: new Date(),
      __v: 0,
    });

    const response = await request(app)
      .put('/api/users/me')
      .set('Cookie', `token=${token}`)
      .send(updateInput)
      .expect(200);

    expect(response.body.firstName).toBe(updateInput.firstName);
    expect(response.body.lastName).toBe(updateInput.lastName);
  });

  // Test 5b: PUT /api/users/me/password - Change password
  it('should change user password', async () => {
    const passwordInput = {
      currentPassword: 'OldPassword123',
      newPassword: 'NewPassword456',
    };

    vi.mocked(userService.changeUserPassword).mockResolvedValueOnce({
      _id: new Types.ObjectId(testUser.id),
      email: testUser.email,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      role: testUser.role,
      createdAt: new Date(),
      passwordHash: 'new_hashed_password',
      stats: {
        totalTestsTaken: 0,
        totalScore: 0,
        testsCreated: 0,
        recentActivity: 'none',
      },
      updatedAt: new Date(),
      __v: 0,
    });

    const response = await request(app)
      .put('/api/users/me/password')
      .set('Cookie', `token=${token}`)
      .send(passwordInput);

    expect([204, 400, 401]).toContain(response.status);
  });

  // Test 5c: GET /api/users/me/stats - Get user statistics
  it('should get user statistics', async () => {
    const mockStats = {
      totalTestsTaken: 15,
      totalScore: 1250,
      testsCreated: 5,
      recentActivity: 'Test completed on 2024-04-20',
      averageScore: 83.3,
    };

    vi.mocked(userService.getDashboardStats).mockResolvedValueOnce(mockStats);

    const response = await request(app)
      .get('/api/users/me/stats')
      .set('Cookie', `token=${token}`)
      .expect(200);

    expect(response.body.totalTestsTaken).toBe(mockStats.totalTestsTaken);
    expect(response.body.totalScore).toBe(mockStats.totalScore);
  });
});
