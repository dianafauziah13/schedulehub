import { Injectable , NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { historiPengajianSchema } from './schemas/historiPengajian.schema';
import { historiPengajianSchemaDTO } from './dto/create-historiPengajian.dto';




@Injectable()
export class historiPengajianService {
  constructor(
    @InjectModel('historiPengajianSchema')
    private historiJumatModel: Model<historiPengajianSchema>,

  ) {}

  async createHistoriJumat(historiJumatDTO: historiPengajianSchemaDTO): Promise<historiPengajianSchema> {
    const newHistori = new this.historiJumatModel(historiJumatDTO);
    return await newHistori.save();
  }

  async findAllHistoriJumat(): Promise<historiPengajianSchema[]> {
    return await this.historiJumatModel.find().exec();
  }

  async findHistoriJumatById(id: string): Promise<historiPengajianSchema> {
    return await this.historiJumatModel.findById(id)
    .exec();
  }

  async updateStatusJumat(id: string, jadwalJumatDTO: historiPengajianSchema): Promise<historiPengajianSchema> {
    return await this.historiJumatModel.findByIdAndUpdate(id, jadwalJumatDTO, { new: true }).exec();
  }

  async deleteHistori(id: string): Promise<historiPengajianSchema> {
    return await this.historiJumatModel.findByIdAndDelete(id).exec();
  }
}