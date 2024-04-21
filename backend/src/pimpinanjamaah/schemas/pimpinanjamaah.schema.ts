import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
// import { ScopeDakwah } from 'src/scopeDakwah/schemas/scopedakwah.schema';

@Schema()
export class ScopeDakwahJumat extends Document {
  @Prop({ type: Number })
  Minggu_ke: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ScopeDakwah' })
  scopeDakwah: mongoose.Schema.Types.ObjectId;

}

@Schema()
export class ScopeDakwahPengajian extends Document {
//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'knowledge' })
//   knowledge: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Number })
  Minggu_ke: number;

  @Prop({ type: String })
  hari: string;

  @Prop({ type: String })
  detailWaktu: string;

  @Prop({ type: String })
  TopicOfKajian: string;
}

@Schema()
export class PimpinanjemaahSchema extends Document {
//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Mubaligh' })
//   KetuaPJ: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String })
  mosqueName: string;

  @Prop({ type: [ScopeDakwahJumat] })
  scopeDakwahJumat: ScopeDakwahJumat[];

  @Prop({ type: [ScopeDakwahPengajian] })
  ScopeDakwahPengajian: ScopeDakwahPengajian[];
}

export const PimpinanjemaahSchemaModel = SchemaFactory.createForClass(PimpinanjemaahSchema);