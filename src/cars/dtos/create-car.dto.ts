import { IsInt, IsNotEmpty, IsString, Length, Max,  Min } from "class-validator";

export class CreateCarDto {
    @IsString()
    model: string;
    
    @IsString({message: 'Brand debe ser una cadena'})
    @IsNotEmpty()
    @Length(3,20)

    brand: string;
    
    @IsInt()
    @Min(1900)
    @Max(2040)
    year: number;
}