import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ScopeDakwah extends Document {
  @Prop({ type: String })
  LingkupDakwah: string;
}

export const ScopeDakwahSchema = SchemaFactory.createForClass(ScopeDakwah);