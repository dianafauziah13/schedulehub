import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KeahlianSchema } from './schemas/keahlian.schema';
import { keahlianDTO } from './dto/create-keahlian.dto';

@Injectable()
export class KeahlianService {
  constructor(
    @InjectModel('KeahlianSchema')
    private keahlianModel: Model<KeahlianSchema>,
  ) {}

  async createKnowledge(keahlianDTO: keahlianDTO): Promise<KeahlianSchema> {
    const newKeahlian = new this.keahlianModel(keahlianDTO);
    return await newKeahlian.save();
  }

  async findAllKnowlegde(): Promise<KeahlianSchema[]> {
    return await this.keahlianModel.find().exec();
  }

  async findKnowlegdeById(id: string): Promise<KeahlianSchema> {
    return await this.keahlianModel.findById(id).exec();
  }

  async updateKnowlegde(id: string, keahlianDTO: keahlianDTO): Promise<KeahlianSchema> {
    return await this.keahlianModel.findByIdAndUpdate(id, keahlianDTO, { new: true }).exec();
  }

  async deleteKnowlegde(id: string): Promise<KeahlianSchema> {
    return await this.keahlianModel.findByIdAndDelete(id).exec();
  }
}