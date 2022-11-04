import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IResponse } from 'src/core/interfaces/IResponse';
import {
  responseError,
  responseSuccessWithData,
} from '../../base/base.controller';
import { AuthService } from './auth.service';
import { LoginByEmailDto, LoginByGoogleDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('login-by-email')
  async loginByEmail(@Body() data: LoginByEmailDto): Promise<IResponse<any>> {
    try {
      const result = await this.authService.loginByEmail(data);
      return responseSuccessWithData(result);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login-by-google')
  async loginByGoogle(@Body() data: LoginByGoogleDto): Promise<IResponse<any>> {
    try {
      const result = await this.authService.loginByGoogle(data);
      return responseSuccessWithData(result);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Login' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<IResponse<any>> {
    try {
      const data = await this.authService.register(registerDto);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }
}
