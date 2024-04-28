import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';

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
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categoryIds: number[]; // New field to add category IDs
}
