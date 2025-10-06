import { UserModel, User } from '../models/user.model';
import { hashPassword, comparePassword } from '../../../utils/hash';
import { generateToken } from '../../../utils/jwt';

export class UserService {
  static async register(userData: User): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const existingUser = await UserModel.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(userData.password);
    const newUser = await UserModel.create({ ...userData, password: hashedPassword });

    const { password, ...userWithoutPassword } = newUser;
    const token = generateToken({
      id: newUser.id!,
      email: newUser.email,
      role: newUser.role || 'customer',
    });

    return { user: userWithoutPassword, token };
  }

  static async login(email: string, password: string): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    if (!user.is_active) {
      throw new Error('Account is deactivated');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken({
      id: user.id!,
      email: user.email,
      role: user.role || 'customer',
    });

    return { user: userWithoutPassword, token };
  }

  static async getUserById(id: number): Promise<Omit<User, 'password'> | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async getAllUsers(limit = 100, offset = 0): Promise<User[]> {
    return UserModel.getAll(limit, offset);
  }

  static async updateUser(id: number, updates: Partial<User>): Promise<Omit<User, 'password'> | null> {
    if (updates.password) {
      updates.password = await hashPassword(updates.password);
    }

    const updatedUser = await UserModel.update(id, updates);
    if (!updatedUser) return null;

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  static async deleteUser(id: number): Promise<boolean> {
    return UserModel.delete(id);
  }
}
