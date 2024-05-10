import mongoose from "mongoose";

export class HitungKhutbahSchemaDto {
    idMubaligh : mongoose.Schema.Types.ObjectId;
    idPimpinanJemaah : mongoose.Schema.Types.ObjectId;
    NKhutbah : number;
  }