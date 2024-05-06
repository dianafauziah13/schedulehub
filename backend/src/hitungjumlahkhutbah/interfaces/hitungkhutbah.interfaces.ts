import mongoose, { Mongoose, Schema as MongooseSchema } from 'mongoose';

export interface HitungKhutbah {
    idMubaligh : mongoose.Schema.Types.ObjectId;
    idPimpinanJemaah : mongoose.Schema.Types.ObjectId;
    NKhutbah : number;
  }