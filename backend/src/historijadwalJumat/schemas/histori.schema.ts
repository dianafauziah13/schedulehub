import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { MubalighSchema } from 'src/mubaligh/schemas/mubaligh.schema';
import { PimpinanjemaahSchema } from 'src/pimpinanjamaah/schemas/pimpinanjamaah.schema';


@Schema()
export class Jadwal extends Document {
  
  @Prop({ type: String  })
  PimpinanJemaah: String = '';

  @Prop({ type: [{ minggu_ke: { type: Number}, Mubaligh: { type: String } }] })
  Jumat: { minggu_ke: Number ; Mubaligh: String }[] = [];
}

@Schema()
export class historiJadwalJumatSchema extends Document {
  @Prop({ type:  Number})
  bulan: number;  

  @Prop({ type: Number })
  tahun: number;

  @Prop({type: Boolean})
  statusValidasi: boolean = false;

  @Prop({ type: String  })
  comment : String = '';

  @Prop({ type: [Jadwal] })
  Jadwal : Jadwal[] = [];
}

export const historiJadwalJumatSchemaModel = SchemaFactory.createForClass(historiJadwalJumatSchema);
export const jadwalModel = SchemaFactory.createForClass(Jadwal);