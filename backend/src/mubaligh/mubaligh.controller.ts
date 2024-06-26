import { Body, Controller, Post,  Get, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MubalighService } from './mubaligh.service'
import { MubalighSchemaDto } from './dto/create-mubaligh.dto';
import { MubalighSchema } from './schemas/mubaligh.schema';

@Controller('mubaligh')
export class MubalighController {
  constructor(private readonly mubalighService: MubalighService) {}

  @Post()
  async createMubaligh(@Body() MubalighDto: MubalighSchemaDto): Promise<MubalighSchema> {
    const createMubaligh = await this.mubalighService.createMubaligh(MubalighDto);
    return createMubaligh;
  }

  @Get()
  async getAllMubaligh(): Promise<MubalighSchema[]> {
    return await this.mubalighService.findAllMubaligh();
  }

  @Get(':id')
  async getMubalighById(@Param('id') id: string): Promise<MubalighSchema> {
    const mubaligh = await this.mubalighService.findMubalighById(id);
    if (!mubaligh)
      throw new HttpException('Data Mubaligh Tidak Ditemukan', HttpStatus.NOT_FOUND);

    return mubaligh;
  }

  @Put(':id')
  async updateMubaligh(
    @Param('id') id: string,
    @Body() MubalighDto: MubalighSchemaDto,
  ): Promise<MubalighSchema> {
    return await this.mubalighService.updateMubaligh(id, MubalighDto);
  }

  @Delete(':id')
  async deletePimpinanjemaan(@Param('id') id: string): Promise<void> {
    const mubaligh = this.mubalighService.deleteMubaligh(id);
    if (!mubaligh)
      throw new HttpException('Data Mubaligh Tidak Ditemukan', HttpStatus.NOT_FOUND);

    await mubaligh;
  }
}