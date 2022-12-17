import { IResponse } from 'src/core/interfaces/IResponse';
import { AuthService } from './auth.service';
import { LoginByEmailDto, LoginByGoogleDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginByEmail(data: LoginByEmailDto): Promise<IResponse<any>>;
    loginByGoogle(data: LoginByGoogleDto): Promise<IResponse<any>>;
    register(registerDto: RegisterDto): Promise<IResponse<any>>;
    checkToken(userId: string): Promise<IResponse<any>>;
}
