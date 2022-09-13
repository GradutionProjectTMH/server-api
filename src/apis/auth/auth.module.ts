import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/apis/auth/auth.controller';
import { AuthService } from 'src/apis/auth/auth.service';
import { Auth, AuthSchema } from 'src/apis/auth/auth.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})

export class AuthModule {}
