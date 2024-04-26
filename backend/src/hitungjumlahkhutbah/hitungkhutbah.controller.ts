import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { HitungKhutbahService } from './hitungkhutbah.service';
import { HitungKhutbahSchemaDto } from './dto/create-hitungkhutbah.dto';
import { HitungKhutbahSchema } from './schemas/hitungkhutbah.schema';

@Controller('hitungkhutbah')
export class HitungKhutbahController {
  constructor(private readonly hitungKhutbahService: HitungKhutbahService) {}

  @Post()
  async createHitungKhutbah(@Body() HitungKhutbahDto: HitungKhutbahSchemaDto): Promise<HitungKhutbahSchema> {
    const createHitungKhutbah = await this.hitungKhutbahService.createHitungKhutbah(HitungKhutbahDto);
    return createHitungKhutbah;
  }

  @Get()
  async getAllHitungKhutbah(): Promise<HitungKhutbahSchema[]> {
    return await this.hitungKhutbahService.findAllHitungKhutbah();
  }

  @Get(':id')
  async getHitungKhutbahById(@Param('id') id: string): Promise<HitungKhutbahSchema> {
    return await this.hitungKhutbahService.findHitungKhutbahById(id);
  }

  @Put(':id')
  async updateHitungKhutbah(
    @Param('id') id: string, 
    @Body() HitungKhutbahDto: HitungKhutbahSchemaDto): Promise<HitungKhutbahSchema> {
    return await this.hitungKhutbahService.updateHitungKhutbah(id, HitungKhutbahDto);
  }

  @Delete(':id')
  async deleteHitungKhutbah(@Param('id') id: string): Promise<HitungKhutbahSchema> {
    return await this.hitungKhutbahService.deleteHitungKhutbah(id);
  }
}