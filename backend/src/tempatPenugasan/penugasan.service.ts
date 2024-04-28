import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TempatPenugasanSchema } from './schemas/penugasan.schema';
import { TempatPenugasanSchemaDto } from './dto/create-penugasan.dto';

@Injectable()
export class TempatPenugasanService {
  constructor(
    @InjectModel('TempatPenugasanSchema')
    private tempatPenugasanModel: Model<TempatPenugasanSchema>,
  ) {}

  async createTempatPenugasan(tempatPenugasanDto: TempatPenugasanSchemaDto): Promise<TempatPenugasanSchema> {
    const newTempatPenugasan = new this.tempatPenugasanModel(tempatPenugasanDto);
    return await newTempatPenugasan.save();
  }

  async findAllTempatPenugasan(): Promise<TempatPenugasanSchema[]> {
    return await this.tempatPenugasanModel.find()
    .populate('Penugasan.idPimpinanJemaah')
    .populate('Penugasan.Mubaligh_KhutbahJumat')
    .populate('Penugasan.Mubaligh_KhutbahPengajian')
    .exec();
  }

  async findTempatPenugasanById(id: string): Promise<TempatPenugasanSchema> {
    // return await this.tempatPenugasanModel.findById(id).exec();
    return await this.tempatPenugasanModel.findById(id)
    .populate('Penugasan.idPimpinanJemaah')
    .populate('Penugasan.Mubaligh_KhutbahJumat')
    .populate('Penugasan.Mubaligh_KhutbahPengajian')
    .exec();
  }

  async updateTempatPenugasan(id: string, tempatPenugasanDto: TempatPenugasanSchemaDto): Promise<TempatPenugasanSchema> {
    return await this.tempatPenugasanModel.findByIdAndUpdate(id, tempatPenugasanDto, { new: true }).exec();
  }

  async deleteTempatPenugasan(id: string): Promise<TempatPenugasanSchema> {
    return await this.tempatPenugasanModel.findByIdAndDelete(id).exec();
  }
}