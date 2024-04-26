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
    console.log(mubalighDto)
    const newMubaligh = new this.mubalighModel(mubalighDto);
    console.log(newMubaligh)
    return await newMubaligh.save();
  }

  async findAllMubaligh(): Promise<MubalighSchema[]> {
    return await this.mubalighModel.find()
    .populate('idScopeDakwah')
    .populate('ListKeahlian.idListKeahlian')
    .exec();
  }

  async findMubalighById(id: string): Promise<MubalighSchema> {
    // return await (await this.mubalighModel.findById(id)).populated('idScopeDakwah').exec();
    const mubaligh = await (await this.mubalighModel.findById(id)).populate({
      path: 'ListKeahlian',
      populate: {path: 'idListKeahlian'}
    });
    console.log(mubaligh);
    return mubaligh;
  }

  async updateMubaligh(id: string, mubalighDto: MubalighSchemaDto): Promise<MubalighSchema> {
    return await this.mubalighModel.findByIdAndUpdate(id, mubalighDto, { new: true }).exec();
  }

  async deleteMubaligh(id: string): Promise<MubalighSchema> {
    return await this.mubalighModel.findByIdAndDelete(id).exec();
  }
}