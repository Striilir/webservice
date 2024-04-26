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

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Patch('movies/:id')
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
  findOne(@Param('id') id: string, @Req() req: any) {
    if (req.movie.id !== id) {
      throw new UnauthorizedException();
    }
    return this.moviesService.findOne(id);
  }

  @Get('movies')
  findAll(@Query() query: ExpressQuery = {}) {
    return this.moviesService.findAll(query);
  }

  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number = 2,
  ): Promise<Pagination<Movie>> {
    limit = limit > 100 ? 100 : limit;
    return this.moviesService.paginate({
      page,
      limit,
      route: 'http://localhost:3000/allmovies',
    });
  }

  @Post('movies')
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
