import express from 'express';
import 'reflect-metadata';
import userRoutes from './routes/user.route';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello World!',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(` Server đang chạy tại http://localhost:${PORT}`);
  console.log(` API Documentation:`);
  console.log(`   GET  /                   - Hello World`);
  console.log(`   GET  /health             - Health Check`);
  console.log(`   GET  /api/users          - Lấy danh sách users`);
  console.log(`   GET  /api/users/:id      - Lấy user theo ID`);
});