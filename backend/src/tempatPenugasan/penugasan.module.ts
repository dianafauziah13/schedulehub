import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TempatPenugasanController } from './penugasan.controller';
import { TempatPenugasanService } from './penugasan.service';
import { TempatPenugasanSchemaModel } from './schemas/penugasan.schema';
import { MubalighSchemaModel } from 'src/mubaligh/schemas/mubaligh.schema';
import { PimpinanjemaahSchemaModel } from 'src/pimpinanjamaah/schemas/pimpinanjamaah.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'TempatPenugasanSchema', schema: TempatPenugasanSchemaModel }, { name: 'MubalighSchema', schema: MubalighSchemaModel }, { name: 'PimpinanjemaahSchema', schema: PimpinanjemaahSchemaModel }])],
  controllers: [TempatPenugasanController],
  providers: [TempatPenugasanService ],
})
export class TempatPenugasanModule {}