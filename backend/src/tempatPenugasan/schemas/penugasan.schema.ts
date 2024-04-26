import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { MubalighSchema } from 'src/mubaligh/schemas/mubaligh.schema';
import { PimpinanjemaahSchema } from 'src/pimpinanjamaah/schemas/pimpinanjamaah.schema';


@Schema()
export class Penugasan extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PimpinanjemaahSchema'})
  idPimpinanJemaah: PimpinanjemaahSchema; 

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'MubalighSchema' })
  Mubaligh_KhutbahJumat: [MubalighSchema]; 

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'MubalighSchema' })
  Mubaligh_KhutbahPengajian: [MubalighSchema];
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