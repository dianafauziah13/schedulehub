import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JadwalJumatController } from './jumat.controller';
import { JadwalJumatService } from './jumat.service';
import { JadwalJumatSchemaModel  } from './schemas/jumat.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'JadwalJumatSchema', schema: JadwalJumatSchemaModel }])],
  controllers: [JadwalJumatController],
  providers: [JadwalJumatService],
})
export class JadwalJumatModule {}