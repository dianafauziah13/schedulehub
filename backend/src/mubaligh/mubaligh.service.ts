import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MubalighSchema } from './schemas/mubaligh.schema';
import { MubalighSchemaDto } from './dto/create-mubaligh.dto';
import { ScopeDakwahSchema } from 'src/scopeDakwah/schemas/scopedakwah.schema';
import { UpdateMubalighSchemaDto } from './dto/update-mubaligh.dto';



@Injectable()
export class MubalighService {
  constructor(
    @InjectModel('MubalighSchema')
    private mubalighModel: Model<MubalighSchema>,
    @InjectModel('ScopeDakwahSchema')
    private scopeModel: Model<ScopeDakwahSchema>,
  ) {}

  async createMubaligh(mubalighDto: MubalighSchemaDto): Promise<MubalighSchema> {
    const scopeDakwah = await this.scopeModel.findById(mubalighDto.idScopeDakwah);
    mubalighDto.scope_dakwah = scopeDakwah.LingkupDakwah;
    const newMubaligh = new this.mubalighModel(mubalighDto);
    console.log(newMubaligh)
    return await newMubaligh.save();
  }

  async findAllMubaligh(): Promise<MubalighSchema[]> {
    return await this.mubalighModel.find()
    .exec();
  }

  async findMubalighById(id: string): Promise<MubalighSchema> {
    // return await (await this.mubalighModel.findById(id)).populated('idScopeDakwah').exec();
    const mubaligh = await (await this.mubalighModel.findById(id))
    console.log(mubaligh);
    return mubaligh;
  }

  async updateMubaligh(id: string, updatemubalighDto: UpdateMubalighSchemaDto): Promise<MubalighSchema> {
    const existingMubaligh = await this.mubalighModel.findById(id).exec();
    const scopeDakwah = await this.scopeModel.findById(updatemubalighDto.idScopeDakwah);
    existingMubaligh.scope_dakwah = scopeDakwah.LingkupDakwah;
    if (!existingMubaligh) {
      throw new NotFoundException(`Mubaligh with ID ${id} not found`);
    }
    Object.assign(existingMubaligh, updatemubalighDto);
    return existingMubaligh.save()
  }

  async deleteMubaligh(id: string): Promise<MubalighSchema> {
    return await this.mubalighModel.findByIdAndDelete(id).exec();
  }
}