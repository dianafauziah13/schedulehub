import mongoose, { Schema as MongooseSchema } from 'mongoose';
export class JumatDto {
    tgl : Date;
    Mubaligh : String;
}

export class JadwalDto {
    PimpinanJemaah : String;
    Jumat : JumatDto[];
}

export class JadwalJumatSchemaDto {
    bulan : number; 
    tahun : number;
    Jadwal :  JadwalDto [];
}