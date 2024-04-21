import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
// import  config  from './config/keys';
import { PimpinanJemaahModule } from './pimpinanjamaah/pimpinanjamaah.module';
import { ScopeDakwahModule } from './scopeDakwah/scopedakwah.module';
import { KeahlianModule } from './keahlian/keahlian.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/myScheduleHub', {
    
    connectionFactory: (connection) => {
      const logger = new Logger('MongooseConnection');

      connection.on('connecting', () => {
        logger.log('Connecting to MongoDB...');
      });

      connection.on('connected', () => {
        logger.log('Connected to MongoDB');
      });

      connection.on('error', (err) => {
        logger.error('Error connecting to MongoDB', err);
      });

      connection.on('disconnected', () => {
        logger.warn('Disconnected from MongoDB');
      });

      return connection;
    },
  }), PimpinanJemaahModule, ScopeDakwahModule, KeahlianModule
],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
