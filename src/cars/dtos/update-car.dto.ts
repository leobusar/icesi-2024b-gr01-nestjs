import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Max,  Min } from "class-validator";

export class UpdateCarDto {
    @IsString()
    @IsOptional()
    id?: string;


    @IsString()
    @IsOptional()
    model?: string;
    
    @IsString({message: 'Brand debe ser una cadena'})
    @IsNotEmpty()
    @Length(3,20)
    @IsOptional()
    brand?: string;
    
    @IsInt()
    @Min(1900)
    @Max(2040)
    @IsOptional()
    year?: number;
}