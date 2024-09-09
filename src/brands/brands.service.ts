import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private readonly  brandRepository: Repository<Brand>) {}

  async create(createBrandDto: CreateBrandDto) {

    try {
      const brand = this.brandRepository.create(createBrandDto);    
      await this.brandRepository.save(brand);
      return brand;
    } catch (error) {
      console.log("*********ERROR *******", error.code);
      this.handleDBExceptions(error);
      //throw new InternalServerErrorException("Can't create brand");
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit=10, offset=0} = paginationDto;
    
    return this.brandRepository.find({
      skip: offset,
      take: limit
    });
  }

  findOne(id: string) {
    return this.brandRepository.findOneBy({id});
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandRepository.preload({
      id: id,
      ...updateBrandDto
    });

    if (!brand) {
      throw new NotFoundException("Can't update brand");
    }
    try {
      await this.brandRepository.save(brand);
      return brand;
    } catch (error) {
      this.handleDBExceptions(error);
      
    }

  }

  async remove(id: string) {
    try {
      const brand  = await this.findOne(id);
      if(!brand) {
        throw new NotFoundException("Can't remove brand");
      }
      this.brandRepository.remove(brand);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private  handleDBExceptions(error: any) {
    if(error.code === '23505') {
      throw new BadRequestException('Brand already exists');
    }
    throw new InternalServerErrorException(error.code);
  }
}
