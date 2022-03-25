import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('This email is already used');
    }

    // criptografar a senha com bcript antes de salvar no banco
    const user = usersRepository.create({
      name,
      email,
      password,
    });
    await usersRepository.save(user);

    // configurar jwt e retornar apenas o token
    return user;
  }
}
