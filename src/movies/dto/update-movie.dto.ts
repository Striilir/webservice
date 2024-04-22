import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsNotEmpty()
  name?: string | undefined;
  @IsString()
  @IsNotEmpty()
  description?: string | undefined;
  @IsDate()
  @IsNotEmpty()
  date?: Date | undefined;
  @IsNumber()
  @IsNotEmpty()
  note?: number | undefined;
}
