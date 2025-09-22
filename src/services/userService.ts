import { User } from '../models/user.model';

export class AsyncService {
  static fetchUsersAsync(users: User[]): Promise<User[]> {
    return new Promise((resolve) => {
      console.log('⏳ Simulating database query...');
      setTimeout(() => {
        console.log('✅ Users fetched successfully');
        resolve([...users]);
      }, 3000);
    });
  }

  static async findUserByIdAsync(users: User[], id: number): Promise<User | undefined> {
    console.log(`⏳ Searching for user with ID: ${id}`);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const user = users.find(u => u.id === id);
    console.log(user ? '✅ User found' : '❌ User not found');
    
    return user;
  }
}