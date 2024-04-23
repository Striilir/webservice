import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

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
