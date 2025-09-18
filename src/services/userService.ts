import { User } from '../models/user.model';

export class AsyncService {
  // Demo Promise-based async function
  static fetchUsersAsync(users: User[]): Promise<User[]> {
    return new Promise((resolve) => {
      console.log('⏳ Simulating database query...');
      setTimeout(() => {
        console.log('✅ Users fetched successfully');
        resolve([...users]);
      }, 3000);
    });
  }

  // Demo async/await with Promise
  static async findUserByIdAsync(users: User[], id: number): Promise<User | undefined> {
    console.log(`⏳ Searching for user with ID: ${id}`);
    
    // Simulate async database operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const user = users.find(u => u.id === id);
    console.log(user ? '✅ User found' : '❌ User not found');
    
    return user;
  }
}