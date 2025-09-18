import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`❌ Error: ${err.message}`);
  console.error(`📍 Stack: ${err.stack}`);
  
  res.status(500).json({
    error: 'Đã xảy ra lỗi server!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
};