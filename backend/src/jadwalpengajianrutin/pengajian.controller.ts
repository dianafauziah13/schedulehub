import { Body, Controller, Post,  Get, Param, Put, HttpException, HttpStatus, Delete,Query  } from '@nestjs/common';
import { ProfileMatchingService } from './profileMatching.service';
import { PengajianSchema } from './schemas/pengajian.schema';
import { PengajianSchemaDTO } from './dto/create-pengajian.dto';

@Controller('generatePengajian')
export class JadwalPengajianController {
  constructor(private readonly profilematchingService: ProfileMatchingService) {}

//   @Post()
//   async createJadwalPengajian(@Body() pengajianDTO: PengajianSchemaDTO): Promise<PengajianSchema> {
//     const createJadwalPengajian = await this.profilematchingService.generateProfilePengajian(pengajianDTO);
//     return createJadwalPengajian;
//   }

@Post()
async generateJadwalPengajian(@Body() jadwalPengajianDTO: PengajianSchemaDTO): Promise<PengajianSchema> {
  const createdJadwalPengajian = await this.profilematchingService.generateProfilePengajian(jadwalPengajianDTO);
  if (createdJadwalPengajian == true )
    throw new HttpException('Data jadwal sudah melebihi dari 5 kali generate', HttpStatus.BAD_REQUEST);
  else if (createdJadwalPengajian == null)
    throw new HttpException('Tidak ada data penugasan', HttpStatus.BAD_REQUEST)
  return createdJadwalPengajian;
}

@Get()
async getAllJadwalPengajian(): Promise<PengajianSchema[]> {
  return await this.profilematchingService.findAllJadwalPengajian();
}

@Post('by-date')
async findByDate(
  @Body('bulan') bulan: number,
  @Body ('tahun') tahun: number
): Promise<PengajianSchema> {
  return await this.profilematchingService.findByDate(bulan, tahun);
}

@Delete(':id')
async deleteJadwalPengajian(@Param('id') id:string): Promise<void>{
  const jadwal = await this.profilematchingService.deleteJadwalPengajian(id);
  if (!jadwal)
    throw new HttpException('Data jadwal Tidak Ditemukan', HttpStatus.NOT_FOUND);
  
  await jadwal; 
}

@Put(':id')
async updateJadwalPengajian(
  @Param('id') id: string,
  @Body() jadwalPengajianDTO: PengajianSchema,
): Promise<PengajianSchema> {
  return await this.profilematchingService.updateStatusPengajian(id, jadwalPengajianDTO);
}

@Get(':id')
async getJadwalPengajianById(@Param('id') id: string): Promise<PengajianSchema> {
  const isPimpinanJamaah = await this.profilematchingService.findJadwalPengajianById(id);

  if (!isPimpinanJamaah)
    throw new HttpException('Data Pimpinan Jamaah Tidak Ditemukan', HttpStatus.NOT_FOUND);

  return isPimpinanJamaah;
}


  // @Get()
  // async generateJadwalJumat() {
  //   const generateJadwalJumat = await this.profilematchingService.generateProfilePengajian();
  //   const hello = "hello gaiss";
  //   // console.log(generateJadwalJumat);
  //   return generateJadwalJumat;
  // }


}