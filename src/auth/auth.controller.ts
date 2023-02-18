import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  ValidationPipe,
  Query,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
// import { UserAuthGuard } from '../guards/auth-user.guard';
import { AuthCredentialSignInDTO } from './dtos/auth-credential-signin.dto';
import { AuthCredentialDTO } from './dtos/auth-credential.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up user' })
  async signup(@Body() authCredential: AuthCredentialDTO) {
    return await this.authService.signup(authCredential);
  }

  @Post('signin')
  @ApiOperation({
    summary: 'Sign in user',
  })
  async signInWithEmail(@Body() authCredential: AuthCredentialSignInDTO) {
    return await this.authService.signIn(authCredential);
  }
}
