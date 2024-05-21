import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PimpinanjemaanController } from './pimpinanjamaah.controller';
import { PimpinanjemaanService } from './pimpinanjamaah.service';
import { PimpinanjemaahSchemaModel  } from './schemas/pimpinanjamaah.schema';
import { MubalighSchemaModel } from 'src/mubaligh/schemas/mubaligh.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'PimpinanjemaahSchema', schema: PimpinanjemaahSchemaModel }, { name: 'MubalighSchema', schema: MubalighSchemaModel }])],
  controllers: [PimpinanjemaanController],
  providers: [PimpinanjemaanService],
})
export class PimpinanJemaahModule {}