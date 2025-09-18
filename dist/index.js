"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const user_route_1 = __importDefault(require("./routes/user.route"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware để parse JSON
app.use(express_1.default.json());
// Simple Hello World Route
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!',
        timestamp: new Date().toISOString(),
    });
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});
// Routes
app.use('/api/users', user_route_1.default);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// Start server
app.listen(PORT, () => {
    console.log(` Server đang chạy tại http://localhost:${PORT}`);
    console.log(` API Documentation:`);
    console.log(`   GET  /                   - Hello World`);
    console.log(`   GET  /health             - Health Check`);
    console.log(`   GET  /api/users          - Lấy danh sách users`);
    console.log(`   GET  /api/users/:id      - Lấy user theo ID`);
});
