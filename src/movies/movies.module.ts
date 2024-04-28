import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { HttpModule } from '@nestjs/axios';
import { Category } from './entities/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    HttpModule,
    MoviesModule,
    TypeOrmModule.forFeature([Movie, Category]),
  ],
  controllers: [MoviesController, CategoryController],
  providers: [MoviesService, CategoryService],
})
export class MoviesModule {}
