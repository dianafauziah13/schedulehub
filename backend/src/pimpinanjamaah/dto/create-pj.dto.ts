import { Schema as MongooseSchema } from 'mongoose';

export class ScopeDakwahJumatDTO {
  Minggu_ke: number;
  scopeDakwah: MongooseSchema.Types.ObjectId;
}

export class ScopeDakwahPengajianDTO {
//   knowledge:  MongooseSchema.Types.ObjectId;
  Minggu_ke: number;
  hari: string;
  detailWaktu: string;
  TopicOfKajian: string;
}

export class PimpinanjemaahSchemaDTO {
//   KetuaPJ: MongooseSchema.Types.ObjectId;
  mosqueName: string;
  scopeDakwahJumat: ScopeDakwahJumatDTO[];
  ScopeDakwahPengajian: ScopeDakwahPengajianDTO[];
}