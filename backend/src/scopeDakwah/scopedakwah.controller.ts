import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ScopeDakwahService } from './scopedakwah.service';
import { ScopeDakwahDTO } from './dto/create-scopedakwah.dto';
import { ScopeDakwah } from './schemas/scopedakwah.schema';

@Controller('scope-dakwah')
export class ScopeDakwahController {
  constructor(private readonly scopeDakwahService: ScopeDakwahService) {}

  @Post()
  async createScopeDakwah(@Body() scopeDakwahDTO: ScopeDakwahDTO): Promise<ScopeDakwah> {
    const createdScopeDakwah = await this.scopeDakwahService.createScopeDakwah(scopeDakwahDTO);
    return createdScopeDakwah;
  }

  @Get()
  async getAllScopeDakwah(): Promise<ScopeDakwah[]> {
    return await this.scopeDakwahService.findAllScopeDakwah();
  }

  @Get(':id')
  async getScopeDakwahById(@Param('id') id: string): Promise<ScopeDakwah> {
    return await this.scopeDakwahService.findScopeDakwahById(id);
  }

  @Put(':id')
  async updateScopeDakwah(
    @Param('id') id: string, 
    @Body() scopeDakwahDTO: ScopeDakwahDTO): Promise<ScopeDakwah> {
    return await this.scopeDakwahService.updateScopeDakwah(id, scopeDakwahDTO);
  }

  @Delete(':id')
  async deleteScopeDakwah(@Param('id') id: string): Promise<ScopeDakwah> {
    return await this.scopeDakwahService.deleteScopeDakwah(id);
  }
}