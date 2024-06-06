import { Injectable , NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PimpinanjemaahSchema, ScopeDakwahJumat, ScopeDakwahPengajian } from './schemas/pimpinanjamaah.schema';
import { PimpinanjemaahSchemaDto } from './dto/create-pj.dto';
import { MubalighSchema } from 'src/mubaligh/schemas/mubaligh.schema';
import { UpdatePimpinanjemaahDto } from './dto/update-pimpinanjemaah.dto';

@Injectable()
export class PimpinanjemaanService {
  constructor(
    @InjectModel('PimpinanjemaahSchema')
    private pimpinanjemaahModel: Model<PimpinanjemaahSchema>,
    @InjectModel('MubalighSchema')
    private mubalighModel: Model<MubalighSchema>,
  ) {}

  async createPimpinanjemaan(pimpinanjemaanDTO: PimpinanjemaahSchemaDto): Promise<PimpinanjemaahSchema> {
    const mubaligh = await this.mubalighModel.findById(pimpinanjemaanDTO.idKetuaPJ);
    pimpinanjemaanDTO.KetuaPJ = mubaligh.mubalighName;
    const newPimpinanjemaan = new this.pimpinanjemaahModel(pimpinanjemaanDTO);
    return await newPimpinanjemaan.save();
  }

  async findAllPimpinanjemaan(): Promise<PimpinanjemaahSchema[]> {
    return await this.pimpinanjemaahModel.find().exec();
  }

  async findPimpinanjemaanById(id: string): Promise<PimpinanjemaahSchema> {
    return await this.pimpinanjemaahModel.findById(id)
    .exec();
  }

  async update(id: string, updatePimpinanjemaahDto: UpdatePimpinanjemaahDto): Promise<PimpinanjemaahSchema> {
    const existingPimpinanjemaah = await this.pimpinanjemaahModel.findById(id).exec();
    const mubaligh = await this.mubalighModel.findById(updatePimpinanjemaahDto.idKetuaPJ)
    existingPimpinanjemaah.KetuaPJ = mubaligh.mubalighName;
    if (!existingPimpinanjemaah) {
      throw new NotFoundException(`Pimpinanjemaah with ID ${id} not found`);
    }

    Object.assign(existingPimpinanjemaah, updatePimpinanjemaahDto);

    return existingPimpinanjemaah.save();
  }

  // async updatePimpinanjemaan(id: string, pimpinanjemaahDTO: PimpinanjemaahSchemaDto): Promise<PimpinanjemaahSchema> {
  //   const pimpinan = await this.pimpinanjemaahModel.findById(id);
  //   const namaMubaligh = await this.mubalighModel.findById(pimpinanjemaahDTO.idKetuaPJ)
  //   pimpinan._id = pimpinanjemaahDTO.idKetuaPJ;
  //   pimpinan.KetuaPJ = namaMubaligh.mubalighName;
  //   pimpinan.Nama = pimpinanjemaahDTO.Nama;
  //   pimpinan.scope_dakwah_jumat=[]
  //   const scopedakwahjumat = new ScopeDakwahJumat();
  //   pimpinanjemaahDTO.scope_dakwah_jumat.forEach(a=>{
  //     scopedakwahjumat._id =  a._id;
  //     scopedakwahjumat.Nama = a.Nama;
  //     scopedakwahjumat.minggu_ke = a.minggu_ke;
  //   } 
  // )
  // pimpinan.scope_dakwah_jumat.push(scopedakwahjumat);

    // pimpinan.scope_dakwah_pengajian.Keahlian = [];
    // pimpinanjemaahDTO.scope_dakwah_pengajian.Keahlian.forEach(b=>{
    //   const scopedawahpengajian = new ScopeDakwahPengajian();
    //   scopedawahpengajian.Keahlian.forEach(p=>{
    //     p.idKeahlian = b.idKeahlian;
    //     p.nama = b.nama;
    //     p.MinimalKeahlian = b.MinimalKeahlian;
    //     scopedawahpengajian.Keahlian.push(p);
    //   })
    //   pimpinan.scope_dakwah_pengajian.Keahlian.push(scopedawahpengajian)
    // })


    // return await pimpinan.save();
    // return await this.pimpinanjemaahModel.findByIdAndUpdate(id, pimpinanjemaahDTO, { new: true }).exec();
  // }

  async deletePimpinanjemaan(id: string): Promise<PimpinanjemaahSchema> {
    return await this.pimpinanjemaahModel.findByIdAndDelete(id).exec();
  }
}