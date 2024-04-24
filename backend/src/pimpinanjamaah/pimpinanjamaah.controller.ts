import { Body, Controller, Post,  Get, Param, Put, Delete } from '@nestjs/common';
import { PimpinanjemaanService } from './pimpinanjamaah.service'
import { PimpinanjemaahSchemaDto } from './dto/create-pj.dto';
import { PimpinanjemaahSchema } from './schemas/pimpinanjamaah.schema';

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
    return await this.pimpinanjemaanService.findPimpinanjemaanById(id);
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
    await this.pimpinanjemaanService.deletePimpinanjemaan(id);
  }
  // Add other CRUD methods as needed
}