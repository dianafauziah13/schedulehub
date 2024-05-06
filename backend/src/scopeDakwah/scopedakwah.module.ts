import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScopeDakwahService } from './scopedakwah.service';
import { ScopeDakwahController } from './scopedakwah.controller';
import { ScopeDakwahSchemaModel } from './schemas/scopedakwah.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ScopeDakwahSchema', schema: ScopeDakwahSchemaModel }])],
  controllers: [ScopeDakwahController],
  providers: [ScopeDakwahService],
})
export class ScopeDakwahModule {}

// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';

// import { ScopeDakwahController } from './scopedakwah.controller'; 
// import { ScopeDakwahService } from './scopedakwah.service';
// import { ScopeDakwahModel } from './schemas/scopedakwah.schema';


// @Module({
//   imports: [MongooseModule.forFeature([{ name: 'ScopeDakwahSchema', schema:  ScopeDakwahModel}])],
//   controllers: [ScopeDakwahController],
//   providers: [ScopeDakwahService],
// })
// export class ScopeDakwahModule {}