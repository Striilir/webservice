import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { In, Repository } from 'typeorm';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { Category } from './entities/category.entity';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllMovies(query: PaginateQuery): Promise<Paginated<Movie>> {
    return await paginate<Movie>(query, this.movieRepository, {
      sortableColumns: ['id'],
      relations: ['categories'],
      searchableColumns: ['title', 'description'],
      defaultLimit: 10,
    });
  } 

  async getMovieById(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!movie) {
      throw new NotFoundException(`Aucun film avec l'id ${id} a été trouvé`);
    }
    return movie;
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const categoryEntities = await this.categoryRepository.find({
      where: {
        id: In(createMovieDto.categoryIds),
      },
    });

    if (categoryEntities.length !== createMovieDto.categoryIds.length) {
      throw new BadRequestException('Aucune catégorie trouvée');
    }

    const newMovie = this.movieRepository.create({
      ...createMovieDto,
      categories: categoryEntities,
      releaseDate: new Date(createMovieDto.releaseDate),
    });

    return await this.movieRepository.save(newMovie);
  }

  async updateMovie(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const movie = await this.getMovieById(id);

    if (updateMovieDto.categoryIds && updateMovieDto.categoryIds.length > 0) {
      const categoryEntities = await this.categoryRepository.find({
        where: { id: In(updateMovieDto.categoryIds) },
      });

      if (categoryEntities.length !== updateMovieDto.categoryIds.length) {
        throw new BadRequestException('Aucune catégorie trouvée');
      }

      movie.categories = categoryEntities;
    }

    Object.assign(movie, {
      ...updateMovieDto,
      categoryIds: undefined,
    });

    return await this.movieRepository.save(movie);
  }

  async deleteMovie(id: string): Promise<void> {
    const movie = await this.getMovieById(id);
    if (!movie) {
      throw new NotFoundException(`Aucun film avec l'id ${id} a été trouvé`);
    }

    await this.movieRepository.delete(id);
  }

  async searchMovie(title: string) {
    return await this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.title ILIKE :title', { title: `%${title}%` })
      .orWhere('movie.description ILIKE :title', { title: `%${title}%` })
      .getMany();
  }
}
