import mongoose, { Schema as MongooseSchema } from 'mongoose';

export interface IPenugasan {
    idPimpinanJemaah : mongoose.Schema.Types.ObjectId;
    Mubaligh_KhutbahJumat : [mongoose.Schema.Types.ObjectId];
    Mubaligh_KhutbahPengajian : [mongoose.Schema.Types.ObjectId];
}

export interface TempatPenugasan {
    idTempatPenugasan :mongoose.Schema.Types.ObjectId;
    tgl_awal : Date;
    tgl_akhir : Date;
    Penugasan : IPenugasan [];
}