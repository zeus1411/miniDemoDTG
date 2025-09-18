import express from 'express';
import 'reflect-metadata';
import userRoutes from './routes/user.route';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = 3000;

// Middleware để parse JSON
app.use(express.json());

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
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(` Server đang chạy tại http://localhost:${PORT}`);
  console.log(` API Documentation:`);
  console.log(`   GET  /                   - Hello World`);
  console.log(`   GET  /health             - Health Check`);
  console.log(`   GET  /api/users          - Lấy danh sách users`);
  console.log(`   GET  /api/users/:id      - Lấy user theo ID`);
});