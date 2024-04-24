import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
@Schema()
export class AvailablePengajianRutin extends Document {
  @Prop({ type: [Number] })
  Minggu_ke: [Number];
 
  @Prop({ type: [String] })
  Hari: [String];
}

@Schema()
export class ListKeahlian extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  idListKeahlian: mongoose.Schema.Types.ObjectId;
 
  @Prop({ type: Number })
  Rating : number;
}

@Schema()
export class MubalighSchema extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ScopeDakwah' })
  idScopeDakwah : mongoose.Schema.Types.ObjectId;

  @Prop({ type: String })
  mubalighName: string;  

  @Prop({ type: [Number] })
  AvailableKhutbahJumat: number[];

  @Prop({ type: [AvailablePengajianRutin] })
  AvailablePengajianRutin : AvailablePengajianRutin[];
}

export const MubalighSchemaModel = SchemaFactory.createForClass(MubalighSchema);