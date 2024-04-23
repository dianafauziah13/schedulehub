import { Schema as MongooseSchema } from 'mongoose';

export class jadwalDTO{
    idPimpinanJamaah: MongooseSchema.Types.ObjectId;
    tanggal: Date;
}

export class PengajianSchemaDTO {
    bulan: Date;
    tahun: Date;
    jadwal: jadwalDTO[];
  }