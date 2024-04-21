import { Body, Controller, Post,  Get, Param, Put } from '@nestjs/common';
import { KeahlianService } from './keahlian.service';
import { keahlianDTO } from './dto/create-keahlian.dto';
import { KeahlianSchema } from './schemas/keahlian.schema';


@Controller('keahlian')
export class KeahlianController {
  constructor(private readonly keahlianService: KeahlianService) {}

  @Post()
  async createKnowledge(@Body() keahlianDTO: keahlianDTO): Promise<keahlianDTO> {
    const createdKnowledge = await this.keahlianService.createKnowledge(keahlianDTO);
    return createdKnowledge;
  }

  @Get()
  async getAllKnowledge(): Promise<KeahlianSchema[]> {
    return await this.keahlianService.findAllKnowlegde();
  }

  @Get(':id')
  async getKnowledgeById(@Param('id') id: string): Promise<KeahlianSchema> {
    return await this.keahlianService.findKnowlegdeById(id);
  }

  @Put(':id')
  async updateknowledge(
    @Param('id') id: string,
    @Body() keahlianDTO: keahlianDTO,
  ): Promise<KeahlianSchema> {
    return await this.keahlianService.updateKnowlegde(id, keahlianDTO);
  }
  // Add other CRUD methods as needed
}