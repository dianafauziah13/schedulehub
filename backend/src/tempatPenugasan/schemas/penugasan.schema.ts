import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
<<<<<<< HEAD
import { PimpinanjemaahSchema } from 'src/pimpinanjamaah/schemas/pimpinanjamaah.schema';

@Schema()
export class Penugasan extends Document {
  @Prop({ type: PimpinanjemaahSchema })
  idPimpinanJemaah: PimpinanjemaahSchema; 
=======
import { MubalighSchema } from 'src/mubaligh/schemas/mubaligh.schema';
import { PimpinanjemaahSchema } from 'src/pimpinanjamaah/schemas/pimpinanjamaah.schema';

@Schema()
export class scopedakwahjumat extends Document{
  @Prop({ type: String })
  Nama: String; 

  @Prop({ type: Number })
  minggu_ke: Number;
}

@Schema()
export class scopedakwahpengajian extends Document{
  @Prop({ type: [{ nama: { type: String}, MinimalKeahlian: { type: Number } }] })
  Keahlian: { nama: String; MinimalKeahlian: Number }[];

  @Prop({ type: Number })
  Minggu_ke: Number;

  @Prop({ type: String })
  hari: String;

  @Prop({ type: String })
  detailWaktu: String;

  @Prop({ type: String })
  TopikKajian: String;
}

@Schema()
export class pimpinan extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PimpinanjemaahSchema' })
  _id: PimpinanjemaahSchema; 
  @Prop({ type: String })
  Nama: String; 
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
  mubalighName: String; 
  @Prop({ type: String })
  scope_dakwah: String;
  @Prop({ type: [Number]})
  AvailableKhutbahJumat: Number[];
}

@Schema()
export class AvailablePengajianRutin extends Document{
  @Prop({ type: [Number] })
  Minggu_ke: [Number];
 
  @Prop({ type: [String] })
  Hari: [String];
}

@Schema()
export class mubaligh_pengajian extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MubalighSchema' })
  _id: MubalighSchema; 
  @Prop({ type: String })
  mubalighName: String; 

  @Prop({ type: [AvailablePengajianRutin] })
  AvailablePengajianRutin : AvailablePengajianRutin[];
  
  @Prop({ type: [{ nama: { type: String}, Rating: { type: Number } }] })
  ListKeahlian: { nama: String; Rating: Number }[];
}


@Schema()
export class Penugasan extends Document {
  @Prop({ type: pimpinan })
  pimpinan: pimpinan;
>>>>>>> 78b17b020c42d92dd57bbb0aacb7e133580d5fdd

  @Prop({ type: [mubaligh_jumat] })
  mubaligh_khutbah_jumat: mubaligh_jumat[];

  @Prop({ type: [mubaligh_pengajian] })
  Mubaligh_Khutbah_pengajian: mubaligh_pengajian[];
}

@Schema()
export class TempatPenugasanSchema extends Document {
  @Prop({ type: Date})
  tgl_awal : Date;

  @Prop({ type: Date })
  tgl_akhir : Date;  

  @Prop({ type: Penugasan })
  Penugasan : Penugasan;
}

export const TempatPenugasanSchemaModel = SchemaFactory.createForClass(TempatPenugasanSchema);