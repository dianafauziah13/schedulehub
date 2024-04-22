import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeahlianService } from './keahlian.service';
import { KeahlianController } from './keahlian.controller';
import { KeahlianSchemaModel } from './schemas/keahlian.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'KeahlianSchema', schema: KeahlianSchemaModel }])],
  controllers: [KeahlianController],
  providers: [KeahlianService],
})
export class KeahlianModule {}