import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class HitungKhutbahSchema extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  idMubaligh: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  idPimpinanJemaah: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Number })
  NKhutbah: number;
}

export const HitungKhutbahSchemaModel = SchemaFactory.createForClass(HitungKhutbahSchema);