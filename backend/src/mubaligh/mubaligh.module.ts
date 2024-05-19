import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MubalighController } from './mubaligh.controller';
import { MubalighService } from './mubaligh.service';
import { MubalighSchemaModel } from './schemas/mubaligh.schema';
import { ScopeDakwahSchemaModel } from 'src/scopeDakwah/schemas/scopedakwah.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'MubalighSchema', schema: MubalighSchemaModel }, { name: 'ScopeDakwahSchema', schema: ScopeDakwahSchemaModel }])],
  controllers: [MubalighController],
  providers: [MubalighService],
})
export class MubalighModule {}