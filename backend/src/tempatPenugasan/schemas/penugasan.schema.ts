import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Penugasan extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  idPimpinanJemaah: mongoose.Schema.Types.ObjectId; 

  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
  Mubaligh_KhutbahJumat: [mongoose.Schema.Types.ObjectId]; 

  @Prop({ type: [mongoose.Schema.Types.ObjectId] })
  Mubaligh_KhutbahPengajian: [mongoose.Schema.Types.ObjectId];
}

@Schema()
export class TempatPenugasanSchema extends Document {
  @Prop({ type: Date})
  tgl_awal : Date;

  @Prop({ type: Date })
  tgl_akhir : Date;  

  @Prop({ type: [Penugasan] })
  Penugasan : Penugasan[];
}

export const TempatPenugasanSchemaModel = SchemaFactory.createForClass(TempatPenugasanSchema);