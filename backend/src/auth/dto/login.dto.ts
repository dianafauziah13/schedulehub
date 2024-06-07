import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import mongoose, { Schema as MongooseSchema } from 'mongoose';


export class LoginDto {
   @IsNotEmpty()
   readonly username: string;

   @IsNotEmpty()
   @IsString()
   @MinLength(6)
   // Regex untuk memastikan minimal satu huruf kapital, satu angka, dan satu karakter khusus
   @Matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/, {
      message: 'Password harus terdiri dari minimal 1 huruf kapital, 1 angka, dan 1 karakter khusus',
   })
   readonly password: string;

}