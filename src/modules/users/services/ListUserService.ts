import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

export class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    if (!users.length) {
      throw new AppError('No registered users found');
    }

    return users;
  }
}
