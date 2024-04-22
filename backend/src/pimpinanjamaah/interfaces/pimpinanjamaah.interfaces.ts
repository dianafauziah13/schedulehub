import { Schema as MongooseSchema } from 'mongoose';

export interface ScopeDakwahJumat {
  Minggu_ke: number;
  scopeDakwah: MongooseSchema.Types.ObjectId;
}

export interface IKeahlian {
  idKeahlian: MongooseSchema.Types.ObjectId;
  MinimalKeahlian: string;
}

export interface ScopeDakwahPengajian {
  Keahlian: IKeahlian[];
  Minggu_ke: Number;
  hari: string;
  detailWaktu: string;
  TopicOfKajian: string;
}

export interface PimpinanjemaahSchema {
  // KetuaPJ: MongooseSchema.Types.ObjectId;
  Nama: string;
  scopeDakwahJumat: ScopeDakwahJumat[];
  ScopeDakwahPengajian: ScopeDakwahPengajian[];
}