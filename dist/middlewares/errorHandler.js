"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(`❌ Error: ${err.message}`);
    console.error(`📍 Stack: ${err.stack}`);
    res.status(500).json({
        error: 'Đã xảy ra lỗi server!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
        timestamp: new Date().toISOString()
    });
};
exports.errorHandler = errorHandler;
