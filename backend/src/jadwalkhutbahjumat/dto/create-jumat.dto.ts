import mongoose, { Schema as MongooseSchema } from 'mongoose';
export class JumatDto {
    minggu_ke: Number; 
    Mubaligh: String
}

export class JadwalDto {
    PimpinanJemaah : String;
    Jumat : JumatDto[];
}

export class JadwalJumatSchemaDto {
    bulan : number; 
    tahun : number;
    statusValidasi: boolean;
    Jadwal :  JadwalDto [];
}