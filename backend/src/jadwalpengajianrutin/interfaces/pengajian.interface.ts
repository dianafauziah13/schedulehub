import { Schema as MongooseSchema } from 'mongoose';

export interface jadwal{
    idPimpinanJamaah: MongooseSchema.Types.ObjectId;
    tanggal: Date;
}

export interface PengajianSchema {
    bulan: Date;
    tahun: Date;
    jadwal: jadwal[];
  }