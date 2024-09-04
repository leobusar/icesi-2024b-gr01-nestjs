import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  @Get()
  findAll(): string {
    return 'This actions return all cars';
  }

  @Post()
  create(): string {
    return 'This act adds a car';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return 'This actions return all cars' + id;
  }
}
