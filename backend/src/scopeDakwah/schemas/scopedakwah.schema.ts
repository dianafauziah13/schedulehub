import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class ScopeDakwahSchema extends Document {
  @Prop({ type: String })
  @AutoMap()
  LingkupDakwah: string;  
}

export const ScopeDakwahSchemaModel = SchemaFactory.createForClass(ScopeDakwahSchema);