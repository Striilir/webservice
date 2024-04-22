import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.moviesRepository.findOneBy({
      id: id,
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    if (updateMovieDto.name && movie.name !== updateMovieDto.name) {
      const existingMovie = await this.moviesRepository.findOneBy({
        name: updateMovieDto.name,
      });
      if (existingMovie) {
        throw new BadRequestException('Name already exists');
      }
    }
    if (updateMovieDto.description) {
      movie.description = updateMovieDto.description;
    }
    if (updateMovieDto.date) {
      movie.date = updateMovieDto.date;
    }
    if (updateMovieDto.note) {
      movie.note = updateMovieDto.note;
    }
    await this.moviesRepository.save(movie);
    return movie;
  }

  async findOne(name: string): Promise<Movie> {
    const movie = await this.moviesRepository.findOneBy({
      name: name,
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async create(movie: Movie): Promise<Movie> {
    const existingMovie = await this.moviesRepository.findOneBy({
      name: movie.name,
    });
    if (existingMovie) {
      throw new BadRequestException('Name already exists');
    }
    return this.moviesRepository.save(movie);
  }

  async delete(id: string): Promise<void> {
    const movie = await this.moviesRepository.findOneBy({
      id: id,
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    await this.moviesRepository.delete(id);
  }
}
