import { Schema as MongooseSchema } from 'mongoose';

export class ScopeDakwahJumatDto {
  Nama: string;
  minggu_ke: number;
  _id: MongooseSchema.Types.ObjectId;
}

export class KeahlianDto {
  idKeahlian: MongooseSchema.Types.ObjectId;
  nama: String;
  MinimalKeahlian: number;
}

export class ScopeDakwahPengajianDto {
  Keahlian: KeahlianDto[];
  Minggu_ke: number;
  hari: string;
  detailWaktu: string;
}

export class PimpinanjemaahSchemaDto {
  idKetuaPJ: MongooseSchema.Types.ObjectId;
  KetuaPJ : String;
  Nama: string;
  scope_dakwah_jumat: ScopeDakwahJumatDto[];
  scope_dakwah_pengajian: ScopeDakwahPengajianDto;
}