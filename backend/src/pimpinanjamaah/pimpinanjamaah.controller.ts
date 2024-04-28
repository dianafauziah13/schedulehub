import { Body, Controller, Post,  Get, Param, Put, Delete,  HttpException, HttpStatus } from '@nestjs/common';
import { PimpinanjemaanService } from './pimpinanjamaah.service'
import { PimpinanjemaahSchemaDto } from './dto/create-pj.dto';
import { PimpinanjemaahSchema } from './schemas/pimpinanjamaah.schema';

import mongoose from 'mongoose';

@Controller('pimpinanjemaah')
export class PimpinanjemaanController {
  constructor(private readonly pimpinanjemaanService: PimpinanjemaanService) {}

  @Post()
  async createPimpinanjemaan(@Body() pimpinanjemaanDTO: PimpinanjemaahSchemaDto): Promise<PimpinanjemaahSchema> {
    const createdPimpinanjemaan = await this.pimpinanjemaanService.createPimpinanjemaan(pimpinanjemaanDTO);
    return createdPimpinanjemaan;
  }

  @Get()
  async getAllPimpinanjemaan(): Promise<PimpinanjemaahSchema[]> {
    return await this.pimpinanjemaanService.findAllPimpinanjemaan();
  }

  @Get(':id')
  async getPimpinanjemaanById(@Param('id') id: string): Promise<PimpinanjemaahSchema> {
    const isPimpinanJamaah = await this.pimpinanjemaanService.findPimpinanjemaanById(id);

    if (!isPimpinanJamaah)
      throw new HttpException('Data Pimpinan Jamaah Tidak Ditemukan', HttpStatus.NOT_FOUND);

    return isPimpinanJamaah;
  }

  @Put(':id')
  async updatePimpinanjemaan(
    @Param('id') id: string,
    @Body() pimpinanjemaanDTO: PimpinanjemaahSchemaDto,
  ): Promise<PimpinanjemaahSchema> {
    return await this.pimpinanjemaanService.updatePimpinanjemaan(id, pimpinanjemaanDTO);
  }

  @Delete(':id')
  async deletePimpinanjemaan(@Param('id') id: string): Promise<void> {
    const pimpinanjemaah = this.pimpinanjemaanService.deletePimpinanjemaan(id);
    if (!pimpinanjemaah)
      throw new HttpException('Data Pimpinan Jamaah Tidak Ditemukan', HttpStatus.NOT_FOUND);

    await pimpinanjemaah;
  }
  // Add other CRUD methods as needed
}