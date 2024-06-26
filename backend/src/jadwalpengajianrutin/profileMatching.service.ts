import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TempatPenugasanService } from 'src/tempatpenugasan/penugasan.service';
import { TempatPenugasanSchema} from 'src/tempatpenugasan/schemas/penugasan.schema';
import { PengajianSchema } from './schemas/pengajian.schema';
import { PengajianSchemaDTO } from './dto/create-pengajian.dto';
import { PenugasanDto } from 'src/tempatpenugasan/dto/create-penugasan.dto';



@Injectable()
export class ProfileMatchingService {
  constructor(
    @InjectModel('TempatPenugasanSchema')
    private readonly tempatPenugasanService: TempatPenugasanService,
    private tempatPenugasanModel : Model<TempatPenugasanSchema>,
    @InjectModel('PengajianSchema')
    private pengajianModel: Model <PengajianSchema>

  ) {}

    //  Menghitung gap dengan nilai alternatif - nilai kriteria
    calculateGap(alternativeValue: number, criteriaValue: number): number{
        return alternativeValue - criteriaValue;
    }
    
    // Mapping nilai gap
    mapGapToScore(gap: number): number {
    switch (true) {
      case gap === 0:
        return 5;
      case gap === 1:
        return 4.5;
      case gap === -1:
        return 4;
      case gap === 2:
        return 3.5;
      case gap === -2:
        return 3;
      case gap === 3:
        return 2.5;
      case gap === -3:
        return 2;
      case gap === 4:
        return 1.5;
      case gap === -4:
        return 1;
      default:
        return 0; 
    }
  }

  /* Menghitung rata - rata nilai secondary factor */
  CalculateSecondaryFactor(secondaryFactor: number[]): number {
    let nilaiSecondary = 0;
    let length = secondaryFactor.length;

    for (let i = 0; i < secondaryFactor.length; i++) {
      if (secondaryFactor[i] === 0) {
        if (length > 1) length -= 1;
      }
      nilaiSecondary += secondaryFactor[i];
    }

    if (nilaiSecondary === 0) {
      console.log('Calculated secondary factor', nilaiSecondary);
      return nilaiSecondary;
    } else {
      console.log('Calculated secondary factor', nilaiSecondary / length);
      return nilaiSecondary / length;
    }
  }

  // Analisis total nilai gap
  calculateTotalGap(gapCF: number, gapSF: number): number{
    const mappingGapCF = this.mapGapToScore(gapCF);
    const mappingGapSF = this.mapGapToScore(gapSF);

    const cfScore = mappingGapCF * 0.6;
    const sfScore = mappingGapSF * 0.4;

    return cfScore + sfScore;
  }

  // async generateProfilePengajian(pengajianDto: PengajianSchemaDTO): Promise <PengajianSchema>{
  //   /* Mendapatkan semua penugasan pimpinan jamaah */
  //   const penugasan = await this.tempatPenugasanService.findAllTempatPenugasan();
    
  //   // Access idPimpinanJemaah from Penugasan and populate Pimpinanjemaah
  //   const pimpinanJemaah = penugasan[0].Penugasan.pimpinan;
  //   const mubaligh = penugasan[0].Penugasan.Mubaligh_Khutbah_pengajian;


    /* Iterasi Perhitungan GAP */
    // for (const PJ of penugasan) {
    //   PJ.Penugasan
    //   const suitableOwner = await this.calculateGap
    // }
  //   const newPenugasan = new this.tempatPenugasanModel(pengajianDto);
  //   return await newPenugasan.save();

  // }


}