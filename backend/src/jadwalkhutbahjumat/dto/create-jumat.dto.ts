import mongoose, { Schema as MongooseSchema } from 'mongoose';
export class JumatDto {
    tgl : [Date];
    idMubaligh : mongoose.Schema.Types.ObjectId;
}

export class JadwalDto {
    idPimpinanJemaah : mongoose.Schema.Types.ObjectId;
    Jumat : JumatDto[];
}

export class JadwalJumatSchemaDto {
    bulan : number; 
    tahun : number;
    Jadwal :  JadwalDto [];
}