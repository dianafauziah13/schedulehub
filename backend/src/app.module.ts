import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PimpinanJemaahModule } from './pimpinanjamaah/pimpinanjamaah.module';
import { ScopeDakwahModule } from './scopeDakwah/scopedakwah.module';
import { KeahlianModule } from './keahlian/keahlian.module';
import { MubalighModule } from './mubaligh/mubaligh.module';
import { TempatPenugasanModule } from './tempatpenugasan/penugasan.module';
import { HitungKhutbahModule } from './hitungjumlahkhutbah/hitungkhutbah.module';
import { JadwalJumatModule } from './jadwalkhutbahjumat/jumat.module';
import { JadwalPengajianModule } from './jadwalpengajianrutin/pengajian.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
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
      }),
      inject: [ConfigService],
    }),
    PimpinanJemaahModule,
    ScopeDakwahModule,
    KeahlianModule,
    MubalighModule,
    TempatPenugasanModule,
    HitungKhutbahModule,
    JadwalJumatModule,
    JadwalPengajianModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule {}
