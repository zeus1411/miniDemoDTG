import { Router, Request, Response } from 'express';
import { User } from '../models/user.model';
import { AsyncService } from '../services/userService';

const router = Router();

// In-memory storage (đơn giản cho demo)
let users: User[] = [
  new User(1, 'Nguyen Van A', 'nguyenvana@example.com', 25),
  new User(2, 'Tran Thi B', 'tranthib@example.com', 30),
  new User(3, 'Le Van C', 'levanc@example.com', 28)
];

// GET /api/users - Lấy danh sách users (với async demo)
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('📋 Đang lấy danh sách users...');
    
    // Demo async operation
    const userList = await AsyncService.fetchUsersAsync(users);
    
    res.json({
      success: true,
      message: 'Lấy danh sách users thành công',
      data: userList.map(user => user.getInfo()),
      total: userList.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách users:', error);
    res.status(500).json({ 
      error: 'Lỗi khi lấy danh sách users',
      message: (error as Error).message 
    });
  }
});

// GET /api/users/:id - Lấy user theo ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      res.status(400).json({ 
        error: 'ID không hợp lệ',
        message: 'ID phải là một số' 
      });
      return;
    }

    console.log(`🔍 Đang tìm user với ID: ${id}`);
    
    // Demo async operation
    const user = await AsyncService.findUserByIdAsync(users, id);
    
    if (!user) {
      res.status(404).json({ 
        error: 'Không tìm thấy user',
        message: `Không tìm thấy user với ID: ${id}` 
      });
      return;
    }

    res.json({
      success: true,
      message: 'Lấy thông tin user thành công',
      data: user.getInfo()
    });
  } catch (error) {
    console.error('❌ Lỗi khi lấy thông tin user:', error);
    res.status(500).json({ 
      error: 'Lỗi khi lấy thông tin user',
      message: (error as Error).message 
    });
  }
});


export default router;
