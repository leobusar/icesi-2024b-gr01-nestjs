import { IsInt, IsNotEmpty, IsString, IsUUID, Max,  Min } from "class-validator";

export class CreateCarDto {
    @IsString()
    model: string;
    
    @IsUUID()
    @IsNotEmpty()
//    @Length(3,20)
    brand: string;
    
    @IsInt()
    @Min(1900)
    @Max(2040)
    year: number;
}