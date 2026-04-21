import { vi } from 'vitest';

// Set environment variables first, before any imports
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test-platform-test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.PORT = '3001';

// Mock logger
vi.mock('../utils/logger.js', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));
