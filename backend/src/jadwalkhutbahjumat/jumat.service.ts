import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JadwalJumatSchema } from './schemas/jumat.schema';
import { JadwalJumatSchemaDto } from './dto/create-jumat.dto';

@Injectable()
export class JadwalJumatService {
  constructor(
    @InjectModel('JadwalJumatSchema')
    private jadwalJumatModel: Model<JadwalJumatSchema>,
  ) {}

  async createJadwalJumat(jadwalJumatDTO: JadwalJumatSchemaDto): Promise<JadwalJumatSchema> {
    const newJadwalJumat = new this.jadwalJumatModel(jadwalJumatDTO);
    return await newJadwalJumat.save();
  }

  async findAllJadwalJumat(): Promise<JadwalJumatSchema[]> {
    return await this.jadwalJumatModel.find().exec();
  }

  async findJadwalJumatById(id: string): Promise<JadwalJumatSchema> {
    return await this.jadwalJumatModel.findById(id).exec();
  }

  async updateJadwalJumat(id: string, jadwalJumatDTO: JadwalJumatSchemaDto): Promise<JadwalJumatSchema> {
    return await this.jadwalJumatModel.findByIdAndUpdate(id, jadwalJumatDTO, { new: true }).exec();
  }

  async deleteJadwalJumat(id: string): Promise<JadwalJumatSchema> {
    return await this.jadwalJumatModel.findByIdAndDelete(id).exec();
  }
}