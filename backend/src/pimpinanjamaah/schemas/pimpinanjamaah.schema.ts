import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { KeahlianSchema } from 'src/keahlian/schemas/keahlian.schema';
import { MubalighSchema } from 'src/mubaligh/schemas/mubaligh.schema';
import { ScopeDakwahSchema } from 'src/scopeDakwah/schemas/scopedakwah.schema';


@Schema()
export class ScopeDakwahJumat extends Document {
  @Prop({ type: Number })
  minggu_ke: number;

  @Prop({ type: String })
  Nama: String;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ScopeDakwahSchema' })
  _id: ScopeDakwahSchema;
}

@Schema()
export class ScopeDakwahPengajian extends Document {
  @Prop({ type: [{ idKeahlian: { type: mongoose.Schema.Types.ObjectId, ref: 'KeahlianSchema' }, MinimalKeahlian: { type: Number } }] })
  Keahlian: { idKeahlian: KeahlianSchema; MinimalKeahlian: Number }[];
 
  @Prop({ type: Number })
  Minggu_ke: Number;
 
  @Prop({ type: String })
  hari: string;

  @Prop({ type: String })
  detailWaktu: string;

  @Prop({ type: String })
  TopikKajian: string;
}

@Schema()
export class PimpinanjemaahSchema extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MubalighSchema' })
  KetuaPJ: MubalighSchema;

  @Prop({ type: String })
  Nama: string;

  @Prop({ type: [ScopeDakwahJumat] })
  scope_dakwah_jumat: ScopeDakwahJumat[];

  @Prop({ type: [ScopeDakwahPengajian] })
  scope_dakwah_pengajian: ScopeDakwahPengajian[];
}

export const PimpinanjemaahSchemaModel = SchemaFactory.createForClass(PimpinanjemaahSchema);