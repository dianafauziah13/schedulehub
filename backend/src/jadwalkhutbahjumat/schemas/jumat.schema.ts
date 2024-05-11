import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { MubalighSchema } from 'src/mubaligh/schemas/mubaligh.schema';
import { PimpinanjemaahSchema } from 'src/pimpinanjamaah/schemas/pimpinanjamaah.schema';


@Schema()
export class Jadwal extends Document {
  @Prop({ type: String  })
  PimpinanJemaah: String;

  @Prop({ type: [{ tgl: {Date}, idMubaligh: { type: String}}] })
  Jumat: { tgl: Date; Mubaligh: String}[];
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