import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
// import * as dayjs from 'dayjs';

@Schema()
export class jadwal extends Document {
 
  @Prop({ type: String  })
  PimpinanJamaah: String;
 
  @Prop({ type: Number  })
  minggu_ke: number;

  @Prop({ type: String  })
  hari: String;

  @Prop({  type: String })
  Mubaligh: String;
}

@Schema()
export class historiPengajianSchema extends Document {
  @Prop({ type: Number })
  bulan: number;

  @Prop({ type: Number })
  tahun: number;

  @Prop({type: Boolean})
  statusValidasi: boolean = false;
  
  @Prop({ type: String  })
  comment : String = '';
  
  @Prop({ type: [jadwal] })
  jadwal: jadwal[] = [];

}

export const historiPengajianSchemaModel = SchemaFactory.createForClass(historiPengajianSchema);
export const jadwalModel = SchemaFactory.createForClass(jadwal);