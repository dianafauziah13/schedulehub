import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PengajianSchema } from './schemas/pengajian.schema';
import { PengajianSchemaDTO } from './dto/create-pengajian.dto';

import { TempatPenugasanService } from 'src/tempatpenugasan/penugasan.service';
import { TempatPenugasanSchema } from 'src/tempatpenugasan/schemas/penugasan.schema';
import { ProfileMatchingService } from './profileMatching.service';
TempatPenugasanSchema
TempatPenugasanService
ProfileMatchingService


@Injectable()
export class PengajianService {
  constructor(
    @InjectModel('PimpinanjemaahSchema')
    private pengajianModel: Model<PengajianSchema>,
  ) {}

  async GenerateJadwalPengajian(pengajianDTO: PengajianSchemaDTO): Promise<PengajianSchema> {
    
    const newJadwalJumat = new this.pengajianModel(PengajianSchemaDTO);
    return await newJadwalJumat.save();
  }
}