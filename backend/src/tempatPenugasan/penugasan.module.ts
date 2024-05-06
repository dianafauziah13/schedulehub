import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TempatPenugasanController } from './penugasan.controller';
import { TempatPenugasanService } from './penugasan.service';
import { TempatPenugasanSchemaModel } from './schemas/penugasan.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'TempatPenugasanSchema', schema: TempatPenugasanSchemaModel }])],
  controllers: [TempatPenugasanController],
  providers: [TempatPenugasanService],
})
export class TempatPenugasanModule {}