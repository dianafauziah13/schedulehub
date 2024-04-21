import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
// import { ScopeDakwah } from 'src/scopeDakwah/schemas/scopedakwah.schema';

@Schema()
export class KeahlianSchema extends Document {
  @Prop({ type: String })
  NameOfKnowlegde: string;
}

export const KeahlianSchemaModel = SchemaFactory.createForClass(KeahlianSchema);