import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { log } from 'console';
import { Role } from 'src/users/enums/role.enum';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { Roles } from './decorator/roles.decorator';
import { LoginDto } from './dto/login.dto';
import { AuthDto } from './dto/register.dto';

@SkipThrottle()
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('token')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh-token/:refreshToken/token')
  refreshToken(@Param('refreshToken') refreshToken: string) {
    log(refreshToken);
    return this.authService.refreshToken(refreshToken);
  }

  @Public()
  @Get('validate/:accessToken')
  validate(@Param('accessToken') accessToken: string) {
    return this.authService.validate(accessToken);
  }

  @Roles(Role.ADMIN)
  @Post()
  register(@Body() authDto: AuthDto) {
    return this.authService.createAccount(authDto);
  }

  @Get(':uid')
  getAuth(@Param('uid') uid: string, @Request() req: any) {
    const id = uid === 'me' ? req.user.id : uid;
    if (req.user.id !== id && !req.user.roles.includes(Role.ADMIN)) {
      throw new ForbiddenException(
        "Il est nécessaire d'être administrateur ou d'être le propriétaire du compte",
      );
    }
    return this.usersService.findOne(id);
  }

  @Put(':uid')
  updateAuth(
    @Param('uid') uid: string,
    @Body() authDto: AuthDto,
    @Request() req: any,
  ) {
    const id = uid === 'me' ? req.user.id : uid;
    if (req.user.id !== id && !req.user.roles.includes(Role.ADMIN)) {
      throw new ForbiddenException(
        "Il est nécessaire d'être administrateur ou d'être le propriétaire du compte",
      );
    }
    return this.usersService.update(id, authDto);
  }
}
