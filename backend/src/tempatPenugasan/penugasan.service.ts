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
    // const Tempatpenugasan = await this.tempatPenugasanModel.find().exec();

    // const MubalighJumat = await this.mubalighModel.find({_id: [tempatPenugasanDto.Penugasan.mubaligh_khutbah_jumat[0]._id]}).exec();
    const mubalighIds = tempatPenugasanDto.Penugasan.mubaligh_khutbah_jumat.map(item => item._id);
    const MubalighJumat = await this.mubalighModel.find({ _id: { $in: mubalighIds } }).exec();
    
    // const MubalighPengajian = await this.mubalighModel.findById(tempatPenugasanDto.Penugasan.mubaligh_khutbah_pengajian[0]._id).exec();
    const mubalighIds2 = tempatPenugasanDto.Penugasan.mubaligh_khutbah_pengajian.map(item=>item._id);
    const MubalighPengajian = await this.mubalighModel.find({ _id: { $in: mubalighIds2 } }).exec();

    // manipulasi data
    const newTempatPenugasan = new this.tempatPenugasanModel(tempatPenugasanDto);
    newTempatPenugasan.Penugasan.pimpinan.scope_dakwah_jumat = pimpinanjemaah.scope_dakwah_jumat;
    newTempatPenugasan.Penugasan.pimpinan.scope_dakwah_pengajian = pimpinanjemaah.scope_dakwah_pengajian;
    newTempatPenugasan.Penugasan.mubaligh_khutbah_jumat= MubalighJumat;
    newTempatPenugasan.Penugasan.Mubaligh_Khutbah_pengajian = MubalighPengajian;

    // console.log(newTempatPenugasan)
    return await newTempatPenugasan.save();
  }

  async findAllTempatPenugasan(): Promise<TempatPenugasanSchema[]> {
    return await this.tempatPenugasanModel.find().exec();
  }

  async findTempatPenugasanById(id: string): Promise<TempatPenugasanSchema> {
    // return await this.tempatPenugasanModel.findById(id).exec();
    return await this.tempatPenugasanModel.findById(id).exec();
  }

  async updateTempatPenugasan(id: string, tempatPenugasanDto: TempatPenugasanSchemaDto): Promise<TempatPenugasanSchema> {
    return await this.tempatPenugasanModel.findByIdAndUpdate(id, tempatPenugasanDto, { new: true }).exec();
  }

  async deleteTempatPenugasan(id: string): Promise<TempatPenugasanSchema> {
    return await this.tempatPenugasanModel.findByIdAndDelete(id).exec();
  }
}