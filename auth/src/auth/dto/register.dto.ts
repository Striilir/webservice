import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from 'src/users/enums/role.enum';
import { Status } from 'src/users/enums/status.enum';

export class AuthDto {
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @IsNotEmpty()
  roles: Role[];
  @IsNotEmpty()
  @IsString()
  status: Status;
}
