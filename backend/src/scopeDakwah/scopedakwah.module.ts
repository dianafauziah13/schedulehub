import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScopeDakwahController } from './scopedakwah.controller'; 
import { ScopeDakwahService } from './scopedakwah.service';
import { ScopeDakwahSchema } from './schemas/scopedakwah.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'ScopeDakwah', schema: ScopeDakwahSchema }])],
  controllers: [ScopeDakwahController],
  providers: [ScopeDakwahService],
})
export class ScopeDakwahModule {}