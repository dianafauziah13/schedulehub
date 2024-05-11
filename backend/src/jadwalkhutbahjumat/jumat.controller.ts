import { Body, Controller, Post,  Get, Param, Put } from '@nestjs/common';
import { JadwalJumatService } from './jumat.service'
import { JadwalJumatSchemaDto } from './dto/create-jumat.dto';
import { JadwalJumatSchema } from './schemas/jumat.schema';

@Controller('generatejadwaljumat')
export class JadwalJumatController {
  constructor(private readonly jadwalJumatService: JadwalJumatService) {}

  @Post()
  async createJadwalJumat(@Body() jadwalJumatDTO: JadwalJumatSchemaDto): Promise<JadwalJumatSchema> {
    const createdJadwalJumat = await this.jadwalJumatService.createJadwalJumat(jadwalJumatDTO);
    return createdJadwalJumat;
  }

  @Get()
  async getAllJadwalJumat(): Promise<JadwalJumatSchema[]> {
    return await this.jadwalJumatService.findAllJadwalJumat();
  }

  @Get(':id')
  async getJadwalJumatById(@Param('id') id: string): Promise<JadwalJumatSchema> {
    return await this.jadwalJumatService.findJadwalJumatById(id);
  }

  @Put(':id')
  async updateJadwalJumat(
    @Param('id') id: string,
    @Body() jadwalJumatDto: JadwalJumatSchemaDto,
  ): Promise<JadwalJumatSchema> {
    return await this.jadwalJumatService.updateJadwalJumat(id, jadwalJumatDto);
  }
  // Add other CRUD methods as needed
}