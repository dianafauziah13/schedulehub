import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HitungKhutbahController } from './hitungkhutbah.controller'; 
import { HitungKhutbahService } from './hitungkhutbah.service';
import { HitungKhutbahSchemaModel } from './schemas/hitungkhutbah.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'HitungKhutbahSchema', schema: HitungKhutbahSchemaModel }])],
  controllers: [HitungKhutbahController],
  providers: [HitungKhutbahService],
})
export class HitungKhutbahModule {}