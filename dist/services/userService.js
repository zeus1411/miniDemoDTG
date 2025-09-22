"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncService = void 0;
class AsyncService {
    static fetchUsersAsync(users) {
        return new Promise((resolve) => {
            console.log('⏳ Simulating database query...');
            setTimeout(() => {
                console.log('✅ Users fetched successfully');
                resolve([...users]);
            }, 3000);
        });
    }
    static async findUserByIdAsync(users, id) {
        console.log(`⏳ Searching for user with ID: ${id}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const user = users.find(u => u.id === id);
        console.log(user ? '✅ User found' : '❌ User not found');
        return user;
    }
}
exports.AsyncService = AsyncService;
