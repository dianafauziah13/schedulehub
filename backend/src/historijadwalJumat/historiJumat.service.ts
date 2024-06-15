import { Injectable , NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { historiJadwalJumatSchema } from './schemas/histori.schema';
import { historiJadwalJumatSchemaDto } from './dto/create-histori.dto';


@Injectable()
export class historiJumatService {
  constructor(
    @InjectModel('historiJadwalJumatSchema')
    private historiPengajianModel: Model<historiJadwalJumatSchema>,

  ) {}

  async createHistoriJumat(historiJumatDTO: historiJadwalJumatSchemaDto): Promise<historiJadwalJumatSchema> {
    const newHistori = new this.historiPengajianModel(historiJumatDTO);
    return await newHistori.save();
  }

  async findAllHistoriJumat(): Promise<historiJadwalJumatSchema[]> {
    return await this.historiPengajianModel.find().exec();
  }

  async findHistoriJumatById(id: string): Promise<historiJadwalJumatSchema> {
    return await this.historiPengajianModel.findById(id)
    .exec();
  }

  async updateStatusJumat(id: string, jadwalJumatDTO: historiJadwalJumatSchema): Promise<historiJadwalJumatSchema> {
    return await this.historiPengajianModel.findByIdAndUpdate(id, jadwalJumatDTO, { new: true }).exec();
  }

  async deleteHistori(id: string): Promise<historiJadwalJumatSchema> {
    return await this.historiPengajianModel.findByIdAndDelete(id).exec();
  }
}