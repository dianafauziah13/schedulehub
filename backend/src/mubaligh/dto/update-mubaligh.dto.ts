import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import mongoose, { Schema as MongooseSchema } from 'mongoose';

export class UpdateAvailablePengajianRutinDto {
    @IsOptional()
    @IsNumber()
    @IsArray()
    @ValidateNested({ each: true })
    Minggu_ke : Number[];

    @IsOptional()
    @IsString() 
    @IsArray()
    @ValidateNested({ each: true })
    Hari : string[];
}

export class UpdateListKeahlianDto {
    @IsOptional()
    @IsMongoId()
    idListKeahlian : string;

    @IsOptional()
    @IsString()
    nama: String;

    @IsOptional()
    @IsNumber()
    Rating : number;
}

export class UpdateMubalighSchemaDto {
    @IsOptional()
    @IsMongoId()
    idScopeDakwah :String;

    @IsOptional()
    @IsString()
    mubalighName : string;

    @IsOptional()
    @IsNumber()
    @IsArray()
    @ValidateNested({ each: true })
    AvailableKhutbahJumat :  Number [];

    @IsOptional()
    @Type(() => UpdateAvailablePengajianRutinDto)
    AvailablePengajianRutin : UpdateAvailablePengajianRutinDto;

    @IsOptional()
    @IsArray()
    @Type(() => UpdateListKeahlianDto)
    ListKeahlian : UpdateListKeahlianDto [];

    @IsOptional()
    @IsString()
    scope_dakwah: String;
}