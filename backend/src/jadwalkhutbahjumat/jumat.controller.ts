import { Body, Controller, Post,  Get, Param, Put, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { JadwalJumatService } from './jumat.service'
import { JadwalJumatSchemaDto, jumatDTOBaru} from './dto/create-jumat.dto';
import { Jadwal, JadwalJumatSchema } from './schemas/jumat.schema';
import { ProfileMatchingServiceJumat } from './profileMatchingJumat.service';

@Controller('generatejadwaljumat')
export class JadwalJumatController {
  constructor(
    // @InjectModel('JadwalJumatSchemaDto')
    // private tempatPenugasanModel : Model<JadwalJumatSchemaDto>,
     private readonly profileMatchingServiceJumat: ProfileMatchingServiceJumat
  ) {}

  @Post()
  async createJadwalJumat(@Body() jadwalJumatDTO: JadwalJumatSchemaDto): Promise<JadwalJumatSchema> {
    const createdJadwalJumat = await this.profileMatchingServiceJumat.generateProfileJumat(jadwalJumatDTO);
    if (createdJadwalJumat == true )
      throw new HttpException('Data jadwal sudah melebihi dari 5 kali generate', HttpStatus.BAD_REQUEST);
    else if (createdJadwalJumat == false)
      throw new HttpException('Jadwal sudah disetujui', HttpStatus.BAD_REQUEST);
    else if (createdJadwalJumat == null)
      throw new HttpException('Tidak ada data penugasan', HttpStatus.BAD_REQUEST)
    return createdJadwalJumat;
  }

  @Get()
  async getAllJadwalJumat(): Promise<JadwalJumatSchema[]> {
    return await this.profileMatchingServiceJumat.findAllJadwalJumat();
  }
  
  @Post('by-date')
  async findByDate(
    @Body('bulan') bulan: number,
    @Body ('tahun') tahun: number
  ): Promise<JadwalJumatSchema> {
    return await this.profileMatchingServiceJumat.findByDate(bulan, tahun);
  }

  @Delete(':id')
async deleteJadwalJumat(@Param('id') id:string): Promise<void>{
  const jadwal = await this.profileMatchingServiceJumat.deleteJadwalJumat(id);
  if (!jadwal)
    throw new HttpException('Data jadwal Tidak Ditemukan', HttpStatus.NOT_FOUND);
  
  await jadwal; 
}

@Get(':id')
async getJadwalJumatById(@Param('id') id: string): Promise<JadwalJumatSchema> {
  const isPimpinanJamaah = await this.profileMatchingServiceJumat.findJadwalJumatById(id);

  if (!isPimpinanJamaah)
    throw new HttpException('Data Pimpinan Jamaah Tidak Ditemukan', HttpStatus.NOT_FOUND);

  return isPimpinanJamaah;
}

@Put(':id')
async updateJadwalJumat(
  @Param('id') id: string,
  @Body() jadwalJumatDTO: JadwalJumatSchema,
): Promise<JadwalJumatSchema> {
  return await this.profileMatchingServiceJumat.updateStatusJumat(id, jadwalJumatDTO);
}

@Put(':id/by-week')
async updateJadwal(
  @Param('id') id: string,
  @Body() jadwalJumatDTO: jumatDTOBaru[],
): Promise<jumatDTOBaru[]> {
  return await this.profileMatchingServiceJumat.updateMubaligh(id, jadwalJumatDTO);
}


  // @Get()
  // async generateJadwalJumat() {
  //   const generateJadwalJumat = await this.profileMatchingServiceJumat.generateProfileJumat();
  //   const hello = "hello gaiss";
  //   // console.log(generateJadwalJumat);
  //   return generateJadwalJumat;
  // }

  // @Get()
  // async getAllJadwalJumat(): Promise<JadwalJumatSchema[]> {
  //   return await this.jadwalJumatService.findAllJadwalJumat();
  // }

  // @Get(':id')
  // async getJadwalJumatById(@Param('id') id: string): Promise<JadwalJumatSchema> {
  //   return await this.jadwalJumatService.findJadwalJumatById(id);
  // }

  // @Put(':id')
  // async updateJadwalJumat(
  //   @Param('id') id: string,
  //   @Body() jadwalJumatDto: JadwalJumatSchemaDto,
  // ): Promise<JadwalJumatSchema> {
  //   return await this.jadwalJumatService.updateJadwalJumat(id, jadwalJumatDto);
  // }
  // Add other CRUD methods as needed
}