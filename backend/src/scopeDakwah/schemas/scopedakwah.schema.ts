import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class ScopeDakwahSchema extends Document {
  @Prop({ type: String })
  LingkupDakwah: string;  
}

export const ScopeDakwahSchemaModel = SchemaFactory.createForClass(ScopeDakwahSchema);