import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JadwalJumatController } from './jumat.controller';
import { JadwalJumatService } from './jumat.service';
import { JadwalJumatSchemaModel  } from './schemas/jumat.schema';
import { ProfileMatchingServiceJumat } from './profileMatchingJumat.service';
import { TempatPenugasanSchemaModel } from 'src/tempatpenugasan/schemas/penugasan.schema';
import { MubalighSchemaModel } from 'src/mubaligh/schemas/mubaligh.schema';
import { PimpinanjemaahSchemaModel } from 'src/pimpinanjamaah/schemas/pimpinanjamaah.schema';
import { TempatPenugasanService } from 'src/tempatpenugasan/penugasan.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'JadwalJumatSchema', schema: JadwalJumatSchemaModel }, { name: 'TempatPenugasanSchema', schema: TempatPenugasanSchemaModel }, { name: 'MubalighSchema', schema: MubalighSchemaModel }, { name: 'PimpinanjemaahSchema', schema: PimpinanjemaahSchemaModel }])],
  controllers: [JadwalJumatController],
  providers: [ProfileMatchingServiceJumat, TempatPenugasanService],
})
export class JadwalJumatModule {}