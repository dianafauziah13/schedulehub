import mongoose, { Mongoose, Schema as MongooseSchema } from 'mongoose';

export interface AvailableKhutbahJumat {
    Minggu_ke : [number];
}

export interface AvailablePengajianRutin {
    Minggu_ke : [number];
    Hari : string;
}

export interface ListKeahlian {
    idListKeahlian : mongoose.Schema.Types.ObjectId;
    Rating : number;
}

export interface MubalighSchema {
    idScopeDakwah :mongoose.Schema.Types.ObjectId, ref: 'ScopeDakwah';
    mubalighName : string;
    AvailableKhutbahJumat : AvailableKhutbahJumat [];
    AvailablePengajianRutin : AvailablePengajianRutin [];
    ListKeahlian : ListKeahlian [];
}