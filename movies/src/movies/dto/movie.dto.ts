import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @MaxLength(128)
  title: string;

  @IsString()
  @MaxLength(2048)
  description: string;

  @IsDateString()
  releaseDate: string;

  @IsArray()
  @IsOptional()
  categoryIds: string[];

  @IsInt()
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  posterUrl?: string;
}

export class UpdateMovieDto extends CreateMovieDto {}
