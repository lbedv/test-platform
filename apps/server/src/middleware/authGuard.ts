import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export interface JwtPayload {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const token = req.cookies?.token; 

  if (!token) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

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

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: "7d" });
}