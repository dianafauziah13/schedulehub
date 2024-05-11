import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { MubalighSchema } from 'src/mubaligh/interfaces/mubaligh.interfaces';

@Schema()
export class Jadwal extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  idPimpinanJemaah: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ tgl: {Date}, idMubaligh: { type: mongoose.Schema.Types.ObjectId, ref: 'MubalighSchema'}}] })
  Jumat: { tgl: Date; idMubaligh: mongoose.Schema.Types.ObjectId}[];
}

@Schema()
export class JadwalJumatSchema extends Document {
  @Prop({ type:  Number})
  bulan: number;  

  @Prop({ type: Number })
  tahun: number;

  @Prop({ type: [Jadwal] })
  Jadwal : Jadwal[];
}

export const JadwalJumatSchemaModel = SchemaFactory.createForClass(JadwalJumatSchema);