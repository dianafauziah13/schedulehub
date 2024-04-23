import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PengajianSchema } from './schemas/pengajian.schema';
import { PengajianSchemaDTO } from './dto/create-pengajian.dto';


@Injectable()
export class PengajianService {
  constructor(
    @InjectModel('PimpinanjemaahSchema')
    private pengajianModel: Model<PengajianSchema>,
  ) {}

  async GenerateJadwalPengajian(pengajianDTO: PengajianSchemaDTO): Promise<PengajianSchema> {
    const newPimpinanjemaan = new this.pengajianModel(PengajianSchemaDTO);
    return await newPimpinanjemaan.save();
  }
}