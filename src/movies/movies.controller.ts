import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Movie } from './entities/movie.entity';
import { HalInterceptor } from './hal.movie.interceptor';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Patch('movies/:id')
  @UseInterceptors(HalInterceptor)
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @Req() req: any,
  ) {
    if (req.movie.id !== id) {
      throw new UnauthorizedException();
    }
    return this.moviesService.update(id, updateMovieDto);
  }

  @Get('movies/:id')
  @UseInterceptors(HalInterceptor)
  findOne(@Param('id') id: string, @Req() req: any) {
    if (req.movie.id !== id) {
      throw new UnauthorizedException();
    }
    return this.moviesService.findOne(id);
  }

  @Get('movies')
  async getAllMovies(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Movie>> {
    return await this.moviesService.getAllMovies(query);
  }

  @Post('movies')
  @UseInterceptors(HalInterceptor)
  create(@Body() movie: any) {
    return this.moviesService.create(movie);
  }

  @Delete('movies/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    if (req.movie.id !== id) {
      throw new UnauthorizedException();
    }
    return this.moviesService.delete(id);
  }
}
