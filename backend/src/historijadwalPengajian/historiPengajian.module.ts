import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { historiPengajianSchemaModel } from './schemas/historiPengajian.schema';
import { historiPengajianController } from './historiPengajian.controller';
import { historiPengajianService } from './historiPengajian.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'historiPengajianSchema', schema: historiPengajianSchemaModel }])],
  controllers: [historiPengajianController],
  providers: [historiPengajianService],
})
export class historiPengajianModule {}