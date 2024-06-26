import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { Movie } from './entities/movie.entity';
import { HalInterceptor } from './interceptors/hal.movie.interceptor';
import { MovieService } from './movies.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAllMovies(@Paginate() query: PaginateQuery): Promise<Paginated<Movie>> {
    return await this.movieService.getAllMovies(query);
  }

  @Post()
  @UseInterceptors(HalInterceptor)
  async createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.movieService.createMovie(createMovieDto);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string): Promise<void> {
    return await this.movieService.deleteMovie(id);
  }

  @Get(':id')
  @UseInterceptors(HalInterceptor)
  async getMovieById(@Param('id') id: string): Promise<Movie> {
    return await this.movieService.getMovieById(id);
  }

  @Put(':id')
  @UseInterceptors(HalInterceptor)
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return await this.movieService.updateMovie(id, updateMovieDto);
  }
}
