import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { KeahlianSchema } from 'src/keahlian/schemas/keahlian.schema';
import { ScopeDakwahSchema } from 'src/scopeDakwah/schemas/scopedakwah.schema';


@Schema()
export class AvailablePengajianRutin extends Document {
  @Prop({ type: [Number] })
  Minggu_ke: [Number];
 
  @Prop({ type: [String] })
  Hari: [String];
}

@Schema()
export class ListKeahlian extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'KeahlianSchema'})
  idListKeahlian: KeahlianSchema;
  @Prop({ type: String })
  nama : String;
  @Prop({ type: Number })
  Rating : number;
}

@Schema()
export class MubalighSchema extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ScopeDakwahSchema' })
  idScopeDakwah : ScopeDakwahSchema;

  @Prop({ type: String })
  mubalighName: string;  

  @Prop({ type: [Number] })
  AvailableKhutbahJumat: number[];

  @Prop({ type: Number })
  Nkhutbah: number;

  @Prop({ type: [AvailablePengajianRutin] })
  AvailablePengajianRutin : AvailablePengajianRutin[];

  @Prop({ type: [ListKeahlian] })
  ListKeahlian : ListKeahlian[];  

  @Prop({ type: String })
  scope_dakwah: String;
}

export const MubalighSchemaModel = SchemaFactory.createForClass(MubalighSchema);