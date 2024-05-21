import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TempatPenugasanSchemaModel } from 'src/tempatpenugasan/schemas/penugasan.schema';
import { MubalighSchemaModel } from 'src/mubaligh/schemas/mubaligh.schema';
import { PimpinanjemaahSchemaModel } from 'src/pimpinanjamaah/schemas/pimpinanjamaah.schema';
import { TempatPenugasanService } from 'src/tempatpenugasan/penugasan.service';
import { PengajianSchemaModel, jadwalModel } from './schemas/pengajian.schema';
import { JadwalPengajianController } from './pengajian.controller';
import { ProfileMatchingService } from './profileMatching.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'PengajianSchema', schema: PengajianSchemaModel }, { name: 'TempatPenugasanSchema', schema: TempatPenugasanSchemaModel }, { name: 'MubalighSchema', schema: MubalighSchemaModel }, { name: 'PimpinanjemaahSchema', schema: PimpinanjemaahSchemaModel }, { name: 'jadwal', schema: jadwalModel }])],
  controllers: [JadwalPengajianController],
  providers: [ProfileMatchingService, TempatPenugasanService],
})
export class JadwalPengajianModule {}