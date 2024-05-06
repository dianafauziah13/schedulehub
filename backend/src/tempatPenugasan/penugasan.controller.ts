import { Body, Controller, Post,  Get, Param, Put, HttpException, HttpStatus  } from '@nestjs/common';
import { TempatPenugasanService } from './penugasan.service'
import { TempatPenugasanSchemaDto } from './dto/create-penugasan.dto';
import { TempatPenugasanSchema } from './schemas/penugasan.schema';

@Controller('tempatpenugasan')
export class TempatPenugasanController {
  constructor(private readonly tempatPenugasanService: TempatPenugasanService) {}

  @Post()
  async createTempatPenugasan(@Body() TempatPenugasanDto: TempatPenugasanSchemaDto) {
    const createTempatPenugasan = await this.tempatPenugasanService.createTempatPenugasan(TempatPenugasanDto);
    return createTempatPenugasan;
  }

  @Get()
  async getAllTempatPenugasan(): Promise<TempatPenugasanSchema[]> {
    return await this.tempatPenugasanService.findAllTempatPenugasan();
  }

  @Get(':id')
  async getTempatPenugasanById(@Param('id') id: string): Promise<TempatPenugasanSchema> {
    const penugasan = await this.tempatPenugasanService.findTempatPenugasanById(id);
    if (!penugasan)
      throw new HttpException('Data Penugasan Tidak Ditemukan', HttpStatus.NOT_FOUND);

    return penugasan;
  }

  @Put(':id')
  async updateTempatPenugasan(
    @Param('id') id: string,
    @Body() TempatPenugasanDto: TempatPenugasanSchemaDto,
  ): Promise<TempatPenugasanSchema> {
    return await this.tempatPenugasanService.updateTempatPenugasan(id, TempatPenugasanDto);
  }
}