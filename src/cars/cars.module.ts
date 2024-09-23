import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { BrandsModule } from 'src/brands/brands.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car]),
    BrandsModule
  ],  
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
