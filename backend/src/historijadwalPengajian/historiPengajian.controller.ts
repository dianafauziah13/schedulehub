import { Body, Controller, Post,  Get, Param, Put, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { historiPengajianService } from './historiPengajian.service';
import { historiPengajianSchemaDTO } from './dto/create-historiPengajian.dto';
import { historiPengajianSchema } from './schemas/historiPengajian.schema';



@Controller('historipengajian')
export class historiPengajianController {
  constructor(
    // @InjectModel('JadwalJumatSchmaDto')
    // private tempatPenugasanModel : Model<JadwalJumatSchemaDto>,
     private readonly historiPengajianService: historiPengajianService
  ) {}

  @Post()
  async createJadwalJumat(@Body() historiPengajianDTO: historiPengajianSchemaDTO): Promise<historiPengajianSchema  > {
    const createdJadwalJumat = await this.historiPengajianService.createHistoriJumat(historiPengajianDTO);
    return createdJadwalJumat;
  }

  @Get()
  async getAllJadwalJumat(): Promise<historiPengajianSchema[]> {
    return await this.historiPengajianService.findAllHistoriJumat();
  }
  

  @Delete(':id')
async deleteJadwalJumat(@Param('id') id:string): Promise<void>{
  const jadwal = await this.historiPengajianService.deleteHistori(id);
  if (!jadwal)
    throw new HttpException('Data jadwal Tidak Ditemukan', HttpStatus.NOT_FOUND);
  
  await jadwal; 
}

@Get(':id')
async getJadwalJumatById(@Param('id') id: string): Promise<historiPengajianSchema> {
  const isPimpinanJamaah = await this.historiPengajianService.findHistoriJumatById(id);

  if (!isPimpinanJamaah)
    throw new HttpException('Data Pimpinan Jamaah Tidak Ditemukan', HttpStatus.NOT_FOUND);

  return isPimpinanJamaah;
}

@Put(':id')
async updateJadwalJumat(
  @Param('id') id: string,
  @Body() historiPengajianDTO: historiPengajianSchema,
): Promise<historiPengajianSchema> {
  return await this.historiPengajianService.updateStatusJumat(id, historiPengajianDTO);
}

}