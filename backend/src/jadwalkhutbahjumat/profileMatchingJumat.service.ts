import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JumatDto } from './dto/create-jumat.dto';
import { JadwalJumatSchema } from './schemas/jumat.schema';
import { TempatPenugasanService } from 'src/tempatpenugasan/penugasan.service';
import { TempatPenugasanSchema } from 'src/tempatpenugasan/schemas/penugasan.schema';

@Injectable()
export class ProfileMatchingServiceJumat {
  constructor(
    // @InjectModel('TempatPenugasanSchema')
    private readonly tempatPenugasanService: TempatPenugasanService,
    // private tempatPenugasanModel : Model<TempatPenugasanSchema>,
    // @InjectModel('PengajianSchema')
    // private jumatModel: Model <JadwalJumatSchema>

  ) {}
    //  Menghitung gap dengan nilai alternatif - nilai kriteria
    calculateGap(alternativeValue: number, criteriaValue: number): number{
        return alternativeValue - criteriaValue;
        // Alternative = mubaligh, kriteria = pimpinan jemaah.
    }
    
    determinasiBobot(scope: String){
      switch (true){
        case scope === "Jemaah":
          return 1;
        case scope === "Ranting":
          return 2;
        case scope === "Cabang":
          return 3;
      }
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

  calculateWeight(scopes: { scope: string; weight: number; subcriteria: number }[]): { [key: string]: number } {
    const totalWeight = scopes.reduce((acc, { weight }) => acc + weight, 0);
    const weightedScopes: { [key: string]: number } = {};

    scopes.forEach(({ scope, weight, subcriteria }) => {
      const weightedValue = (weight / totalWeight) * subcriteria * 100;
      weightedScopes[scope] = weightedValue;
    });

    return weightedScopes;
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


async generateProfileJumat(){
   /* Mendapatkan semua penugasan pimpinan jamaah */
  const penugasan = await this.tempatPenugasanService.findAllTempatPenugasan();

   // Access idPimpinanJemaah from Penugasan and populate Pimpinanjemaah
   const pimpinanJemaah = penugasan[0].Penugasan.pimpinan;
   const mubaligh = penugasan[0].Penugasan.mubaligh_khutbah_jumat;

   const bobot_kriteria: number[] = [];
   for (let i = 1; i <= 5; i++) {
      const data = this.determinasiBobot(pimpinanJemaah.scope_dakwah_jumat.find(s => s.minggu_ke == i).Nama);
      bobot_kriteria.push(data); 
      console.log(bobot_kriteria);
   }



// /* Iterasi Perhitungan GAP */
// //  for (const PJ of penugasan) {
// //   PJ.Penugasan
// //   const suitableOwner = await this.calculateGap
// // }
//   // const newPenugasan = new this.tempatPenugasanModel(pengajianDto);
//   // return await newPenugasan.save();

}

}