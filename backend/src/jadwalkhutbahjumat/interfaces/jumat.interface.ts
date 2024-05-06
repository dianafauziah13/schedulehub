import mongoose, { Mongoose, Schema as MongooseSchema } from 'mongoose';

export interface Jumat {
    tgl : [Date];
    idMubaligh : mongoose.Schema.Types.ObjectId;
}

export interface Jadwal {
    idPimpinanJemaah : mongoose.Schema.Types.ObjectId;
    Jumat : Jumat[];
}

export interface JadwalJumatSchema {
    bulan : number; 
    tahun : number;
    Jadwal :  Jadwal [];
}