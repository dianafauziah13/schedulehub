import { Schema as MongooseSchema } from 'mongoose';

export interface AvailableKhutbahJumat {
    Minggu_ke : number;
}

export interface AvailablePengajianRutin {
    Minggu_ke : number;
    Hari : string;
}

export interface ListKeahlian {
    idListKeahlian : MongooseSchema.Types.ObjectId;
    Rating : number;
}

export interface Mubaligh {
    idScopeDakwah :MongooseSchema.Types.ObjectId, ref: 'ScopeDakwah';
    mubalighName : string;
    AvailableKhutbahJumat : AvailableKhutbahJumat [];
    AvailablePengajianRutin : AvailablePengajianRutin [];
    ListKeahlian : ListKeahlian [];
}