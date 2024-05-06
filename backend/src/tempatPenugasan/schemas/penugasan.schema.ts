import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
<<<<<<< HEAD
<<<<<<< HEAD
import { PimpinanjemaahSchema } from 'src/pimpinanjamaah/schemas/pimpinanjamaah.schema';

@Schema()
export class Penugasan extends Document {
  @Prop({ type: PimpinanjemaahSchema })
  idPimpinanJemaah: PimpinanjemaahSchema; 
=======
=======
>>>>>>> 35acdb3b3b579c842cfd74da1ba024b6e09c7314
import { MubalighSchema } from 'src/mubaligh/schemas/mubaligh.schema';
import { PimpinanjemaahSchema } from 'src/pimpinanjamaah/schemas/pimpinanjamaah.schema';

@Schema()
export class scopedakwahjumat extends Document{
  @Prop({ type: String })
  nama: String; 

  @Prop({ type: Number })
  minggu_ke: Number;
}

@Schema()
export class scopedakwahpengajian extends Document{
  @Prop({ type: [{ nama: { type: String}, minimal: { type: Number } }] })
  Keahlian: { nama: String; minimal: Number }[];

  @Prop({ type: Number })
  minggu_ke: Number;

  @Prop({ type: String })
  hari: String;

  @Prop({ type: String })
  waktu: String;

  @Prop({ type: String })
  topik_kajian: String;
}

@Schema()
export class pimpinan extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PimpinanjemaahSchema' })
  _id: PimpinanjemaahSchema; 
  @Prop({ type: String })
  nama: String; 
  @Prop({ type: [scopedakwahjumat] })
  scope_dakwah_jumat: scopedakwahjumat[];
  @Prop({ type: [scopedakwahpengajian]})
  scope_dakwah_pengajian: scopedakwahpengajian[]
}

@Schema()
export class mubaligh_jumat extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MubalighSchema' })
  _id: MubalighSchema; 
  @Prop({ type: String })
  nama: String; 
  @Prop({ type: String })
  scope_dakwah: String;
  @Prop({ type: [Number]})
  ketersediaan_waktu_jumat: Number[];
  @Prop({ type: [{ nama: { type: String}, rating: { type: Number } }] })
  Keahlian: { nama: String; rating: Number }[];
}

@Schema()
export class mubaligh_pengajian extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MubalighSchema' })
  _id: MubalighSchema; 
  @Prop({ type: String })
  nama: String; 
  @Prop({ type: String })
  scope_dakwah: String;
  @Prop({ type: [{ minggu_ke: {type: String}, hari: {type:String} }] })
  ketersediaan_waktu_pengajian: { minggu_ke: String; hari: String }[];
  @Prop({ type: [{ nama: { type: String}, rating: { type: Number } }] })
  Keahlian: { nama: String; rating: Number }[];
}

@Schema()
export class Penugasan extends Document {
  @Prop({ type: pimpinan })
  pimpinan: pimpinan;
<<<<<<< HEAD
>>>>>>> 78b17b020c42d92dd57bbb0aacb7e133580d5fdd

=======
  
>>>>>>> 35acdb3b3b579c842cfd74da1ba024b6e09c7314
  @Prop({ type: [mubaligh_jumat] })
  mubaligh_khutbah_jumat: mubaligh_jumat[];

  @Prop({ type: [mubaligh_pengajian] })
  Mubaligh_Khutbah_pengajian: [mubaligh_pengajian[]];
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