import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { Movie } from './entities/movie.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.getCategoryById(id);
    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async deleteCategory(id: string): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Aucune catégorie avec l'id ${id} a été trouvée`);
    }
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({where: { id }});
    if (!category) {
      throw new NotFoundException(`Aucune catégorie avec l'id ${id} a été trouvée`);
    }
    return category;
  }

  async getAllCategories(query: PaginateQuery): Promise<Paginated<Category>> {
    return await paginate(query, this.categoryRepository, {
      sortableColumns: ['id'],
      searchableColumns: ['name'],
      defaultLimit: 10,
    });
  }

  async getMoviesByCategory(
    id: string,
    query: PaginateQuery,
  ): Promise<Paginated<Movie>> {
    const queryBuilder = this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.categories', 'category')
      .where('category.id = :id', { id });

    return await paginate(query, queryBuilder, {
      sortableColumns: ['id'],
      defaultLimit: 10,
    });
  }
}
