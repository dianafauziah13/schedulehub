import { Body, Controller, Post,  Get, Param, Put, HttpException, HttpStatus, Delete,Query  } from '@nestjs/common';
import { ProfileMatchingService } from './profileMatching.service';
import { PengajianSchema } from './schemas/pengajian.schema';
import { PengajianSchemaDTO } from './dto/create-pengajian.dto';

@Controller('genetarePengajian')
export class JadwalPengajianController {
  constructor(private readonly profilematchingService: ProfileMatchingService) {}

//   @Post()
//   async createJadwalPengajian(@Body() pengajianDTO: PengajianSchemaDTO): Promise<PengajianSchema> {
//     const createJadwalPengajian = await this.profilematchingService.generateProfilePengajian(pengajianDTO);
//     return createJadwalPengajian;
//   }

@Post()
async generateJadwalJumat(@Body() jadwalPengajianDTO: PengajianSchemaDTO): Promise<PengajianSchema> {
  const createdJadwalJumat = await this.profilematchingService.generateProfilePengajian(jadwalPengajianDTO);
  return createdJadwalJumat;
}

@Get()
async getAllJadwalPengajian(): Promise<PengajianSchema[]> {
  return await this.profilematchingService.findAllJadwalPengajian();
}

@Get('by-date')
async findByDate(
  @Body('bulan') bulan: number,
  @Body('tahun') tahun: number
): Promise<{ data: PengajianSchema[] }> {
  return await this.profilematchingService.findByDate(bulan, tahun);
}

@Delete(':id')
async deleteJadwalPengajian(@Param('id') id:string): Promise<void>{
  const jadwal = await this.profilematchingService.deleteJadwalPengajian(id);
  if (!jadwal)
    throw new HttpException('Data jadwal Tidak Ditemukan', HttpStatus.NOT_FOUND);
  
  await jadwal; 
}
  // @Get()
  // async generateJadwalJumat() {
  //   const generateJadwalJumat = await this.profilematchingService.generateProfilePengajian();
  //   const hello = "hello gaiss";
  //   // console.log(generateJadwalJumat);
  //   return generateJadwalJumat;
  // }


}