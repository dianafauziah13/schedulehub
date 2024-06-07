import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import mongoose, { Schema as MongooseSchema } from 'mongoose';


export class SignUpDto {
   @IsNotEmpty()
   @IsString()
   readonly name: string;

   @IsNotEmpty()
   readonly username: string;

   @IsNotEmpty()
   @IsString()
   @MinLength(6)
   readonly password: string

   @IsNotEmpty()
   readonly role: string

}