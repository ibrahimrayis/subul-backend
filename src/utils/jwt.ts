import jwt, { SignOptions } from 'jsonwebtoken';

export const generateToken = (payload: { id: number; email: string; role: string }): string => {
  const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';
  
  const options: SignOptions = {
    expiresIn: expiresIn as any
  };
  
  return jwt.sign(payload, secret, options);
};
