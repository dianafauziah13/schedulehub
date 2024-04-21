// services/scope-dakwah.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScopeDakwah } from './schemas/scopedakwah.schema';
import { ScopeDakwahDTO } from './dto/create-scopedakwah.dto';

@Injectable()
export class ScopeDakwahService {
    private readonly logger = new Logger(ScopeDakwahService.name);
    constructor(
    @InjectModel('ScopeDakwah')
    private scopeDakwahModel: Model<ScopeDakwah>,
  ) {}

  async createScopeDakwah(scopeDakwahDTO: ScopeDakwahDTO): Promise<ScopeDakwah> {
    try {
        const newScopeDakwah = new this.scopeDakwahModel(scopeDakwahDTO);
        return await newScopeDakwah.save();
      } catch (error) {
        this.logger.error(`Error creating ScopeDakwah: ${error.message}`, error.stack);
        throw error;
      }
  }

  async findAllScopeDakwah(): Promise<ScopeDakwah[]> {
    return await this.scopeDakwahModel.find().exec();
  }

  async findScopeDakwahById(id: string): Promise<ScopeDakwah> {
    return await this.scopeDakwahModel.findById(id).exec();
  }

  async updateScopeDakwah(id: string, scopeDakwahDTO: ScopeDakwahDTO): Promise<ScopeDakwah> {
    return await this.scopeDakwahModel.findByIdAndUpdate(id, scopeDakwahDTO, { new: true }).exec();
  }

  async deleteScopeDakwah(id: string): Promise<ScopeDakwah> {
    return await this.scopeDakwahModel.findByIdAndDelete(id).exec();
  }
}