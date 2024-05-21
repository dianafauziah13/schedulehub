import { Schema as MongooseSchema } from 'mongoose';

export class jadwalDTO{
    PimpinanJamaah: String;
    minggu_ke: String;
    hari: String;
    Mubaligh: String;
}

export class PengajianSchemaDTO {
    bulan: number;
    tahun: number;
    jadwal: jadwalDTO[];
  }