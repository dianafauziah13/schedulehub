import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TempatPenugasanSchema, pimpinan } from './schemas/penugasan.schema';
import { TempatPenugasanSchemaDto } from './dto/create-penugasan.dto';
import { PimpinanjemaahSchema } from 'src/pimpinanjamaah/schemas/pimpinanjamaah.schema';
import { MubalighSchema } from 'src/mubaligh/schemas/mubaligh.schema';

@Injectable()
export class TempatPenugasanService {
  constructor(
    @InjectModel('TempatPenugasanSchema')
    private tempatPenugasanModel: Model<TempatPenugasanSchema>,
    @InjectModel('MubalighSchema')
    private mubalighModel: Model<MubalighSchema>,
    @InjectModel('PimpinanjemaahSchema')
    private pimpinanjemaahModel: Model<PimpinanjemaahSchema>,
  ) {}

  async createTempatPenugasan(tempatPenugasanDto: TempatPenugasanSchemaDto): Promise<TempatPenugasanSchema> {
    const pimpinanjemaah = await this.pimpinanjemaahModel.findById(tempatPenugasanDto.Penugasan.pimpinan._id).exec();
    //  console.log(pimpinanjemaah);
    const Tempatpenugasan = await this.tempatPenugasanModel.find().exec();
    // const mubaligh = await this.mubalighModel.find().exec();

    // manipulasi data
    // tempatPenugasanDto.Penugasan.pimpinan.Nama = pimpinanjemaah.Nama;
    // tempatPenugasanDto.Penugasan.pimpinan.scope_dakwah_jumat = pimpinanjemaah.scopeDakwahJumat

    const newTempatPenugasan = new this.tempatPenugasanModel(tempatPenugasanDto);
    newTempatPenugasan.Penugasan.pimpinan.scope_dakwah_jumat = pimpinanjemaah.scope_dakwah_jumat;
    console.log(newTempatPenugasan)
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