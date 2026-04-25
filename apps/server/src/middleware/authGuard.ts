// Authentication and authorization middleware
// Handles JWT token verification and role-based access control
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

// JWT payload structure with user information
export interface JwtPayload {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
}

// Extended Request interface to include authenticated user data
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

// Middleware to verify JWT token from cookies
// Returns 401 if token is missing or invalid
export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  // Extract token from cookies (httpOnly cookie)
  const token = req.cookies?.token; 

  if (!token) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  try {
    // Verify and decode JWT token
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Middleware to verify user has ADMIN role
// Requires requireAuth to run first
export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }
  if (req.user.role !== "ADMIN") {
    res.status(403).json({ message: "Admin access required" });
    return;
  }
  next();
}

// Creates and signs JWT token with user payload
// Token expires in 7 days
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: "7d" });
}