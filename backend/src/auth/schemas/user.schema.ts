import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
@Schema({
    timestamps: true
})

export class User {
    @Prop()
    name: string

    @Prop({unique: [true, 'Username Sudah tersedia']})
    username: string

    @Prop()
    password: string

    @Prop()
    role: string;  
}

export const UserSchema = SchemaFactory.createForClass(User);