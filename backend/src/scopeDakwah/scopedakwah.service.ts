import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScopeDakwahSchema } from './schemas/scopedakwah.schema';
import { ScopeDakwahDTO } from './dto/create-scopedakwah.dto';

@Injectable()
export class ScopeDakwahService {
  constructor(
    @InjectModel('ScopeDakwahSchema')
    private scopeDakwahModel: Model<ScopeDakwahSchema>,
  ) {}

  async createScopeDakwah(scopeDakwahDTO: ScopeDakwahDTO): Promise<ScopeDakwahSchema> {
    const newScopeDakwah = new this.scopeDakwahModel(scopeDakwahDTO);
    // console.log(newScopeDakwah);
    return await newScopeDakwah.save();
  }

  async findAllScopeDakwah(): Promise<ScopeDakwahSchema[]> {
    return await this.scopeDakwahModel.find().exec();
  }

  async findScopeDakwahById(id: string): Promise<ScopeDakwahSchema> {
    return await this.scopeDakwahModel.findById(id).exec();
  }

  async updateScopeDakwah(id: string, scopeDakwahDTO: ScopeDakwahDTO): Promise<ScopeDakwahSchema> {
    return await this.scopeDakwahModel.findByIdAndUpdate(id, scopeDakwahDTO, { new: true }).exec();
  }

  async deleteKnowlegde(id: string): Promise<ScopeDakwahSchema> {
    return await this.scopeDakwahModel.findByIdAndDelete(id).exec();
  }
}
// // services/scope-dakwah.service.ts
// import { Injectable, Logger } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { ScopeDakwahSchema } from './schemas/scopedakwah.schema';
// import { ScopeDakwahDTO } from './dto/create-scopedakwah.dto';

// @Injectable()
// export class ScopeDakwahService {
//     // private readonly logger = new Logger(ScopeDakwahService.name);
//     constructor(
//     @InjectModel('ScopeDakwahSchema')
//     private scopeDakwahModel: Model<ScopeDakwahSchema>,
//   ) {}

//   async createScopeDakwah(scopeDakwahDTO: ScopeDakwahDTO): Promise<ScopeDakwahSchema> {
//     // try {
//         const newScopeDakwah = new this.scopeDakwahModel(scopeDakwahDTO);
//         return await newScopeDakwah.save();
//       // } catch (error) {
//       //   this.logger.error(`Error creating ScopeDakwah: ${error.message}`, error.stack);
//       //   throw error;
//       // }
//   }

//   async findAllScopeDakwah(): Promise<ScopeDakwahSchema[]> {
//     return await this.scopeDakwahModel.find().exec();
//   }

//   async findScopeDakwahById(id: string): Promise<ScopeDakwahSchema> {
//     return await this.scopeDakwahModel.findById(id).exec();
//   }

//   async updateScopeDakwah(id: string, scopeDakwahDTO: ScopeDakwahDTO): Promise<ScopeDakwahSchema> {
//     return await this.scopeDakwahModel.findByIdAndUpdate(id, scopeDakwahDTO, { new: true }).exec();
//   }

//   async deleteScopeDakwah(id: string): Promise<ScopeDakwahSchema> {
//     return await this.scopeDakwahModel.findByIdAndDelete(id).exec();
//   }
// }