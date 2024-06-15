import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { historiJadwalJumatSchemaModel } from './schemas/histori.schema';
import { historiJumatController } from './historiJumat.controller';
import { historiJumatService } from './historiJumat.service';



@Module({
  imports: [MongooseModule.forFeature([{ name: 'historiJadwalJumatSchema', schema: historiJadwalJumatSchemaModel }])],
  controllers: [historiJumatController],
  providers: [historiJumatService],
})
export class historiJumatModule {}