import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
// import  config  from './config/keys';
import { PimpinanJemaahModule } from './pimpinanjamaah/pimpinanjamaah.module';
import { ScopeDakwahModule } from './scopeDakwah/scopedakwah.module';
import { KeahlianModule } from './keahlian/keahlian.module';
import { MubalighModule } from './mubaligh/mubaligh.module';
import { TempatPenugasanModule } from './tempatpenugasan/penugasan.module';
import { HitungKhutbahModule } from './hitungjumlahkhutbah/hitungkhutbah.module';
import { JadwalJumatModule } from './jadwalkhutbahjumat/jumat.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://aziztaufiqurrahman:Doq22486@atlascluster.2lyt9lm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster', {
    
    connectionFactory: (connection) => {
      const logger = new Logger('MongooseConnection');

      connection.on('connecting', () => {
        console.log("test")
        logger.log('Connecting to MongoDB...');
      });

      connection.on('connected', () => {
        console.log("test")
        logger.log('Connected to MongoDB');
      });

      connection.on('error', (err) => {
        console.log("test")
        logger.error('Error connecting to MongoDB', err);
      });

      connection.on('disconnected', () => {
        logger.warn('Disconnected from MongoDB');
      });

      return connection;
    },
  }), PimpinanJemaahModule, ScopeDakwahModule, KeahlianModule, MubalighModule, TempatPenugasanModule, HitungKhutbahModule, JadwalJumatModule
],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
