import { Body, Controller, Post,  Get, Param, Put } from '@nestjs/common';
import { PimpinanjemaanService } from './pimpinanjamaah.service'
import { PimpinanjemaahSchemaDTO } from './dto/create-pj.dto';
import { PimpinanjemaahSchema } from './schemas/pimpinanjamaah.schema';

@Controller('pimpinanjemaah')
export class PimpinanjemaanController {
  constructor(private readonly pimpinanjemaanService: PimpinanjemaanService) {}

  @Post()
  async createPimpinanjemaan(@Body() pimpinanjemaanDTO: PimpinanjemaahSchemaDTO): Promise<PimpinanjemaahSchemaDTO> {
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
    @Body() pimpinanjemaanDTO: PimpinanjemaahSchemaDTO,
  ): Promise<PimpinanjemaahSchema> {
    return await this.pimpinanjemaanService.updatePimpinanjemaan(id, pimpinanjemaanDTO);
  }
  // Add other CRUD methods as needed
}