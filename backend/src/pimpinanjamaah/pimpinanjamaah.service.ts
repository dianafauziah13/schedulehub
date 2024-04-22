import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PimpinanjemaahSchema } from './schemas/pimpinanjamaah.schema';
import { PimpinanjemaahSchemaDto } from './dto/create-pj.dto';

@Injectable()
export class PimpinanjemaanService {
  constructor(
    @InjectModel('PimpinanjemaahSchema')
    private pimpinanjemaahModel: Model<PimpinanjemaahSchema>,
  ) {}

  async createPimpinanjemaan(pimpinanjemaanDTO: PimpinanjemaahSchemaDto): Promise<PimpinanjemaahSchema> {
    const newPimpinanjemaan = new this.pimpinanjemaahModel(pimpinanjemaanDTO);
    return await newPimpinanjemaan.save();
  }

  async findAllPimpinanjemaan(): Promise<PimpinanjemaahSchema[]> {
    return await this.pimpinanjemaahModel.find().exec();
  }

  async findPimpinanjemaanById(id: string): Promise<PimpinanjemaahSchema> {
    return await this.pimpinanjemaahModel.findById(id).exec();
  }

  async updatePimpinanjemaan(id: string, pimpinanjemaanDTO: PimpinanjemaahSchemaDto): Promise<PimpinanjemaahSchema> {
    return await this.pimpinanjemaahModel.findByIdAndUpdate(id, pimpinanjemaanDTO, { new: true }).exec();
  }

  async deletePimpinanjemaan(id: string): Promise<PimpinanjemaahSchema> {
    return await this.pimpinanjemaahModel.findByIdAndDelete(id).exec();
  }
}