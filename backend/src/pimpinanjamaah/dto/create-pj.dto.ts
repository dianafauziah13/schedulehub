import { Schema as MongooseSchema } from 'mongoose';

export class ScopeDakwahJumatDto {
  Minggu_ke: number;
  scopeDakwah: MongooseSchema.Types.ObjectId;
}

export class KeahlianDto {
  idKeahlian: MongooseSchema.Types.ObjectId;
  MinimalKeahlian: Number;
}

export class ScopeDakwahPengajianDto {
  Keahlian: KeahlianDto[];
  Minggu_ke: Number;
  hari: string;
  detailWaktu: string;
  TopicOfKajian: string;
}

export class PimpinanjemaahSchemaDto {
  // KetuaPJ: MongooseSchema.Types.ObjectId;
  Nama: string;
  scopeDakwahJumat: ScopeDakwahJumatDto[];
  ScopeDakwahPengajian: ScopeDakwahPengajianDto[];
}