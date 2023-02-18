import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { JwtPayload } from './dtos/jwt-payload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDTO } from './dtos/auth-credential.dto';
import { AuthCredentialSignInDTO } from './dtos/auth-credential-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(authCredential: AuthCredentialSignInDTO) {
    const { email, password } = authCredential;
    const user: User = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await user.isValidPassword(password))) {
      throw new BadRequestException('email/password is invalid');
    }

    const payload: JwtPayload = {
      email,
    };
    const token = this.createToken(payload);

    return {
      user: {
        id: user.id,
        name: user.name,
        email,
      },
      token,
    };
  }

  async signup(authCredential: AuthCredentialDTO) {
    const { email } = authCredential;

    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new ConflictException('email is already taken');
    }

    user = await this.createUser(authCredential);

    const payload: JwtPayload = {
      email,
    };

    const token = this.createToken(payload);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  private createToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private async createUser(authCredential: AuthCredentialDTO): Promise<User> {
    const { name, email, password } = authCredential;

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    return await this.userRepository.save(user);
  }
}
