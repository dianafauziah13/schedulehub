import { Body, Controller, Post,  Get, Param, Put, HttpException, HttpStatus  } from '@nestjs/common';
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

  // @Get()
  // async generateJadwalJumat() {
  //   const generateJadwalJumat = await this.profilematchingService.generateProfilePengajian();
  //   const hello = "hello gaiss";
  //   // console.log(generateJadwalJumat);
  //   return generateJadwalJumat;
  // }


}