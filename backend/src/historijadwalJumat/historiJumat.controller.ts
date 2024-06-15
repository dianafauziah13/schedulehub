import { Body, Controller, Post,  Get, Param, Put, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { historiJumatService } from './historiJumat.service';
import { historiJadwalJumatSchemaDto } from './dto/create-histori.dto';
import { historiJadwalJumatSchema } from './schemas/histori.schema';

@Controller('historijumat')
export class historiJumatController {
  constructor(
    // @InjectModel('JadwalJumatSchemaDto')
    // private tempatPenugasanModel : Model<JadwalJumatSchemaDto>,
     private readonly historiJumatService: historiJumatService
  ) {}

  @Post()
  async createJadwalJumat(@Body() historiJumatDTO: historiJadwalJumatSchemaDto): Promise<historiJadwalJumatSchema  > {
    const createdJadwalJumat = await this.historiJumatService.createHistoriJumat(historiJumatDTO);
    return createdJadwalJumat;
  }

  @Get()
  async getAllJadwalJumat(): Promise<historiJadwalJumatSchema[]> {
    return await this.historiJumatService.findAllHistoriJumat();
  }
  

  @Delete(':id')
async deleteJadwalJumat(@Param('id') id:string): Promise<void>{
  const jadwal = await this.historiJumatService.deleteHistori(id);
  if (!jadwal)
    throw new HttpException('Data jadwal Tidak Ditemukan', HttpStatus.NOT_FOUND);
  
  await jadwal; 
}

@Get(':id')
async getJadwalJumatById(@Param('id') id: string): Promise<historiJadwalJumatSchema> {
  const isPimpinanJamaah = await this.historiJumatService.findHistoriJumatById(id);

  if (!isPimpinanJamaah)
    throw new HttpException('Data Pimpinan Jamaah Tidak Ditemukan', HttpStatus.NOT_FOUND);

  return isPimpinanJamaah;
}

@Put(':id')
async updateJadwalJumat(
  @Param('id') id: string,
  @Body() jadwalJumatDTO: historiJadwalJumatSchema,
): Promise<historiJadwalJumatSchema> {
  return await this.historiJumatService.updateStatusJumat(id, jadwalJumatDTO);
}

}