import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TempatPenugasanSchema } from './schemas/penugasan.schema';
import { TempatPenugasanSchemaDto } from './dto/create-penugasan.dto';
import { PimpinanjemaahSchema } from 'src/pimpinanjamaah/schemas/pimpinanjamaah.schema';
import { MubalighSchema } from 'src/mubaligh/schemas/mubaligh.schema';

@Injectable()
export class TempatPenugasanService {
  constructor(
    @InjectModel('TempatPenugasanSchema')
    private tempatPenugasanModel: Model<TempatPenugasanSchema>,
    private mubalighModel: Model<MubalighSchema>,
    private pimpinanjemaahModel: Model<PimpinanjemaahSchema>,
  ) {}

  async createTempatPenugasan(tempatPenugasanDto: TempatPenugasanSchemaDto): Promise<TempatPenugasanSchema> {
    const pimpinanjemaah = await this.pimpinanjemaahModel.find().exec();
    const penugasan = await this.tempatPenugasanModel.find().exec();
    const mubaligh = await this.mubalighModel.find().exec();
    // manipulasi data

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