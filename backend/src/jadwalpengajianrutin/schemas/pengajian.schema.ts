import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
// import * as dayjs from 'dayjs';

@Schema()
export class jadwal extends Document {
 
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PimpinanjemaahSchema'  })
  idPimpinanJamaah: mongoose.Schema.Types.ObjectId;
 
  @Prop({ required: true })
  tanggal: Date;

//   @Prop({  type: mongoose.Schema.Types.ObjectId, ref: 'mubaligh'  })
//   idMubaligh: mongoose.Schema.Types.ObjectId;
}

@Schema()
export class PengajianSchema extends Document {
  @Prop({ required: true })
  bulan: Date;

  @Prop({ required: true })
  tahun: Date;

  @Prop({ type: [jadwal] })
  jadwal: jadwal[];

}

export const PengajianSchemaModel = SchemaFactory.createForClass(PengajianSchema);