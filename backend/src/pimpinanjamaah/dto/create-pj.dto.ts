import { Schema as MongooseSchema } from 'mongoose';

export class ScopeDakwahJumatDto {
  Nama: String;
  minggu_ke: number;
  _id: MongooseSchema.Types.ObjectId;
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
  scope_dakwah_jumat: ScopeDakwahJumatDto[];
  scope_dakwah_pengajian: ScopeDakwahPengajianDto[];
}