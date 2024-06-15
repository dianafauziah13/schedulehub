import { Schema as MongooseSchema } from 'mongoose';

export class jadwalDTO{
    PimpinanJamaah: String;
    minggu_ke: String;
    hari: String;
    Mubaligh: String;
}

export class historiPengajianSchemaDTO {
    bulan: number;
    tahun: number;
    statusValidasi: boolean = false;
    comment : String;
    jadwal: jadwalDTO[];
  }