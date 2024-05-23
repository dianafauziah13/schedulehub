import { Body, Controller, Post,  Get, Param, Put, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { JadwalJumatService } from './jumat.service'
import { JadwalJumatSchemaDto } from './dto/create-jumat.dto';
import { JadwalJumatSchema } from './schemas/jumat.schema';
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