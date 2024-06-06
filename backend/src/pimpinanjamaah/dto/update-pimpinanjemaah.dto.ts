// src/pimpinanjemaah/dto/update-pimpinanjemaah.dto.ts

import { IsString, IsArray, IsOptional, IsNumber, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateScopeDakwahJumatDto {
  @IsOptional()
  @IsNumber()
  minggu_ke?: number;

  @IsOptional()
  @IsString()
  Nama?: string;

  @IsOptional()
  @IsMongoId()
  _id?: string;
}

class UpdateScopeDakwahPengajianDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  Keahlian?: { idKeahlian: string; nama: string; MinimalKeahlian: number }[];

  @IsOptional()
  @IsNumber()
  Minggu_ke?: number;

  @IsOptional()
  @IsString()
  hari?: string;

  @IsOptional()
  @IsString()
  detailWaktu?: string;
}

export class UpdatePimpinanjemaahDto {
  @IsOptional()
  @IsMongoId()
  idKetuaPJ?: string;

  @IsOptional()
  @IsString()
  KetuaPJ?: string;

  @IsOptional()
  @IsString()
  Nama?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateScopeDakwahJumatDto)
  scope_dakwah_jumat?: UpdateScopeDakwahJumatDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateScopeDakwahPengajianDto)
  scope_dakwah_pengajian?: UpdateScopeDakwahPengajianDto;
}
