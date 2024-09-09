import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly  carsService: CarsService) {

  }
  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Post()
  create(@Body() car: CreateCarDto) {
    return this.carsService.create(car); 
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string ) {
    return this.carsService.getById(id);
  }

  // @Patch(':id')
  // update(@Param('id', ParseUUIDPipe) id: string, @Body() car: CreateCarDto) {
  //   return this.carsService.update(id, car);
  // }
  
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string ) {
    return this.carsService.delete(id);
  }  
  
}
