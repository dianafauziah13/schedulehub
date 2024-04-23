import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MubalighSchema } from './schemas/mubaligh.schema';
import { MubalighSchemaDto } from './dto/create-mubaligh.dto';

@Injectable()
export class MubalighService {
  constructor(
    @InjectModel('MubalighSchema')
    private mubalighModel: Model<MubalighSchema>,
  ) {}

  async createMubaligh(mubalighDto: MubalighSchemaDto): Promise<MubalighSchema> {
    const newMubaligh = new this.mubalighModel(mubalighDto);
    return await newMubaligh.save();
  }

  async findAllMubaligh(): Promise<MubalighSchema[]> {
    return await this.mubalighModel.find().exec();
  }

  async findMubalighById(id: string): Promise<MubalighSchema> {
    return await this.mubalighModel.findById(id).exec();
  }

  async updateMubaligh(id: string, mubalighDto: MubalighSchemaDto): Promise<MubalighSchema> {
    return await this.mubalighModel.findByIdAndUpdate(id, mubalighDto, { new: true }).exec();
  }

  async deleteMubaligh(id: string): Promise<MubalighSchema> {
    return await this.mubalighModel.findByIdAndDelete(id).exec();
  }
}