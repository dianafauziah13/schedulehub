import { Body, Controller, Post,  Get, Param, Put } from '@nestjs/common';
import { ScopeDakwahService } from './scopedakwah.service';
import { ScopeDakwahDTO } from './dto/create-scopedakwah.dto';
import { ScopeDakwahSchema } from './schemas/scopedakwah.schema';


@Controller('scope-dakwah')
export class ScopeDakwahController {
  constructor(private readonly scopeDakwahService: ScopeDakwahService) {}

  @Post()
  async createScopeDakwah(@Body() scopeDakwahDTO: ScopeDakwahDTO): Promise<ScopeDakwahSchema> {
    const createScopeDakwah = await this.scopeDakwahService.createScopeDakwah(scopeDakwahDTO);
    return createScopeDakwah;
  }

  @Get()
  async getAllScopeDakwah(): Promise<ScopeDakwahSchema[]> {
    return await this.scopeDakwahService.findAllScopeDakwah();
  }

  @Get(':id')
  async getScopeDakwahById(@Param('id') id: string): Promise<ScopeDakwahSchema> {
    return await this.scopeDakwahService.findScopeDakwahById(id);
  }

  @Put(':id')
  async updateScopeDakwah(
    @Param('id') id: string,
    @Body() scopeDakwahDTO: ScopeDakwahDTO,
  ): Promise<ScopeDakwahSchema> {
    return await this.scopeDakwahService.updateScopeDakwah(id, scopeDakwahDTO);
  }
  // Add other CRUD methods as needed
}
// import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
// import { ScopeDakwahService } from './scopedakwah.service';
// import { ScopeDakwahDTO } from './dto/create-scopedakwah.dto';
// import { ScopeDakwahSchema } from './schemas/scopedakwah.schema';

// @Controller('scope-dakwah')
// export class ScopeDakwahController {
//   constructor(private readonly scopeDakwahService: ScopeDakwahService) {}

//   @Post()
//   async createScopeDakwah(@Body() scopeDakwahDTO: ScopeDakwahDTO): Promise<ScopeDakwahSchema> {
//     const createdScopeDakwah = await this.scopeDakwahService.createScopeDakwah(scopeDakwahDTO);
//     return createdScopeDakwah;
//   }

//   @Get()
//   async getAllScopeDakwah(): Promise<ScopeDakwahSchema[]> {
//     return await this.scopeDakwahService.findAllScopeDakwah();
//   }

//   @Get(':id')
//   async getScopeDakwahById(@Param('id') id: string): Promise<ScopeDakwahSchema> {
//     return await this.scopeDakwahService.findScopeDakwahById(id);
//   }

//   @Put(':id')
//   async updateScopeDakwah(
//     @Param('id') id: string, 
//     @Body() scopeDakwahDTO: ScopeDakwahDTO): Promise<ScopeDakwahSchema> {
//     return await this.scopeDakwahService.updateScopeDakwah(id, scopeDakwahDTO);
//   }

//   @Delete(':id')
//   async deleteScopeDakwah(@Param('id') id: string): Promise<ScopeDakwahSchema> {
//     return await this.scopeDakwahService.deleteScopeDakwah(id);
//   }
// }