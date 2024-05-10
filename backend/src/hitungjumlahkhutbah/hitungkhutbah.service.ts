// services/scope-dakwah.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HitungKhutbahSchema } from './schemas/hitungkhutbah.schema';
import { HitungKhutbahSchemaDto } from './dto/create-hitungkhutbah.dto';

@Injectable()
export class HitungKhutbahService {
    constructor(
    @InjectModel('HitungKhutbahSchema')
    private HitungKhutbahModel: Model<HitungKhutbahSchema>,
  ) {}

  async createHitungKhutbah(HitungKhutbahDto: HitungKhutbahSchemaDto): Promise<HitungKhutbahSchema> {
    const newHitungKhutbah = new this.HitungKhutbahModel(HitungKhutbahDto);
    return await newHitungKhutbah.save();
  }

  async findAllHitungKhutbah(): Promise<HitungKhutbahSchema[]> {
    return await this.HitungKhutbahModel.find().exec();
  }

  async findHitungKhutbahById(id: string): Promise<HitungKhutbahSchema> {
    return await this.HitungKhutbahModel.findById(id).exec();
  }

  async updateHitungKhutbah(id: string, HitungKhutbahDto: HitungKhutbahSchemaDto): Promise<HitungKhutbahSchema> {
    return await this.HitungKhutbahModel.findByIdAndUpdate(id, HitungKhutbahDto, { new: true }).exec();
  }

  async deleteHitungKhutbah(id: string): Promise<HitungKhutbahSchema> {
    return await this.HitungKhutbahModel.findByIdAndDelete(id).exec();
  }
}