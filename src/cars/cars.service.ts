import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class CarsService {

    constructor( @InjectRepository(Car) private readonly carRepository: Repository<Car>, private readonly brandService: BrandsService ) {

    }

    async findAll(){
        return await this.carRepository.find();
    }

    getById(id: string) {
        const car = this.carRepository.findOneBy({id})
        if(car === undefined)
            throw new NotFoundException(`Car with id ${id} not found`);
        return car;
    }

    async create(car: CreateCarDto) {
        const brand = await this.brandService.findOne(car.brand);
        const newCar = Object.assign({...car, brand}); 
        return this.carRepository.save(newCar);
        //const newcar: Car  =  { ...car};
        //this.cars.push(newcar);
        //return newcar;
    }

    update(id:string, car: UpdateCarDto) {
        // const index = this.cars.findIndex(car => car.id === id);
        // this.cars[index] = car;
        const carUpdate = this.getById(id);
        Object.assign(carUpdate, car);

        //return carUpdate;
    }

    delete(id: string): void {
        //this.cars = this.cars.filter(car => car.id !== id);

    }
}
