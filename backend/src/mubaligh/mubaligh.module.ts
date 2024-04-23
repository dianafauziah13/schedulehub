import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MubalighController } from './mubaligh.controller';
import { MubalighService } from './mubaligh.service';
import { MubalighSchemaModel } from './schemas/mubaligh.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'MubalighSchema', schema: MubalighSchemaModel }])],
  controllers: [MubalighController],
  providers: [MubalighService],
})
export class MubalighModule {}