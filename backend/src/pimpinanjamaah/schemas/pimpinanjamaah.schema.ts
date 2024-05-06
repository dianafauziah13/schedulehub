import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class ScopeDakwahJumat extends Document {
  @Prop({ type: Number })
  Minggu_ke: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ScopeDakwah' })
  scopeDakwah: mongoose.Schema.Types.ObjectId;
}

@Schema()
export class ScopeDakwahPengajian extends Document {
  @Prop({ type: [{ idKeahlian: { type: mongoose.Schema.Types.ObjectId, ref: 'Keahlian' }, MinimalKeahlian: { type: Number } }] })
  Keahlian: { idKeahlian: mongoose.Schema.Types.ObjectId; MinimalKeahlian: Number }[];
 
  @Prop({ type: Number })
  Minggu_ke: number;
 
  @Prop({ type: String })
  hari: string;

  @Prop({ type: String })
  detailWaktu: string;

  @Prop({ type: String })
  TopikKajian: string;
}

@Schema()
export class PimpinanjemaahSchema extends Document {
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'mubaligh' })
  // KetuaPJ: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String })
  Nama: string;

  @Prop({ type: [ScopeDakwahJumat] })
  scopeDakwahJumat: ScopeDakwahJumat[];

  @Prop({ type: [ScopeDakwahPengajian] })
  ScopeDakwahPengajian: ScopeDakwahPengajian[];
}

export const PimpinanjemaahSchemaModel = SchemaFactory.createForClass(PimpinanjemaahSchema);