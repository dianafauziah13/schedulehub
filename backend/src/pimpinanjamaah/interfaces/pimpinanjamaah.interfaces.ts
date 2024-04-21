import { Schema as MongooseSchema } from 'mongoose';

export interface ScopeDakwahJumat {
  Minggu_ke: number;
  scopeDakwah: MongooseSchema.Types.ObjectId;
}

export interface ScopeDakwahPengajian {
//   knowlegde: MongooseSchema.Types.ObjectId;
  Minggu_ke: number;
  hari: string;
  detailWaktu: string;
  TopicOfKajian: string;
}

export interface PimpinanjemaahSchema {
//   KetuaPJ: MongooseSchema.Types.ObjectId;
  mosqueName: string;
  scopeDakwahJumat: ScopeDakwahJumat[];
  ScopeDakwahPengajian: ScopeDakwahPengajian[];
}