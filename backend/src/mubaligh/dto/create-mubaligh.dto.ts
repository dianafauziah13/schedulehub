import mongoose, { Schema as MongooseSchema } from 'mongoose';

export class AvailablePengajianRutinDto {
    Minggu_ke : Number[];
    Hari : string[];
}

export class ListKeahlianDto {
    idListKeahlian : mongoose.Schema.Types.ObjectId;
    nama: String;
    Rating : number;
}

export class MubalighSchemaDto {
    idScopeDakwah :MongooseSchema.Types.ObjectId;
    mubalighName : string;
    AvailableKhutbahJumat :  Number [];
    AvailablePengajianRutin : AvailablePengajianRutinDto;
    ListKeahlian : ListKeahlianDto [];
    scope_dakwah: String;
}