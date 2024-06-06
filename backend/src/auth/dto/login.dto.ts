import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import mongoose, { Schema as MongooseSchema } from 'mongoose';


export class LoginDto {
   @IsNotEmpty()
   readonly username: string;

   @IsNotEmpty()
   @IsString()
   @MinLength(6)
   readonly password: string

}